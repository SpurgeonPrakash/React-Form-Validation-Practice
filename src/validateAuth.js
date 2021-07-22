const patterns = {
  special: /[^0-9a-zA-Z\s]/g,
  digit: /[0-9]/g,
  small: /[a-z]/g,
  capital: /[A-Z]/g,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};

const is_valid_email = (values, errors) => {
  // console.log(errors);
  // console.log(values);
  if (!values.email) {
    errors.email = "Required Email";
  } else if (!patterns.email.test(values.email)) {
    // console.log(patterns.email.test(values.email));
    errors.email = "Invalid email address";
  } else {
    errors.email = "";
  }
};

const is_valid_password = (values, errors) => {
  // const regex_to_check_all_below_conditions = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$/
  // [A-Z]+[0-9]+[@#\$&]*
  // if( /[A-Z]/.test(str) && /[0-9]/.test(str) && len >= 8 && len <= 15 )
  // for all special chars: /[^0-9a-zA-Z\s]/g,
  // Limited special Chars: /[@_#$]/g,

  const smallChars = values.password.match(patterns.small) || [];
  const capitalChars = values.password.match(patterns.capital) || [];
  const digitChars = values.password.match(patterns.digit) || [];
  const specialChars = values.password.match(patterns.special) || [];
  // console.log(errors);
  // console.log(values);
  if (!values.password) {
    errors.password = "Required Password";
  } else if (values.password.length < 8) {
    errors.password = "Password must be atleast 8 characters long";
  } else if (values.password.length > 16) {
    errors.password = "Password can have atmost 16 characters";
  } else if (smallChars.length === 0) {
    errors.password = "Password must have atleast 1 small letter";
  } else if (capitalChars.length === 0) {
    errors.password = "Password must have atleast 1 capital letter";
  } else if (digitChars.length === 0) {
    errors.password = "Password must have atleast 1 digit";
  } else if (specialChars.length === 0) {
    errors.password = "Password must have atleast 1 special charecter";
  } else {
    errors.password = "";
  }
};

const isValid = (values, errors, callBacksArray) => {
  for (const callback of callBacksArray) {
    callback(values, errors);
  }
};

export const validateAuth = {
  is_valid_email: function (values, sent_errors) {
    const errors = { ...sent_errors };
    isValid(values, errors, [is_valid_email]);
    return errors;
  },
  is_valid_password: function (values, sent_errors) {
    const errors = { ...sent_errors };
    isValid(values, errors, [is_valid_password]);
    return errors;
  },
  is_all_valid: function (values, sent_errors) {
    const errors = { ...sent_errors };
    isValid(values, errors, [is_valid_email, is_valid_password]);
    return errors;
  },
};

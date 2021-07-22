const patterns = {
  special: /[@_#$]/g,
  digit: /[0-9]/g,
  small: /[a-z]/g,
  capital: /[A-Z]/g,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};

export default function validateAuth(values) {
  let errors = {};
  // Email Errors
  if (!values.email) {
    errors.email = "Required Email";
  } else if (!patterns.email.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // Password Errors
  if (!values.password) {
    errors.password = "Required Password";
  } else if (values.password.length < 6) {
    errors.password = "Password must be atleast 6 characters";
  } else if (values.password.length > 16) {
    errors.password = "Password can have atmost 16 characters";
  } else if (!patterns.small.test(values)) {
    errors.password = "Password must have atleast 1 small letter";
  } else if (!patterns.capital.test(values)) {
    errors.password = "Password must have atleast 1 capital letter";
  } else if (!patterns.digit.test(values)) {
    errors.password = "Password must have atleast 1 digit";
  } else if (!patterns.special.test(values)) {
    errors.password =
      "Password must have atleast 1 special charecters(@,_,$,#)";
  }
  return errors;
}

import React from "react";

function useFormValidation(initialState, sendValidationMethods) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState(initialState);
  const [isSubmitting, setSubmitting] = React.useState(false);

  const callingFunctions = sendValidationMethods();

  React.useEffect(() => {
    // console.log("Ran Use Effect");
    if (isSubmitting) {
      const noErrors =
        errors.email.length === 0 && errors.password.length === 0;
      if (noErrors) {
        console.log("authenticated!", values.email, values.password);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  function handleBlur(e) {
    const validationErrors = callingFunctions[e.target.name](values, errors);

    // console.log(validationErrors);
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = callingFunctions["submit"](values, errors);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting,
  };
}

export default useFormValidation;

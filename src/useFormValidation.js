import React from "react";

function useFormValidation(initialState, sendValidationMethods, register) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState(initialState);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [isTapped, setTapped] = React.useState(false);

  const callingFunctions = sendValidationMethods();

  React.useEffect(() => {
    // console.log("Ran Use Effect");
    if (isSubmitting) {
      const noErrors =
        errors.email.length === 0 && errors.password.length === 0;
      if (noErrors) {
        register(values.email, values.password)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
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
    const validationErrors = callingFunctions[event.target.name](
      {
        ...values,
        [event.target.name]: event.target.value,
      },
      errors
    );
    // console.log(validationErrors);
    setErrors(validationErrors);
  }

  function handleBlur() {
    setTapped(true);
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
    isTapped,
  };
}

export default useFormValidation;

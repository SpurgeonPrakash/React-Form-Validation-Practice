import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import useFormValidation from "./useFormValidation";
import { validateAuth } from "./validateAuth";

const INITIAL_STATE = {
  email: "",
  password: "",
};

function Register() {
  const sendValidationMethods = () => {
    return {
      email: validateAuth.is_valid_email,
      password: validateAuth.is_valid_password,
      submit: validateAuth.is_all_valid,
    };
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting,
    isTapped,
  } = useFormValidation(INITIAL_STATE, sendValidationMethods);
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // console.log("Ran Render");

  return (
    <div className="container">
      <h1>Register Here</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          value={values.email}
          className={errors.email && "error-input"}
          autoComplete="off"
          placeholder="Your email address"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && "error-input"}
          name="password"
          type="password"
          placeholder="Choose a safe password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div>
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Register />, rootElement);

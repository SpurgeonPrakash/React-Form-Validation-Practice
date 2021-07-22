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

  const register = async (email, password) => {
    // Do Your Side Effect Work Here Like Hitting register or login end point of backend api
    //fetch().then().then().catch()

    // for now, simulating side effect manually by changing this function as async function!!
    console.log(
      `user with email id ${email} and password ${password} registered successfully!!`
    );
    return "done";
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting,
    isTapped,
  } = useFormValidation(INITIAL_STATE, sendValidationMethods, register);
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
        {errors.email && isTapped && (
          <p className="error-text">{errors.email}</p>
        )}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && "error-input"}
          name="password"
          type="password"
          placeholder="Choose a safe password"
        />
        {errors.password && isTapped && (
          <p className="error-text">{errors.password}</p>
        )}
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

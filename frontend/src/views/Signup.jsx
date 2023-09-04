import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };
  return (
    <form onSubmit={onSubmit} className=" animated fadeInDown">
      <h1 className="title">Create a new Account</h1>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => {
            return <p key={key} className="error">{errors[key][0]}</p>;
          })}
        </div>
      )}
      <input ref={nameRef} type="text" placeholder="Full Name" />
      <input ref={emailRef} type="email" placeholder="Email Address" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <input
        ref={passwordConfirmationRef}
        type="password"
        placeholder="Confirm Password"
      />
      <button className="btn btn-block">Sign Up</button>
      <p className="message">
        Already have an account ? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

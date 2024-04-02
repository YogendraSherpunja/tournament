import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../components/Input";

import { register } from "../services/auth";

import "../styles/Login.css";

export default function Register() {
  const [state, setState] = useState({
    data: {
      username: "",
      email: "",
      password: "",
    },
    disabled: false,
    registerClass: [],
    registerState: false,
    msg: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const arr = ["alert"];

    try {
      await register(state.data);
      arr.push("alert-success");
      setState({
        registerClass: arr,
        registerState: true,
        msg: "Registration Successful!",
      });
    } catch (err) {
      arr.push("alert-danger");
      setState({
        registerClass: arr,
        registerState: true,
        msg: "Registration Failed!",
      });
    }
  };

  const onChange = (e) => {
    setState({
      data: {
        ...state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h3 className="mb-4">Register</h3>
        <form onSubmit={onSubmit} method="POST" className="form-horizontal">
          <Input
            name="username"
            placeholder="Username"
            type="text"
            onChange={onChange}
            required
          />
          <Input
            name="email"
            placeholder="Email"
            type="text"
            onChange={onChange}
            required
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            onChange={onChange}
            required
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={state.disabled}
              >
                Register
              </button>
            </div>
            <div style={{ paddingTop: "20px" }}>
              {state.registerState === true ? (
                <div className={state.registerClass.join(" ")}>
                  <strong>{state.msg}</strong>
                </div>
              ) : null}
            </div>
            <div>
              <Link to="/login">Already have an Account? Login Now.</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

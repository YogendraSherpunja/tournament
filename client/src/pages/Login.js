import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../components/Input";
import { login } from "../services/auth";

import "../styles/Login.css";

export default function Login(props) {
  const [state, setState] = useState({
    data: {
      username: "",
      password: "",
    },
    loginMsg: "",
    loggedIn: false,
    loginClass: ["alert"],
  });

  const onChange = (e) => {
    setState({
      ...state,
      data: { ...state.data, [e.target.name]: e.target.value },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const arr = ["alert"];
    try {
      await login(state.data);
      arr.push("alert-success");
      setState({
        ...state,
        loggedIn: true,
        loginClass: arr,
        loginMsg: "Login Successful!",
      });
      props.settingState();
      setTimeout(() => {
        props.history.push("/");
      }, 500);
    } catch (err) {
      arr.push("alert-danger");
      setState({
        ...state,
        loggedIn: true,
        loginClass: arr,
        loginMsg: "Login Falied!",
      });
    }
  };

  return (
    <div className="form-wrapper">
      <div>
        <h1
          className="mb-4"
          style={{ textAlign: "center", fontWeight: "700", color: "white" }}
        >
          Tournament Manager
        </h1>
        <div className="form-container">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={onSubmit} method="POST" className="form-horizontal">
            <Input
              name="username"
              placeholder="Username"
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
              <div className="col-sm-offset-2 col-sm-10 pb-2">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              {state.loggedIn === true ? (
                <div
                  className={state.loginClass.join(" ")}
                  style={{ marginTop: "20px" }}
                >
                  <strong>{state.loginMsg}</strong>
                </div>
              ) : null}
              <div style={{ paddingTop: "10px" }}>
                <Link to="/register">Don't have an Account? Create Now.</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

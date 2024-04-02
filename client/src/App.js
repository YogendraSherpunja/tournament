import React from "react";
import { Route, Redirect } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";

const PrivateRoute = ({ path, component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        isLoggedIn === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem("token") ? true : false
  );

  const settingState = () => {
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
  };

  return (
    <div>
      <Route
        exact
        path="/"
        render={() =>
          isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />
        }
      />

      <PrivateRoute path="/home" component={Main} isLoggedIn={isLoggedIn} />

      <Route
        path="/login"
        render={(props) => <Login {...props} settingState={settingState} />}
      />
      <Route
        path="/register"
        render={(props) => <Register {...props} settingState={settingState} />}
      />
    </div>
  );
};

export default App;

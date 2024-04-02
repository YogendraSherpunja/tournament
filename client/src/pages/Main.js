import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import New from "./New";
import Home from "./Home";
import View from "./View";
import Header from "../components/Header";

export default function Main() {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <Header url={url} />
      <main>
        <div className="container">
          <Switch>
            <Route exact path={`${path}`} component={Home} />
            <Route exact path={`${path}/new`} component={New} />
            <Route exact path={`${path}/:tournamentId`} component={View} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

import React from "react";
import { Switch, Route, RouteProps } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import WordPage from "./pages/WordPage";
export interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean;
  key: string;
}

const routes: CustomRouteProps[] = [
  {
    path: "/login",
    component: Login,
    exact: true,
    key: "/login",
  },
  {
    path: "/words",
    component: WordPage,
    exact: true,
    key: "/words",
    isPrivate: true,
  },
  {
    path: "/",
    component: Home,
    isPrivate: true,
    key: "/",
  },
];

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ isPrivate, key, ...rest }) =>
        isPrivate ? (
          <PrivateRoute {...rest} key={key} />
        ) : (
          <Route {...rest} key={key} />
        )
      )}
    </Switch>
  );
};

export default Routes;

import React from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { useAuth } from "../../context/AuthContext";

export interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  component,
  ...props
}) => {
  const { user } = useAuth();
  const Component = component as React.ElementType;
  return (
    <Route
      {...props}
      render={() => {
        if (user) {
          return <Component />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;

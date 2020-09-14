import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuthentication from "./useAuthentication";

const PrivateRoute = ({
  component: Component,
  location: location,
  ...rest
}) => {
  const [user, fetched] = useAuthentication(location);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && fetched) {
          return <Component {...props} />;
        } else if (fetched) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: props.location.pathname,
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;

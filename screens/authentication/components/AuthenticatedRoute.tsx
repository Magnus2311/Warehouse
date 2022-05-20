import React, { FunctionComponent } from "react";

const AuthenticatedRoute: FunctionComponent<any> = () => {
  <Route
    exact={exact}
    path={path}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <AuthenticateBeforeRender render={() => <Component {...props} />} />
      )
    }
  />;
};

export default AuthenticatedRoute;

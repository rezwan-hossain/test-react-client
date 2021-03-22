import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import Create from "./create";
import SinglePost from "./singlePost";
import UpdatePost from "./updatePost";
import SignUp from "./signup";
import SignIn from "./login";
import { isAuthenticate } from "./utils/index";

export const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticate() ? children : <Redirect to="/login" />
      }
    />
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact={true} path="/">
          <App />
        </PrivateRoute>

        <PrivateRoute exact={true} path="/create">
          <Create />
        </PrivateRoute>

        <Route
          path="/login"
          exact
          render={() => (isAuthenticate() ? <Redirect to="/" /> : <SignIn />)}
        />
        <Route
          path="/signup"
          exact
          render={() => (isAuthenticate() ? <Redirect to="/" /> : <SignUp />)}
        />
        <PrivateRoute exact={true} path="/post/:slug">
          <SinglePost />
        </PrivateRoute>
        <PrivateRoute exact={true} path="/update/:slug">
          <UpdatePost />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

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
        <Route path="/" exact component={App} />
        {/* <Route path="/create" exact component={Create} /> */}
        <PrivateRoute exact={true} path="/create">
          <Create />
        </PrivateRoute>
        <Route path="/login" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/post/:slug" exact component={SinglePost} />
        <Route path="/update/:slug" exact component={UpdatePost} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Create from "./create";
import SinglePost from "./singlePost";
import UpdatePost from "./updatePost";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/create" exact component={Create} />
        <Route path="/post/:slug" exact component={SinglePost} />
        <Route path="/update/:slug" exact component={UpdatePost} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

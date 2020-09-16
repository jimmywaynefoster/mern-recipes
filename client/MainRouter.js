import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./auth/Login";
import EditProfile from "./user/EditProfile";
import ChangePassword from "./user/ChangePassword";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import Recipe from "./recipies/Recipe";
import CreateRecipe from "./recipies/CreateRecipe";

import Menu from "./core/Menu";

const MainRouter = withRouter(({ location }) => {
  return (
    <div>
      {location.pathname != "/" && <Menu />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/recipe" component={Recipe} />
        <Route path="/create-recipe" component={CreateRecipe} />
        <PrivateRoute path="/user/edit" component={EditProfile} />
        <PrivateRoute path="/user/password" component={ChangePassword} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </div>
  );
});

export default MainRouter;

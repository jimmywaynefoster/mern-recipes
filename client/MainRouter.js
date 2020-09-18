import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./auth/Login";
import EditProfile from "./user/EditProfile";
import ChangePassword from "./user/ChangePassword";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import Recipe from "./recipes/Recipe";
import CreateRecipe from "./recipes/CreateRecipe";
import Insights from "./recipes/Insights";
import MyRecipes from "./recipes/MyRecipes";
import Menu from "./core/Menu";

const MainRouter = withRouter(({ location }) => {
  React.useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [location]);
  return (
    <div>
      {location.pathname != "/" && <Menu />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/recipe/:recipeId" component={Recipe} />
        <Route path="/create-recipe" component={CreateRecipe} />
        <Route path="/insights" component={Insights} />
        <Route path="/my-recipes" component={MyRecipes} />
        <PrivateRoute path="/user/edit" component={EditProfile} />
        <PrivateRoute path="/user/password" component={ChangePassword} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </div>
  );
});

export default MainRouter;

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { logout } from "./../auth/api-auth";
import useAuthentication from "./../auth/useAuthentication";

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#ff4081" };
  else return { color: "#ffffff" };
};
const Menu = withRouter(({ history, location }) => {
  const [user] = useAuthentication(location);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Skeleton
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive(history, "/users")}>Users</Button>
        </Link>
        {!user && (
          <span>
            <Link to="/register">
              <Button style={isActive(history, "/register")}>Register</Button>
            </Link>
            <Link to="/login">
              <Button style={isActive(history, "/login")}>Log In</Button>
            </Link>
          </span>
        )}
        {user && (
          <span>
            <Link to={"/profile"}>
              <Button style={isActive(history, "/profile")}>My Profile</Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                logout();
                history.push("/");
              }}
            >
              Log out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Menu;

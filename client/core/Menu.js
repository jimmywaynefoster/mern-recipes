import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, withRouter } from "react-router-dom";
import logo from "./../assets/images/my-recipies-logo.png";
import { logout } from "./../auth/api-auth";

const isActive = (history, path) => {
  if (history.location.pathname == path) {
    return true;
  } else {
    return false;
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    background: theme.palette.primary.main,
    color: "#000",
  },
  logo: {
    height: "2.2rem",
    margin: "auto",
    paddingLeft: 40,
  },
  close: {
    margin: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
      1
    )}px auto`,
  },
  listIcon: {
    minWidth: "3rem",
  },
  profileIcon: {
    fontSize: "2.5rem",
  },
  list: {
    width: 250,
  },
  listItem: {
    paddingLeft: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  active: {
    "& span": {
      fontWeight: 600,
    },
  },
}));

const Menu = withRouter(({ history, location }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img className={classes.logo} src={logo} />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        classes={{ paper: classes.paper }}
      >
        <IconButton
          className={classes.close}
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
        >
          <CloseIcon />
        </IconButton>

        <List className={classes.list}>
          <Link
            to="/profile"
            className={`${classes.link} ${
              isActive(history, "/profile") && classes.active
            }`}
          >
            <ListItem
              button
              className={classes.listItem}
              onClick={() => {
                setOpen(false);
              }}
            >
              <ListItemIcon className={classes.listIcon}>
                <AccountCircleIcon className={classes.profileIcon} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>
          <br />
          <Link to="/my-recipes" className={classes.link}>
            <ListItem
              button
              className={`${classes.listItem} ${
                isActive(history, "/my-recipes") && classes.active
              }`}
              onClick={() => {
                setOpen(false);
              }}
            >
              <ListItemText primary="My recipes" />
            </ListItem>
          </Link>
          <Link to="/create-recipe" className={classes.link}>
            <ListItem
              button
              className={`${classes.listItem} ${
                isActive(history, "/create-recipe") && classes.active
              }`}
              onClick={() => {
                setOpen(false);
              }}
            >
              <ListItemText primary="Create recipe" />
            </ListItem>
          </Link>
          <Link to="/insights" className={classes.link}>
            <ListItem
              button
              className={`${classes.listItem} ${
                isActive(history, "/insights") && classes.active
              }`}
              onClick={() => {
                setOpen(false);
              }}
            >
              <ListItemText primary="Insights" />
            </ListItem>
          </Link>
          <Divider />
          <ListItem
            button
            className={classes.listItem}
            onClick={() => {
              logout();
              history.push("/");
            }}
          >
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
});

export default Menu;

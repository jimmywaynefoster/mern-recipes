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
import useAuthentication from "./../auth/useAuthentication";

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
          <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listIcon}>
              <AccountCircleIcon className={classes.profileIcon} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <br />
          <ListItem button className={classes.listItem}>
            <ListItemText primary="My recipes" />
          </ListItem>
          <ListItem button className={classes.listItem}>
            <ListItemText primary="Create recipe" />
          </ListItem>
          <ListItem button className={classes.listItem}>
            <ListItemText primary="Insights" />
          </ListItem>
          <Divider />
          <ListItem button className={classes.listItem}>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
});

export default Menu;

// const isActive = (history, path) => {
//   if (history.location.pathname == path) return { color: "#000" };
//   else return { color: "#aaa" };
// };
// const Menu = withRouter(({ history, location }) => {
//   const [user] = useAuthentication(location);

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" color="inherit">
//           MERN Skeleton
//         </Typography>
//         <Link to="/">
//           <IconButton aria-label="Home" style={isActive(history, "/")}>
//             <HomeIcon />
//           </IconButton>
//         </Link>
//         <Link to="/users">
//           <Button style={isActive(history, "/users")}>Users</Button>
//         </Link>
//         {!user && (
//           <span>
//             <Link to="/register">
//               <Button style={isActive(history, "/register")}>Register</Button>
//             </Link>
//             <Link to="/login">
//               <Button style={isActive(history, "/login")}>Log In</Button>
//             </Link>
//           </span>
//         )}
//         {user && (
//           <span>
//             <Link to={"/profile"}>
//               <Button style={isActive(history, "/profile")}>My Profile</Button>
//             </Link>
//             <Button
//               color="inherit"
//               onClick={() => {
//                 logout();
//                 history.push("/");
//               }}
//             >
//               Log out
//             </Button>
//           </span>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// });

// export default Menu;

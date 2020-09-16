import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import { useMediaQuery } from "react-responsive";
import DeleteUser from "./DeleteUser";
import { Link } from "react-router-dom";
import useAuthentication from "./../auth/useAuthentication";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    borderRadius: "40px",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='black' stroke-width='4' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
  divider: {
    marginTop: 8,
  },
  "@media (max-width: 600px)": {
    root: {
      maxWidth: 320,
    },
  },
}));

export default function Profile() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [user] = useAuthentication(location);

  const photoUrl = user
    ? `/api/user/photo/?${new Date().getTime()}`
    : "/api/user/defaultphoto";

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      {user && (
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={photoUrl} className={classes.bigAvatar} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />{" "}
            {!isMobile && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/"}>
                  <IconButton aria-label="Edit" color="secondary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser />
              </ListItemSecondaryAction>
            )}
          </ListItem>
          {isMobile && (
            <ListItem>
              <Link to={"/user/password/"}>Change Password</Link>
              <ListItemSecondaryAction>
                <Link to={"/user/edit/"}>
                  <IconButton aria-label="Edit" color="secondary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser />
              </ListItemSecondaryAction>
            </ListItem>
          )}
          <Divider className={classes.divider} />
          <ListItem>
            <ListItemText
              primary={
                "Joined: " + new Date(user.dateRegistered).toDateString()
              }
            />
            {!isMobile && !user.googleId && !user.facebookId && (
              <ListItemSecondaryAction>
                <Link to={"/user/password/"}>Change Password</Link>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        </List>
      )}
    </Paper>
  );
}

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
  },
  textField: {
    backgroundColor: "rgba(255, 255, 249, 1)",
    margin: `${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(3)}px`,
    width: `${4 * 95}px`,
    height: "44px",
    padding: `0 ${theme.spacing(3)}px`,
    color: "#000",
    border: "none",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    borderRadius: "22px",
    "&:hover": {
      border: "none",
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4.8' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    },
  },
  focused: {
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 1)",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4.8' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
  },
}));

export default function CreateRecipe() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography className={classes.title} variant="h4" gutterBottom>
        Create Recipe
      </Typography>
      <InputBase
        classes={{ root: classes.textField, focused: classes.focused }}
        defaultValue="Naked input"
        inputProps={{ "aria-label": "naked" }}
      />
    </Container>
  );
}

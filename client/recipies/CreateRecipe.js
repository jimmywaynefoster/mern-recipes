import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 249, 1)",
    margin: `${theme.spacing(1)}px 0`,
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
  textField: {
    width: `${4 * 82}px`,
    height: "44px",
  },
  multiline: {
    width: `100%`,
    height: `${24 * 5 + 8}px`,
  },
  multilineMobile: {
    width: `${4 * 82}px`,
    height: `${24 * 5 + 8}px`,
  },
  focused: {
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 1)",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4.8' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
  },
}));

export default function CreateRecipe() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <Container maxWidth="md">
      <Typography className={classes.title} variant="h4" gutterBottom>
        Create Recipe
      </Typography>
      <InputBase
        className={classes.textField}
        classes={{ root: classes.textInput, focused: classes.focused }}
        inputProps={{ "aria-label": "name" }}
        startAdornment={<InputAdornment position="start">Name:</InputAdornment>}
      />
      <InputBase
        className={isMobile ? classes.multilineMobile : classes.multiline}
        classes={{ root: classes.textInput, focused: classes.focused }}
        inputProps={{ "aria-label": "description" }}
        multiline
        rows={5}
        placeholder="Description"
      />
    </Container>
  );
}

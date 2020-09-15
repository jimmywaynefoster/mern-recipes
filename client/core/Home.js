import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import logo from "./../assets/images/my-recipies-logo.png";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    maxWidth: "100%",
    minHeight: "100vh",
  },
  logo: {
    width: "200px",
    marginTop: theme.spacing(4),
  },
  button: {
    margin: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    width: "128px",
    height: "44px",
    color: "#000",
    border: "none",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='3.5' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    borderRadius: "22px",
    "&:hover": {
      border: "none",
      backgroundColor: "rgba(255, 255, 251, 0.3)",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Grid container justify="center">
        <Grid item>
          <img className={classes.logo} src={logo} />
        </Grid>
        <Grid container item justify="center">
          <Button className={classes.button} color="primary">
            Register
          </Button>
          <Button className={classes.button} color="primary">
            Log in
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

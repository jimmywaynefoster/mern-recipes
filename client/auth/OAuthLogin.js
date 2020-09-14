import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: "220px",
  },
  google: {
    backgroundColor: "#DB4437",
    "&:hover": {
      backgroundColor: "#c23c30",
    },
  },
  facebook: {
    backgroundColor: "#3b5998",
    "&:hover": {
      backgroundColor: "#354f87",
    },
  },
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

export default function OAuthLogin() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      className={classes.container}
    >
      <Button
        color="primary"
        variant="contained"
        href="/auth/google"
        className={`${classes.button} ${classes.google}`}
        startIcon={<FontAwesomeIcon icon={["fab", "google"]} />}
      >
        Log in with Google
      </Button>
      <Button
        color="primary"
        variant="contained"
        href="/auth/facebook"
        className={`${classes.button} ${classes.facebook}`}
        startIcon={<FontAwesomeIcon icon={["fab", "facebook-f"]} />}
      >
        Log in with Facebook
      </Button>
    </Grid>
  );
}

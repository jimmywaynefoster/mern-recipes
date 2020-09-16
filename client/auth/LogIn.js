import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { startCase } from "lodash";
import { login } from "./api-auth.js";
import OAuthLogin from "./OAuthLogin";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    borderRadius: "40px",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='black' stroke-width='4' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  "@media (max-width: 600px)": {
    card: {
      maxWidth: 320,
    },
    textField: { width: 260 },
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    submitClicked: false,
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    if (values.email && values.password) {
      login(user).then((data) => {
        if (data.error) {
          setValues({ ...values, error: startCase(data.error.name) });
        } else {
          setValues({ ...values, error: "", redirectToReferrer: true });
        }
      });
    } else {
      setValues({ ...values, submitClicked: true });
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (values.redirectToReferrer) {
    return <Redirect to={props.location.state || "/"} />;
  }

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Log In
          </Typography>
          <TextField
            id="email"
            type="email"
            label="Email"
            color="secondary"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            error={!values.email && values.submitClicked}
            helperText={
              !values.email && values.submitClicked && "This field is required"
            }
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            color="secondary"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            error={!values.password && values.submitClicked}
            helperText={
              !values.password &&
              values.submitClicked &&
              "This field is required"
            }
          />
          <br />{" "}
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <OAuthLogin />
    </>
  );
}

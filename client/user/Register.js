import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./api-user.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import validator from "email-validator";
import { Link } from "react-router-dom";
import { startCase } from "lodash";
import OAuthLogin from "./../auth/OAuthLogin";

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

export default function Register() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    submitClicked: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    if (
      values.name &&
      values.email &&
      values.password &&
      validator.validate(values.email) &&
      !(values.password.length < 8)
    ) {
      register(user).then((data) => {
        if (data.err) {
          setValues({
            ...values,
            error: data.err.name,
            submitClicked: true,
          });
        } else {
          setValues({ ...values, error: "", open: true });
        }
      });
    } else {
      setValues({ ...values, submitClicked: true });
    }
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Register
          </Typography>
          <TextField
            id="name"
            label="Name"
            color="secondary"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
            error={!values.name && values.submitClicked}
            helperText={
              !values.name && values.submitClicked && "This field is required"
            }
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            color="secondary"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            error={
              values.submitClicked &&
              (!validator.validate(values.email) ||
                !values.email ||
                values.error)
            }
            helperText={
              values.submitClicked &&
              (!values.email
                ? "This field is required"
                : !validator.validate(values.email)
                ? "Invalid email"
                : values.error == "UserExistsError" && "User exists")
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
            error={
              values.submitClicked &&
              (values.password.length < 8 || !values.password)
            }
            helperText={
              !values.password && values.submitClicked
                ? "This field is required"
                : values.password.length < 8 &&
                  values.submitClicked &&
                  "Must be at least 8 characters "
            }
          />
          <br />{" "}
          {values.error && values.error != "UserExistsError" && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {startCase(values.error)}
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
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              OK
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

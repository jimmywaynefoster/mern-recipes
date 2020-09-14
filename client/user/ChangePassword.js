import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { changePassword } from "./api-user";
import ButtonWithAuthDialog from "./../auth/ButtonWithAuthDialog";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
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
}));

export default function ChangePassword(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: "",
    open: false,
    submitClicked: false,
  });

  const clickSubmit = () => {
    const passwords = {
      oldPassword: values.oldPassword || undefined,
      newPassword: values.newPassword || undefined,
    };

    if (
      values.newPassword == values.confirmPassword &&
      values.oldPassword &&
      values.newPassword &&
      values.confirmPassword &&
      !(values.newPassword.length < 8)
    ) {
      changePassword(passwords).then((data) => {
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
      setValues({
        ...values,
        submitClicked: true,
      });
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Change Password
          </Typography>
          <TextField
            id="oldPassword"
            type="password"
            label="Old Password"
            className={classes.textField}
            value={values.oldPassword}
            onChange={handleChange("oldPassword")}
            margin="normal"
            error={
              values.submitClicked && (!values.oldPassword || values.error)
            }
            helperText={
              values.submitClicked &&
              (!values.oldPassword
                ? "This field is required"
                : values.error == "IncorrectPasswordError" &&
                  "Incorrect password")
            }
          />
          <br />
          <TextField
            id="newPassword"
            type="password"
            label="New Password"
            className={classes.textField}
            value={values.newPassword}
            onChange={handleChange("newPassword")}
            margin="normal"
            error={
              values.submitClicked &&
              (values.newPassword.length < 8 || !values.newPassword)
            }
            helperText={
              values.submitClicked &&
              (!values.newPassword
                ? "This field is required"
                : values.newPassword.length < 8 &&
                  "Must be at least 8 characters ")
            }
          />
          <br />
          <TextField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            margin="normal"
            error={
              values.submitClicked &&
              (!values.confirmPassword ||
                values.newPassword != values.confirmPassword)
            }
            helperText={
              values.submitClicked &&
              (!values.confirmPassword
                ? "This field is required"
                : values.newPassword != values.confirmPassword &&
                  "Password does not match")
            }
          />
          <br />{" "}
        </CardContent>
        <CardActions>
          <ButtonWithAuthDialog
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
            buttonType="Button"
          >
            Submit
          </ButtonWithAuthDialog>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>Password updated</DialogTitle>
        <DialogActions>
          <Link to="/profile">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              OK
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

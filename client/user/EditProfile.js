import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import { readProfile, update } from "./api-user.js";
import { Redirect } from "react-router-dom";
import ButtonWithAuthDialog from "./../auth/ButtonWithAuthDialog";

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
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
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
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
  "@media (max-width: 600px)": {
    card: {
      maxWidth: 320,
    },
    textField: { width: 260 },
  },
}));

export default function EditProfile() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    open: false,
    error: "",
    submitClicked: false,
    redirectToProfile: false,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readProfile(signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else if (data) {
        setValues({
          ...values,
          name: data.name,
          photo: Boolean(data.name),
        });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const clickSubmit = () => {
    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.photo && userData.append("photo", values.photo);
    if (values.name) {
      update(userData).then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: "There was an error" });
        } else {
          setValues({ ...values, redirectToProfile: true });
        }
      });
    } else {
      setValues({ ...values, submitClicked: true });
    }
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const photoUrl = values.photo
    ? `/api/user/photo/?${new Date().getTime()}`
    : "/api/user/defaultphoto";

  if (values.redirectToProfile) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile
          </Typography>
          <Avatar src={photoUrl} className={classes.bigAvatar} />
          <br />
          <input
            accept="image/*"
            onChange={handleChange("photo")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
              <FileUpload />
            </Button>
          </label>{" "}
          <span className={classes.filename}>
            {values.photo ? values.photo.name : ""}
          </span>
          <br />
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
            error={!values.name && values.submitClicked}
            helperText={
              !values.name && values.submitClicked && "This field is required"
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
    </>
  );
}

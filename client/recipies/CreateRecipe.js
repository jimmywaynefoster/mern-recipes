import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
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
  servings: {
    width: `${4 * 40}px`,
    height: "44px",
    paddingLeft: theme.spacing(4),
  },
  quantity: {
    width: `${4 * 20}px`,
    height: "44px",
    paddingLeft: theme.spacing(4),
    paddingRight: 0,
    "& input": {
      maxWidth: 40,
    },
  },
  ingredientInput: {
    "& div": {
      marginRight: theme.spacing(2),
    },
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
  uploadButton: {
    margin: `${theme.spacing(1)}px 0`,
    width: "142px",
    height: "44px",
    color: "#000",
    border: "none",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    borderRadius: "22px",
    "&:hover": {
      border: "none",
      backgroundColor: "rgba(255, 255, 251, 0.3)",
    },
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
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
      <Grid container direction="column">
        <InputBase
          className={classes.textField}
          classes={{ root: classes.textInput, focused: classes.focused }}
          inputProps={{ "aria-label": "name" }}
          startAdornment={
            <InputAdornment position="start">Name:</InputAdornment>
          }
        />
        <InputBase
          className={isMobile ? classes.multilineMobile : classes.multiline}
          classes={{ root: classes.textInput, focused: classes.focused }}
          inputProps={{ "aria-label": "description" }}
          multiline
          rows={5}
          placeholder="Description"
        />
        <input
          accept="image/*"
          //onChange={handleChange("photo")}
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <Button className={classes.uploadButton} component="span">
            Upload <FileUpload />
          </Button>
        </label>{" "}
        <span className={classes.filename}>
          {/*values.photo ? values.photo.name : ""*/}photo.jpg
        </span>
        <InputBase
          className={classes.servings}
          classes={{ root: classes.textInput, focused: classes.focused }}
          type="number"
          inputProps={{ "aria-label": "servings" }}
          endAdornment={
            <InputAdornment position="end">Servings</InputAdornment>
          }
        />
        <Typography className={classes.title} variant="h5" gutterBottom>
          Ingredients
        </Typography>
        <Grid container className={classes.ingredientInput}>
          <InputBase
            className={classes.textField}
            classes={{ root: classes.textInput, focused: classes.focused }}
            inputProps={{ "aria-label": "name" }}
            placeholder="Ingredient"
          />
          <InputBase
            className={classes.quantity}
            classes={{ root: classes.textInput, focused: classes.focused }}
            type="number"
            inputProps={{ "aria-label": "quantity" }}
            placeholder="Qty"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import { useMediaQuery } from "react-responsive";
import { createRecipe } from "./api-recipes";

const SelectInput = withStyles((theme) => ({
  root: {
    height: "44px",
    margin: `${theme.spacing(1)}px 0 `,
    width: `${4 * 23}px`,
    "& svg": {
      transform: "translateX(-8px)",
    },
  },

  input: {
    height: "19px",
    padding: `12px 0 13px 24px`,
    backgroundColor: "rgba(255, 255, 249, 1)",
    borderRadius: 22,
    position: "relative",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    fontSize: 16,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      border: "none",
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4.8' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    },
    "&:focus": {
      border: "none",
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderRadius: 22,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(4),
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
  error: { backgroundColor: "rgba(244, 110, 110, 0.2)" },
  textField: {
    width: `${4 * 82}px`,
    height: "44px",
  },
  multiline: {
    width: `100%`,
    height: `${24 * 5 + 8}px`,
  },
  servings: {
    width: `${4 * 41}px`,
    height: "44px",
    paddingLeft: theme.spacing(4),
    paddingRight: 16,
  },
  quantity: {
    width: `${4 * 23}px`,
    height: "44px",
    paddingLeft: 24,
    paddingRight: 0,
    "& input": {
      maxWidth: 60,
    },
  },
  ingredientInput: {
    "&>div": {
      marginRight: theme.spacing(2),
    },
  },
  ingredientInputMobile: { marginBottom: theme.spacing(2) },
  multilineMobile: {
    width: `${4 * 82}px`,
    height: `${24 * 5 + 8}px`,
  },
  focused: {
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 1)",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4.8' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
  },
  button: {
    margin: `${theme.spacing(1)}px 0`,
    width: "142px",
    height: "44px",
    color: "#000",
    border: "none",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    borderRadius: "22px",
    "&:hover": {
      border: "none",
      backgroundColor: "rgba(255, 255, 251, 0.8)",
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4.8' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    },
  },
  uploadButton: { width: "142px", height: "44px" },
  uploadLabel: {
    width: "142px",
  },
  deleteButton: {
    width: "44px",
    minWidth: "44px",
    height: "44px",
    "& span": {
      width: "min-content",
    },
  },
  addButton: { width: "88px", height: "44px" },
  saveButton: {
    marginBottom: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    "&:hover": { backgroundColor: "#D6BEA7" },
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  step: {
    marginBottom: theme.spacing(1),
  },
  stepTitle: {
    marginRight: 12,
  },
  checkbox: {
    marginTop: theme.spacing(4),
  },
}));

export default function CreateRecipe() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const [values, setValues] = useState({
    name: "",
    description: "",
    servings: "",
    private: true,
    submitClicked: false,
  });

  const handleChange = (name) => (event) => {
    if (name == "private") {
      setValues({ ...values, private: event.target.checked });
    } else {
      setValues({ ...values, [name]: event.target.value });
    }
  };

  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "unit" },
  ]);

  const handleIngredientChange = (name, index) => (event) => {
    let newArr = ingredients.map((item, i) => {
      if (index == i) {
        return { ...item, [name]: event.target.value };
      } else {
        return item;
      }
    });
    setIngredients(newArr);
  };

  const handleAddIngredient = () => {
    setIngredients(
      ingredients.concat({ name: "", quantity: "", unit: "unit" })
    );
    setValues({ ...values, submitClicked: false });
  };

  const handleDeleteIngredient = (index) => {
    setIngredients(ingredients.filter((item, i) => i != index));
  };

  const [steps, setSteps] = useState([""]);

  const handleStepChange = (index) => (event) => {
    let newArr = steps.map((item, i) => {
      if (index == i) {
        return event.target.value;
      } else {
        return item;
      }
    });
    setSteps(newArr);
  };

  const handleAddStep = () => {
    setSteps(steps.concat(""));
    setValues({ ...values, submitClicked: false });
  };

  const handleDeleteStep = (index) => {
    setSteps(steps.filter((item, i) => i != index));
  };

  const clickSubmit = () => {
    const recipe = {
      name: values.name || undefined,
      description: values.description || undefined,
      // photo:,
      servings: values.servings || undefined,
      ingredients: ingredients || undefined,
      steps: steps || undefined,
      private: values.private,
    };

    let ingrBoolArr = ingredients.map((item) =>
      item.name && item.quantity ? true : false
    );

    let isIngrFilled =
      ingrBoolArr.length == 1
        ? ingrBoolArr[0]
        : ingrBoolArr.reduce((acc, cur) => acc && cur);

    let isStepFilled =
      steps.length == 1 ? steps[0] : steps.reduce((acc, cur) => acc && cur);

    if (values.name && values.servings && isIngrFilled && isStepFilled) {
      createRecipe(recipe).then((data) => {
        if (data.err) {
          console.log(data.err);
        } else {
          //setValues({ ...values, redirectToProfile: true });
        }
      });
    } else {
      setValues({ ...values, submitClicked: true });
    }
  };

  return (
    <Container maxWidth="md">
      <Typography className={classes.title} variant="h4" gutterBottom>
        Create Recipe
      </Typography>
      <Grid container direction="column">
        {/* ////////////RECIPE NAME//////////// */}
        <InputBase
          id="name"
          value={values.name}
          onChange={handleChange("name")}
          className={`${classes.textField} ${
            !values.name && values.submitClicked && classes.error
          }`}
          classes={{ root: classes.textInput, focused: classes.focused }}
          inputProps={{ "aria-label": "name" }}
          startAdornment={
            <InputAdornment position="start">Name:</InputAdornment>
          }
        />
        {/* ////////////DESCRIPTION//////////// */}
        <InputBase
          id="description"
          value={values.description}
          onChange={handleChange("description")}
          className={isMobile ? classes.multilineMobile : classes.multiline}
          classes={{ root: classes.textInput, focused: classes.focused }}
          inputProps={{ "aria-label": "description" }}
          multiline
          rows={5}
          placeholder="Description"
        />
        {/* ////////////UPLOAD PHOTO//////////// */}
        <input
          accept="image/*"
          //onChange={handleChange("photo")}
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file" className={classes.uploadLabel}>
          <Button
            className={`${classes.button} ${classes.uploadButton}`}
            component="span"
            endIcon={<FileUpload />}
          >
            Upload
          </Button>
        </label>{" "}
        <span className={classes.filename}>
          {/*values.photo ? values.photo.name : ""*/}photo.jpg
        </span>
        {/* ////////////SERVINGS//////////// */}
        <InputBase
          id="servings"
          value={values.servings}
          onChange={handleChange("servings")}
          className={`${classes.servings} ${
            !values.servings && values.submitClicked && classes.error
          }`}
          classes={{ root: classes.textInput, focused: classes.focused }}
          type="number"
          inputProps={{ "aria-label": "servings", min: 0 }}
          endAdornment={
            <InputAdornment position="end">Servings</InputAdornment>
          }
        />
        {/* ////////////INGREDIENTS//////////// */}
        <Typography className={classes.title} variant="h5">
          Ingredients
        </Typography>
        {ingredients.map((item, index) => (
          <Grid
            key={index}
            container
            className={`${classes.ingredientInput} ${
              isMobile && classes.ingredientInputMobile
            }`}
          >
            <InputBase
              onChange={handleIngredientChange("name", index)}
              value={item.name}
              className={`${classes.textField} ${
                !item.name && values.submitClicked && classes.error
              }`}
              classes={{ root: classes.textInput, focused: classes.focused }}
              inputProps={{ "aria-label": "ingredient" }}
              placeholder="Ingredient"
            />
            <InputBase
              onChange={handleIngredientChange("quantity", index)}
              value={item.quantity}
              className={`${classes.quantity} ${
                !item.quantity && values.submitClicked && classes.error
              }`}
              classes={{ root: classes.textInput, focused: classes.focused }}
              type="number"
              inputProps={{ "aria-label": "quantity", min: 0 }}
              placeholder="Qty"
            />
            <FormControl>
              <Select
                onChange={handleIngredientChange("unit", index)}
                value={item.unit}
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                input={<SelectInput />}
              >
                <MenuItem value="unit">unit</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="g">g</MenuItem>
                <MenuItem value="lb">lb</MenuItem>
                <MenuItem value="cup">cup</MenuItem>
                <MenuItem value="l">l</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="oz">oz</MenuItem>
                <MenuItem value="pt">pt</MenuItem>
                <MenuItem value="tsp">tsp</MenuItem>
                <MenuItem value="tbsp">tbsp</MenuItem>
              </Select>
            </FormControl>
            {ingredients.length > 1 && (
              <Button
                onClick={() => handleDeleteIngredient(index)}
                className={`${classes.button} ${classes.deleteButton}`}
              >
                <DeleteForeverIcon />
              </Button>
            )}
          </Grid>
        ))}
        <Button
          className={`${classes.button} ${classes.addButton}`}
          startIcon={<AddIcon />}
          onClick={handleAddIngredient}
        >
          Add
        </Button>
        {/* ////////////STEPS//////////// */}
        <Typography className={classes.title} variant="h5">
          Steps
        </Typography>
        {steps.map((item, index) => (
          <div className={classes.step} key={index}>
            <Grid container alignItems="center">
              <Typography className={classes.stepTitle} variant="h6">
                Step {index + 1}
              </Typography>
              {steps.length > 1 && (
                <Button
                  onClick={() => handleDeleteStep(index)}
                  className={`${classes.button} ${classes.deleteButton}`}
                >
                  <DeleteForeverIcon />
                </Button>
              )}
            </Grid>
            <InputBase
              onChange={handleStepChange(index)}
              value={item}
              className={`${
                isMobile ? classes.multilineMobile : classes.multiline
              } ${!item && values.submitClicked && classes.error}`}
              classes={{ root: classes.textInput, focused: classes.focused }}
              inputProps={{ "aria-label": "step" }}
              multiline
              rows={5}
              placeholder="Write directions..."
            />
          </div>
        ))}
        <Button
          onClick={handleAddStep}
          className={`${classes.button} ${classes.addButton}`}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
        {/* ////////////PRIVATE AND SAVE//////////// */}
        <FormControlLabel
          className={classes.checkbox}
          control={
            <Checkbox
              checked={values.private}
              id="private"
              color="default"
              onChange={handleChange("private")}
              name="private"
            />
          }
          label="Private"
        />
        <Button
          onClick={clickSubmit}
          className={`${classes.button} ${classes.saveButton}`}
        >
          Save recipe
        </Button>
      </Grid>
    </Container>
  );
}

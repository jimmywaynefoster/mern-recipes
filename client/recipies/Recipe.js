import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import defaultRecipe from "./../assets/images/default-recipe.jpg";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4),
  },
  image: {
    width: "100%",
    borderRadius: 32,
  },
  cardContainer: {
    width: "100%",
  },
  card: {
    //margin: theme.spacing(2),
    padding: theme.spacing(5),
    width: "100%",
    borderRadius: 32,
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='black' stroke-width='4' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
  },
}));

export default function Recipe() {
  const classes = useStyles();
  return (
    <Container className={classes.main} maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item lg={6}>
          <img className={classes.image} src={defaultRecipe} />
        </Grid>
        <Grid item lg={6}>
          <Typography variant="h3" gutterBottom>
            Recipe
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Servings: 4
          </Typography>
        </Grid>
        <Grid item lg={5} className={classes.cardContainer}>
          <div className={classes.card}>
            <Typography variant="h4" gutterBottom>
              Ingredients
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Ingredient 1" />
                <ListItemSecondaryAction>
                  <ListItemText primary="10 unit" />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Ingredient 2" />
                <ListItemSecondaryAction>
                  <ListItemText primary="10 unit" />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Ingredient 3" />
                <ListItemSecondaryAction>
                  <ListItemText primary="10 unit" />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Ingredient 4" />
                <ListItemSecondaryAction>
                  <ListItemText primary="10 unit" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </Grid>
        <Grid item lg={7} className={classes.cardContainer}>
          <div className={classes.card}>
            <Typography variant="h5" gutterBottom>
              Step 1
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </div>
          <br />
          <div className={classes.card}>
            <Typography variant="h5" gutterBottom>
              Step 2
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </div>
          <br />
          <div className={classes.card}>
            <Typography variant="h5" gutterBottom>
              Step 3
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </div>
          <br />
          <div className={classes.card}>
            <Typography variant="h5" gutterBottom>
              Step 4
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </div>
          <br />
        </Grid>
      </Grid>
    </Container>
  );
}

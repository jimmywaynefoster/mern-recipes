import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { readRecipe } from "./api-recipes";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4),
  },
  title: {
    color: "#866d57",
  },
  image: {
    width: "100%",
    height: 320,
    objectFit: "cover",
    borderRadius: 32,
  },
  cardContainer: {
    width: "100%",
  },
  card: {
    padding: theme.spacing(5),
    width: "100%",
    borderRadius: 32,
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='black' stroke-width='4' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
  },
}));

export default function Recipe({ match }) {
  const classes = useStyles();
  const [recipe, setRecipe] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readRecipe(
      {
        recipeId: match.params.recipeId,
      },
      signal
    ).then((data) => {
      if (data && data.err) {
        console.log(data.err);
      } else {
        setRecipe(data);
        setFetched(true);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Container className={classes.main} maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item lg={6}>
          <img
            className={classes.image}
            src={`/api/recipes/photo/${recipe._id}`}
          />
        </Grid>
        <Grid item lg={6}>
          <Typography className={classes.title} variant="h3" gutterBottom>
            {recipe.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {recipe.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Servings: {recipe.servings}
          </Typography>
        </Grid>
        <Grid item lg={5} className={classes.cardContainer}>
          <div className={classes.card}>
            <Typography variant="h4" gutterBottom>
              Ingredients
            </Typography>
            <List>
              {fetched &&
                recipe.ingredients.map((ingredient, index) => (
                  <ListItem>
                    <ListItemText primary={ingredient.name} />
                    <ListItemSecondaryAction>
                      <ListItemText
                        primary={`${ingredient.quantity} ${ingredient.unit}`}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </div>
        </Grid>
        <Grid item lg={7} className={classes.cardContainer}>
          {fetched &&
            recipe.steps.map((step, index) => (
              <>
                <div className={classes.card}>
                  <Typography variant="h5" gutterBottom>
                    Step {index + 1}
                  </Typography>
                  <Typography variant="body1">{step}</Typography>
                </div>
                <br />
              </>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}

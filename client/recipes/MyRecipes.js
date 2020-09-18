import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { listMyRecipes } from "./api-recipes";
import truncate from "lodash/truncate";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "24px 0",
    width: "100%",
    maxWidth: "100%",
  },
  title: {
    textAlign: "center",
    marginTop: 36,
    marginBottom: 16,
    color: "#866d57",
  },
  card: {
    width: 290,
    minHeight: 290,
    margin: theme.spacing(2),
    paddingBottom: "8px",
    borderRadius: "40px",
    backgroundColor: "#f9f3e5",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='black' stroke-width='4' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    "&:hover": {
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='black' stroke-width='4.8' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    },
  },
  media: {
    clipPath: "inset(12px 12px 0px 12px round 28px 28px 0px 0px)",
  },
  cardTitle: {
    lineHeight: 1,
  },
  cardDescription: { marginTop: 8 },
  link: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  addRecipeTypography: {
    textAlign: "center",
  },
  addRecipeIcon: {
    fontSize: "100px",
    width: "100%",
  },
  cardArea: {
    height: "100%",
  },
}));

export default function Insights() {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listMyRecipes(signal).then((data) => {
      if (data && data.err) {
        console.log(data.err);
      } else {
        setRecipes(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <div className={classes.main}>
      <Container maxWidth="lg">
        <Typography className={classes.title} variant="h3" gutterBottom>
          My recipes
        </Typography>
        <Grid container justify="center">
          {recipes.map((recipe, index) => (
            <Card className={classes.card} key={index}>
              <Link className={classes.link} to={"/recipe/" + recipe._id}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    alt="Recipe"
                    height="212"
                    image={`/api/recipes/photo/${recipe._id}`}
                    title="Recipe"
                  />
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {recipe.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {truncate(recipe.description, {
                        length: 65,
                        separator: /,? +/,
                      })}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))}
          <Card className={classes.card}>
            <Link className={classes.link} to="/create-recipe/">
              <CardActionArea className={classes.cardArea}>
                <CardContent>
                  <Grid container alignItems="center" justify="center">
                    <AddCircleOutlineIcon className={classes.addRecipeIcon} />
                    <Typography
                      className={classes.addRecipeTypography}
                      variant="h4"
                    >
                      Add recipe
                    </Typography>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

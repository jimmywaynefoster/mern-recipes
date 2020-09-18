import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import logo from "./../assets/images/my-recipies-logo.png";
import { listFeed } from "./../recipes/api-recipes";
import truncate from "lodash/truncate";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    maxWidth: "100%",
    minHeight: "100vh",
  },
  logo: {
    width: "200px",
    marginTop: theme.spacing(4),
  },
  button: {
    margin: `${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(3)}px`,
    width: "128px",
    height: "44px",
    color: "#000",
    border: "none",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
    borderRadius: "22px",
    "&:hover": {
      border: "none",
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='black' stroke-width='4.8' stroke-dasharray='5%2c 4' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
      backgroundColor: "rgba(255, 255, 251, 0.3)",
    },
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
  link: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Home() {
  const classes = useStyles();

  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listFeed(signal).then((data) => {
      if (data && data.err) {
        console.log(data.err);
      } else {
        setRecipes(data);
        setOpen(false);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className={classes.main}>
      <Grid container justify="center">
        <Grid item>
          <img className={classes.logo} src={logo} />
        </Grid>
        <Grid container item justify="center">
          <Link to="/register">
            <Button className={classes.button}>Register</Button>
          </Link>
          <Link to="/login">
            <Button className={classes.button}>Log in</Button>
          </Link>
        </Grid>
      </Grid>
      <Container maxWidth="lg">
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
                    <Typography
                      className={classes.cardTitle}
                      variant="h5"
                      component="h2"
                    >
                      {recipe.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      By {recipe.createdBy.name}
                    </Typography>
                    <br />
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
        </Grid>
      </Container>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

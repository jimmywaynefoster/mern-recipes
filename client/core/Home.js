import React from "react";
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
import logo from "./../assets/images/my-recipies-logo.png";
import defaultRecipe from "./../assets/images/default-recipe.jpg";

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
    maxWidth: 290,
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
}));

export default function Home() {
  const classes = useStyles();
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
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Card className={classes.card} key={index}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt="Recipe"
                  height="212"
                  image={defaultRecipe}
                  title="Recipe"
                />
                <CardContent>
                  <Typography
                    className={classes.cardTitle}
                    variant="h5"
                    component="h2"
                  >
                    Lizard
                  </Typography>
                  <Typography variant="subtitle">By John Doe</Typography>
                  <br />
                  <Typography
                    className={classes.cardDescription}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

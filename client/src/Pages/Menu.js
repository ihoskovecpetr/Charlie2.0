import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    background: "linear-gradient(white, black)"
  },
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    backgroundColor: "lightBlue"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  center: {
    textAlign: "center"
  },
  avatar: {
    width: 100,
    height: 100
  },
  gridLogo: {
    textAlign: "center"
  },
  buttonsContainer: {
    flexGrow: 1,
    padding: 20
  },
  button: {
    width: 100,
    margin: 10
  },
  text: {
    height: 0,
    top: 30,
    position: "relative",
    color: "white",
    textAlign: "center"
  },
  defaultHeader: {}
}));

export default function Menu(props) {
  const classes = useStyles();

  console.log("Menu props: ", props);

  return (
    <>
      <Container maxWidth="sm">
        <Grid
          container
          justify="center"
          direction="column"
          className={classes.container}
        >
          <Grid item>
            <Typography variant="h4" component="h3" className={classes.center}>
              PROJECT
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h3" component="h3" className={classes.center}>
              CHARLIE
            </Typography>
          </Grid>

          <Grid item justify="center" alignItems="center">
            <Grid container justify="center">
              <Avatar
                className={classes.avatar}
                alt="Remy Sharp"
                src="https://res.cloudinary.com/party-images-app/image/upload/v1557794256/ojkgl1hkiljwij69njbb.png"
              />
            </Grid>
            <Grid
              container
              justify="center"
              direction="row"
              className={classes.buttonsContainer}
            >
              <NavLink to={`/map`}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    MAP
                  </Button>
                </Grid>
              </NavLink>
              <NavLink to={`/create`}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    CREATE
                  </Button>
                </Grid>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
        <Grid item justify="center" alignItems="center">
          <Typography variant="h6" component="h6" className={classes.text}>
            “Have you ever seen house on the beach or flat in a skyscraper and
            wonder how would it be to enjoy a drink in there?”
          </Typography>
          <CardMedia
            className={classes.media}
            image="https://res.cloudinary.com/party-images-app/image/upload/v1561628664/gwztargtbcyjjwmpz3tw.png"
            title="Paella dish"
          />
        </Grid>

        <Grid item>
          <Typography
            variant="h3"
            component="h3"
            className={classes.defaultHeader}
          >
            Your next Event
          </Typography>
        </Grid>

        {props.ListOfUrls.map((item, index) => (
          <NavLink to={`/${item}`} key={index}>
            <Paper className={classes.root}>
              <Typography variant="h5" component="h3">
                {props.ListOfNames[index]}
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your
                application.
              </Typography>
            </Paper>
          </NavLink>
        ))}
      </Container>
    </>
  );
}

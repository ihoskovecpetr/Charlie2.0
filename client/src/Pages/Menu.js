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
import IconButton from "@material-ui/core/IconButton";
import ExploreIcon from "@material-ui/icons/Explore";
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { withTheme } from "@material-ui/styles";

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
  blackContainer:{
    background: theme.palette.darkGrey,
    color: "white",
  },
  defaultHeader: { 
    color: theme.palette.charliePink,
    fontWeight: 300
  },
  
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
            variant="h5"
            component="h5"
            className={classes.defaultHeader}
          >
            Your next Event
          </Typography>
        </Grid>
        <Grid item>
        <Paper className={classes.root}>
              <Typography variant="h5" component="h3">
                GALLERY
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your
                application.
              </Typography>
            </Paper>
</Grid>


        <Grid container>
        <Grid item>
          <Typography
            variant="h6"
            component="h6"
            className={classes.defaultHeader}
          >
            MAIN <b>MISSION</b>
          </Typography>
            </Grid>
          <Grid item>
          <Typography
            variant="body2"
          >
            Charlie is here to connect owners or renters of miscelanous 
            places with guest for a joyfull evening 
          </Typography>
            </Grid>
          </Grid>

        <Grid container>
          <Grid item>
          <Typography
            variant="h6"
            component="h6"
            className={classes.defaultHeader}
          >
            CHARLIE <b>INTRO</b>
          </Typography>
            </Grid>
          </Grid>


      <Grid container>
        <Grid item>
        <iframe src="https://www.youtube.com/embed/PogfNxsugF0" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item>
          <Typography
            variant="h5"
            component="h5"
            className={classes.defaultHeader}
          >
            SUMMMARY OF <b>KEY FEATURES</b>
          </Typography>
            </Grid>
        </Grid>

        <Grid container  className={classes.blackContainer}>
          <Grid item>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={props.handleDrawerToggle}
                className={classes.menuButton}
              >
                <ExploreIcon fontSize="large" />
              </IconButton>
          </Grid>
          <Grid item>
              <Typography
                variant="subtitle2" gutterBottom
              >
                DISCOVER
              </Typography>
            <Typography variant="subtitle2" gutterBottom >
              Find your favourite event in Sydney and enjoy evening
            </Typography>
            <Typography variant="body2" gutterBottom>
              <ul>
                <li>JOIN event</li>
                <li>Bring your own drinks</li>
                <li>ENJOY evening</li>
              </ul>
            </Typography>
          </Grid>
      </Grid>

      <Grid container  className={classes.blackContainer}>
          <Grid item>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={props.handleDrawerToggle}
                className={classes.menuButton}
              >
                <AccessibilityNewIcon fontSize="large" />
              </IconButton>
          </Grid>
          <Grid item>
              <Typography
                variant="subtitle2" gutterBottom
              >
                CREATE
              </Typography>
            <Typography variant="subtitle2" gutterBottom >
            Create your first CHARLIE event and start earning
            </Typography>
            <Typography variant="body2" gutterBottom>
              <ul>
                <li>CREATE event</li>
                <li>Welcomme guests</li>
                <li>EARN entry fee</li>
              </ul>
            </Typography>
          </Grid>
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

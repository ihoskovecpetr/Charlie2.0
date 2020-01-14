import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import { NavLink } from "react-router-dom";
import { Animated } from "react-animated-css";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import "../../Pages/Menu.css";

import Copyright from "../../Atoms/copyright";
import SocialLine from "../../Atoms/social-line";

export default function Screen1() {
  const classes = useStyles();

  return (
    <div className="section s6">
      <Container maxWidth="sm" className={classes.container_6}>
        <Grid item>
          <Typography className={classes.defaultHeader}>
            <b>CONTACT</b> US
          </Typography>
        </Grid>
        <Grid container>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              //color="secondary"

              //inputRef={inputName}
              label="Your Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows="5"
              //color="secondary"
              id="question"
              //inputRef={inputName}
              label="Your Question"
              name="question"
              autoComplete="text"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              //onClick={e => onSubmit(e)}
            >
              Send
            </Button>
          </form>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <Typography variant="body2">GET IN TOUCH</Typography>
            </Grid>

            <Grid item>
              <Typography variant="body2">Sydney NSW, Australia</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">charliepartyapp@gmail.com</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">0435-388-698</Typography>
            </Grid>
            <SocialLine color="secondary" />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl">
        <CardMedia
          className={classes.cardMediaBottom}
          image="https://res.cloudinary.com/party-images-app/image/upload/v1559960064/uvic6vretl0zabrk570z.png"
          title="Paella dish"
        />
      </Container>
      <Container maxWidth="sm">
        <Grid container>
          <SocialLine color="secondary" />
          <Grid item>
            <NavLink to={`/privacy-policy`}>
              <Grid item>
                <Typography variant="subtitle2">PRIVACY POLICY</Typography>
              </Grid>
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink to={`/faq`}>
              <Grid item>
                <Typography variant="subtitle2">F.A.Q.</Typography>
              </Grid>
            </NavLink>
          </Grid>
        </Grid>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container_6: {
    color: "black",
    //background: "rgba(25,25,25,0.3)"
    paddingTop: "4vh"
  },
  cardMediaBottom: {
    width: "100%",
    height: 200,
    paddingTop: "56.25%" // 16:9
  },
  menuButton: {
    background: "white"
  },
  avatar: {
    width: 100,
    height: 100
  },
  gridLogo: {
    textAlign: "center"
  },
  button: {
    width: 100,
    margin: 10,
    fontWeight: "700 !important"
  },
  text: {
    color: "black",
    fontWeight: 400
  },
  blackContainer: {
    background: theme.palette.darkGrey,
    color: "white",
    padding: 10,
    marginBottom: 20
  },

  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    paddingTop: 20,
    fontSize: 20,
    margin: 10
  },
  defaultContent: {
    margin: 20,
    fontWeight: 500
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(5)
  }
}));

import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import { Animated } from "react-animated-css";

import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import "../../../Pages/Menu.css";

import Carousel from "../../../Atoms/carousel";

import randomgirl1 from "../../../Images/randomgirl1.png";
import post2A from "../../../Images/post2A.png";
import post2B from "../../../Images/post2B.png";
import post2C from "../../../Images/post2C.png";

export default function BlogPosts() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" >
      <Animated
        animationIn="bounceInUp"
        animationOut="fadeOut"
        animationInDelay={500}
        animationInDuration={1000}
        isVisible={true}
      >
        <Grid item>
          <Typography className={classes.defaultHeader}>
            CHARLIE <b>BLOG</b>
          </Typography>
        </Grid>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item></Grid>
          <Grid item>
            <Avatar
              alt="Author"
              sizes="large"
              src={randomgirl1}
              className={classes.avatarUser}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h5" className={classes.defaultDescription}>
              ‘People like my food’
              </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" component="p" className={classes.defaultContent}>
              I do not have the best flat with view on the bay, but I know how
              to make delicious food which make all the guests happy and they
              love to come again and again.
            </Typography>
          </Grid>
        </Grid>
        <Carousel
          images={[
            post2A,
            post2B,
            post2C
          ]}
        />
      </Animated>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    paddingTop: 20,
    fontSize: 20,
    margin: 10
  },
  defaultContent: {
    margin: 20,
    marginTop: 10,
    fontWeight: 500,
    textAlign: "center"
  },
  avatarUser: {
    height: 50,
    width: 50,
    marginTop: 10,
  },
  defaultDescription: {
    textAlign: "center",
    margin: 30
  }
}));

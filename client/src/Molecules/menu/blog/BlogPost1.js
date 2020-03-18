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

import post1A from "../../../Images/post1A.png";
import post1B from "../../../Images/post1B.png";
import post1C from "../../../Images/post1C.png";
import randomguy1 from "../../../Images/randomguy1.png";

export default function BlogPosts() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" >
      <Animated
        animationIn="bounceInUp"
        animationOut="fadeOut"
        animationInDelay={0}
        animationInDuration={1000}
        isVisible={true}
      >
        <Grid item>
          <Typography className={classes.defaultHeader}>
            CHARLIE <b>BLOG</b>
          </Typography>
        </Grid>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item>
            <Avatar
              alt="Author"
              sizes="large"
              src={randomguy1}
              className={classes.avatarUser}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h5"  className={classes.defaultDescription}>
              ‘Its all about the view from my balcony’
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" component="p" className={classes.defaultContent}>
              I do have nice flat in the Sydney and I love to share this place
              with other people via Charlie. I do offer bbq nights twice a week
              and it alone can pay my rent in this beautiful place
            </Typography>
          </Grid>
        </Grid>
        <Carousel
          images={[
            post1A, 
            post1B,
            post1C
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

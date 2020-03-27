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

import randomguy2 from "../../../Images/randomguy2.jpg";
import post3A from "../../../Images/post3A.png";
import post3B from "../../../Images/post3B.png";
import post3C from "../../../Images/post3C.png";

export default function BlogPosts() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.mainContainer}>
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
              src={randomguy2}
              className={classes.avatarUser}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h5" className={classes.defaultDescription}>
              ‘I love to share my great flat with others’
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" component="p" className={classes.defaultContent}>
              Come to hang out in my flat, it is pretty neat place. I do love
              this energy from young people. I use it as a motivation in my life
              and my business.
            </Typography>
          </Grid>
        </Grid>
        <Carousel
          images={[
                post3A,
                post3B,
                post3C  
              ]}
        />
      </Animated>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    paddingBottom: 40
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

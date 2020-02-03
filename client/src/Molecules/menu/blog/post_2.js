import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import { Animated } from "react-animated-css";

import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import "../../../Pages/Menu.css";

import Carousel from "../../../Atoms/carousel";

export default function BlogPosts() {
  const classes = useStyles();

  return (
    <div>
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
              src="https://res.cloudinary.com/party-images-app/image/upload/v1553557168/cgnjfgxcbegttvftwbox.png"
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">‘People like my food’</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" className={classes.defaultContent}>
              I do not have the best flat with view on the bay, but I know how
              to make delicious food which make all the guests happy and they
              love to come again and again.
            </Typography>
          </Grid>
        </Grid>
        <Carousel
          images={[
            "https://res.cloudinary.com/party-images-app/image/upload/v1553558709/hdyqsmvfmye0abxbmo6v.png",

            "https://res.cloudinary.com/party-images-app/image/upload/v1553558710/kuh7whsezyjnbbtlphg2.png",

            "https://res.cloudinary.com/party-images-app/image/upload/v1553558710/fh4mqii1zzgtd2sircza.png"
          ]}
        />
      </Animated>
    </div>
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
    fontWeight: 500
  }
}));

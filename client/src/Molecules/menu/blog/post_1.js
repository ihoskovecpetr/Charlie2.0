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
              src="https://res.cloudinary.com/party-images-app/image/upload/v1553553202/eredff7zmlr65fm3bbue.png"
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">
              ‘Its all about the view from my balcony’
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" className={classes.defaultContent}>
              I do have nice flat in the Sydney and I love to share this place
              with other people via Charlie. I do offer bbq nights twice a week
              and it alone can pay my rent in this beautiful place
            </Typography>
          </Grid>
        </Grid>
        <Carousel
          images={[
            "https://res.cloudinary.com/party-images-app/image/upload/v1553554542/ixgdwwuaasm5f49cfhpb.png",
            "https://res.cloudinary.com/party-images-app/image/upload/v1553554542/ukwkr5wraaezjeipbrgr.png",
            "https://res.cloudinary.com/party-images-app/image/upload/v1553559427/xbugpqhcehvfatnpdrxi.png"
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

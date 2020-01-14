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
    <>
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
            src="https://res.cloudinary.com/party-images-app/image/upload/v1555136792/qcb1xwjgfb1ozhhgmajg.jpg"
          />
        </Grid>
        <Grid item>
          <Typography variant="h5" className={classes.nadpis}>
            ‘I love to share my great flat with others’
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" className={classes.defaultContent}>
            Come to hang out in my flat, it is pretty neat place. I do love this
            energy from young people. I use it as a motivation in my life and my
            business.
          </Typography>
        </Grid>
      </Grid>
      <Carousel
        images={[
          "https://res.cloudinary.com/party-images-app/image/upload/v1555137923/hp9x1b6w6hxx7ipk9nyw.png",
          "https://res.cloudinary.com/party-images-app/image/upload/v1555137919/k74xwqzb3ssmh0mezqg5.png",
          "https://res.cloudinary.com/party-images-app/image/upload/v1555137918/ozocoqfkuouyaomybh4u.png"
        ]}
      />
    </>
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
  },
  nadpis: {}
}));

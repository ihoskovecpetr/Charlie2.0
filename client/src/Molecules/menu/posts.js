import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { Animated } from "react-animated-css";

import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import "../../Pages/Menu.css";

import Carousel from "../../Atoms/carousel";
import Skyline from "../../Images/skyline.png";
import BlogPost1 from "./blog/post_1";
import BlogPost2 from "./blog/post_2";
import BlogPost3 from "./blog/post_3";

export default function BlogPosts() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container_4}>
      <Grid container>
        <Grid item xs={4} className={classes.quarter_grid}>
          <BlogPost1 />
        </Grid>
        <Grid item xs={4} className={classes.quarter_grid}>
          <BlogPost2 />
        </Grid>
        <Grid item xs={4} className={classes.quarter_grid}>
          <BlogPost3 />
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  container_5: {
    height: "100vh",
    color: "black",
    paddingTop: "12vh"
  },
  quarter_grid: {
    height: "64vh",
    padding: "2vh"
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
  }
}));

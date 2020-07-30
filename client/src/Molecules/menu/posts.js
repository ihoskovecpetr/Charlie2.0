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
import BlogPost1 from "./blog/BlogPost1";
import BlogPost2 from "./blog/BlogPost2";
import BlogPost3 from "./blog/BlogPost3";

export default function BlogPosts() {
  const classes = useStyles();

  return (
    <Container
      maxWidth="xl"
      className={classes.container_4}
      id="s_posts_id"
      style={{ display: "block" }}
    >
      <Grid container>
        <Grid item xs={4} className={classes.quarter_grid}>
          <Animated
            animationIn="bounceInUp"
            animationOut="fadeOut"
            animationInDelay={500}
            animationInDuration={1000}
            isVisible={true}
          >
            <BlogPost1 />
          </Animated>
        </Grid>
        <Grid item xs={4} className={classes.quarter_grid}>
          <Animated
            animationIn="bounceInDown"
            animationOut="fadeOut"
            animationInDelay={500}
            animationInDuration={1000}
            isVisible={true}
          >
            <BlogPost2 />
          </Animated>
        </Grid>
        <Grid item xs={4} className={classes.quarter_grid}>
          <Animated
            animationIn="bounceInUp"
            animationOut="fadeOut"
            animationInDelay={500}
            animationInDuration={1000}
            isVisible={true}
          >
            <BlogPost3 />
          </Animated>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container_5: {
    height: "100vh",
    color: "black",
    paddingTop: "12vh",
  },
  quarter_grid: {
    height: "64vh",
    padding: "2vh",
  },
  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    paddingTop: 20,
    fontSize: 20,
    margin: 10,
  },
  defaultContent: {
    margin: 20,
    fontWeight: 500,
  },
}));

import React from "react";
import Carousel from "react-material-ui-carousel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

export default function Example(props) {
  const classes = useStyles();

  return (
    <Carousel>
      <CardMedia
        className={classes.media}
        image={props.images[0]}
        title="Paella dish"
      />

      <CardMedia
        className={classes.media}
        image={props.images[1]}
        title="Paella dish"
      />
      <CardMedia
        className={classes.media}
        image={props.images[2]}
        title="Paella dish"
      />
    </Carousel>
  );
}

const useStyles = makeStyles(theme => ({
  media: {
    width: "100%",
    height: 200
  }
}));

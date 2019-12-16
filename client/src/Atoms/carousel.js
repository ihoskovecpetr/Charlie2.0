import React from "react";
import Carousel from "react-material-ui-carousel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

// const Images = [
//   "https://res.cloudinary.com/party-images-app/image/upload/v1553554542/ixgdwwuaasm5f49cfhpb.png",
//   "https://res.cloudinary.com/party-images-app/image/upload/v1553554542/ukwkr5wraaezjeipbrgr.png",
//   "https://res.cloudinary.com/party-images-app/image/upload/v1553559427/xbugpqhcehvfatnpdrxi.png"
// ];

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

export default function Example(props) {
  const classes = useStyles();
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!"
    },
    {
      name: "Random Name #2",
      description: "Hello World!"
    }
  ];

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
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  media: {
    width: "100%",
    height: 200
  }
}));

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Rating from "@material-ui/lab/Rating";

import StarRatingComponent from "react-star-rating-component";

import { displayDate } from "../Services/transform-services";
import { Z_BLOCK } from "zlib";

const useStyles = makeStyles(theme => ({
  card: {
    //maxWidth: 345,
    //minWidth: 300,
    width: "100%",
    display: "block",
    marginBottom: 5,
    background: "rgba(255,255,255,0.5)"
  },
  cardHeader: {
    width: "100%",
    padding: 0
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  starContainer: {
    fontSize: 20
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className={classes.cardHeader}
          >
            <Avatar
              aria-label="recipe"
              src={props.rating.guest.picture}
              className={classes.avatar}
            >
              R
            </Avatar>
          </IconButton>
        }
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className={classes.cardHeader}
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={
          <Rating
            name="simple-controlled"
            readOnly
            value={props.rating.ratingValue}
          />
        }
        //title={props.rating.guest.name}
        subheader={props.rating.guest.name}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle2">Message:</Typography>
          <Avatar
            aria-label="recipe"
            src={props.rating.guest.picture}
            className={classes.avatar}
          >
            R
          </Avatar>
          <Typography paragraph>{props.rating.message}</Typography>
          {displayDate(props.rating.createdAt)}
        </CardContent>
      </Collapse>
    </Card>
  );
}

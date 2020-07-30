import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { withRouter, useHistory, NavLink } from "react-router-dom";

import { displayDate } from "../Services/transform-services";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 500,
    width: "100%",
    marginBottom: 5,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
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
          <NavLink to={`/user/${props.event.author._id}`}>
            <Avatar
              aria-label="recipe"
              src={props.event.author.picture}
              className={classes.avatar}
            >
              R
            </Avatar>
          </NavLink>
        }
        action={
          <NavLink to={`/event/${props.event._id}`}>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </NavLink>
        }
        title={
          <NavLink to={`/event/${props.event._id}`}>{props.event.name}</NavLink>
        }
        subheader={displayDate(props.event.dateStart)}
      />
      <NavLink to={`/event/${props.event._id}`}>
        <CardMedia
          className={classes.media}
          //image="/static/images/cards/paella.jpg"
          image={props.event.imagesArr[0].src}
          title="Paella dish"
        />
      </NavLink>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon fontSize="large" />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.event.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

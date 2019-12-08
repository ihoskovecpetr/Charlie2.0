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

import StarRatingComponent from "react-star-rating-component";

import { displayDate } from "../Services/transform-services";
import { Z_BLOCK } from "zlib";

const useStyles = makeStyles(theme => ({
  card: {
    //maxWidth: 345,
    minWidth: 300,
    width: "100%",
    display: "block",
    marginBottom: 5
  },
  cardHeader: {
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
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
            <ExpandMoreIcon />
          </IconButton>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
          <StarRatingComponent
            name={String} /* name of the radio input, it is required */
            className={classes.starContainer}
            value={
              props.rating.ratingValue
            } /* number of selected icon (`0` - none, `1` - first) */
            starCount={5} /* number of icons in rating, default `5` */
            starColor={
              "#E8045D"
            } /* color of selected icons, default `#ffb400` */
            emptyStarColor={
              "#999"
            } /* color of non-selected icons, default `#333` */
            editing={
              false
            } /* is component available for editing, default `true` */
          />
        }
        //title={props.rating.guest.name}
        subheader={props.rating.guest.name}
      />
      <CardActions disableSpacing></CardActions>
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

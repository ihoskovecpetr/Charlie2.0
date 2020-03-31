import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Rating from "@material-ui/lab/Rating";


import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import countdown from "countdown";
import { withRouter, useHistory, NavLink } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useXsSize } from "../../Hooks/useXsSize";
import { UserContext } from "../../userContext";

import { displayDate } from "../../Services/transform-services";
import ConfirmPNG from "../../Images/confirm_pink.png";
import ClosePNG from "../../Images/close_black.png";
import UserAskMessage from "./UserAskMessage";
import EventInfoLines from "./EventInfoLines";

const CONFIRM_BOOKING = gql`
  mutation confirmBooking(
    $event_id: ID!
    $user_id: ID!
    $decision: Boolean
    $response: String
  ) {
    confirmBooking(
      event_id: $event_id
      user_id: $user_id
      decision: $decision
      response: $response
    ) {
      success
    }
  }
`;

export default function AcceptBookingCard({ rating }) {
  const classes = useStyles();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const [expanded, setExpanded] = useState(false);
  const { context } = useContext(UserContext);

  // console.log("event card props: ", props);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log("RatCRD: ", rating);

  let color = "transparent"
  if(expanded){
    if(md_size_memo){
      color = "rgba(0,0,0,0.1)"
    } else {
      color = "white" //"rgba(0,0,0,0.05)"
    }
  }

let badgeContent 

  return (
    <Grid container justify="center" alignItems="flex-start" className={classes.naimContainer}>
    <Grid
      item
      className={classes.mainItem}
      style={{
        // boxShadow: expanded ? "4px 3px 5px 0px rgba(0,0,0,0.5)" : "none",
        color: md_size_memo ? "white" : "black",
        width: xs_size_memo ? "100%" : "85%",
        backgroundColor: expanded ? color : "transparent",
        borderBottom: xs_size_memo ? "1px solid white" : "3px solid white"
      }}
    >
      <Grid
        container
        onClick={handleExpandClick}
        alignItems="center"
        className={classes.mainSolidLine}
      >
        <Grid item xs={xs_size_memo ? 3 : 2}>
          <Grid container justify="center">
            <Grid item className={classes.itemAvatar}>
              <IconButton aria-label="settings">

                  <Avatar
                    src={rating.guest.picture}
                    className={classes.mainAvatar}
                  />
              </IconButton>
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={xs_size_memo ? 9 : 8}>
          <Typography
            variant="body2"
            align="left"
            className={classes.mainHeader}
          >
            <b>{rating.guest.name}</b> rated you <b>{rating.ratingValue}*</b> for event <b>{rating.event.name}</b>
          </Typography>
          <Typography
            variant="body2"
            align="left"
          >
            {!expanded ? <Rating name="simple-controlled" readOnly value={rating.ratingValue}  className={classes.ratingSmall}/> : null}
          </Typography>
          <Typography
            variant="body2"
            align="left"
            className={classes.countdown}
          >
            {countdown(
              new Date(rating.createdAt),
              new Date(),
              "X",
              1
            ).toString()}{" "}
            ago
          </Typography>
        </Grid>

        {!xs_size_memo && (
          <Grid item xs={2}>
            <Grid container justify="center">
              <Grid
                item
                style={{
                  transition: "transform .1s ease-in-out",
                  transform: expanded ? "rotate(-180deg)" : "rotate(0deg)"
                }}
              >
                <IconButton aria-label="settings">
                  <ExpandMoreIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Grid
          container
          alignItems="center"
          direction="row"
          spacing={2}
          className={classes.middleBody}
        >
      <Grid container alignItems="center" direction="column" className={classes.starsBody}>
            <Grid item className={classes.body}>
            <Rating name="simple-controlled" readOnly value={rating.ratingValue} />
            </Grid>
            <Grid item className={classes.body}>
              <Typography
              variant="body2"
              align="left"
              className={classes.mainHeader}
            >
              <b>{rating.message}</b>
            </Typography>
            </Grid>
      </Grid>


          <Grid item xs={12}>
              <EventInfoLines
                event={rating.event}
                name={rating.event.name}
                date={rating.event.dateStart}
              />
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  naimContainer: {
    color: "black",
    width: "100%", 
    minHeight: "100vh"
  },
  mainItem: {
    // borderRadius: 15,
    // borderBottom: "3px solid white" //#707070
    // margin: 10,
    // padding: 10
  },
  mainSolidLine: {
    marginTop: 10,
    marginBottom: 20
  },
  leftMiddleItem: {},
  middleBody: {
    paddingBottom: 10,
    width: "100%"
  },
  ratingSmall:{
    marginLeft: 20,
    marginTop: 10,
    fontSize: 14,
  },
  starsBody: {
    paddingTop: 10,
    paddingBottom: 10
  },
  mainHeader: {
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20
  },
  countdown: {
    marginTop: 10,
    fontWeight: 600,
    color: "grey",
    marginLeft: 20
  },
  badge: {
    padding: '0 important'
  },
  dotBadge: {
    height: 15,
    width: 15
  },
  userAvatar: {
    backgroundColor: red[500],
    height: 80,
    width: 80
  },
  btnContainer: {
    marginBottom: 5,
    marginTop: 10
  },
  textField: {},
  textFieldCont: {
    margin: 10
  },
  btnWrapLeft: {
    borderRight: "1px solid #707070"
  },
  btn: {
    // height: 50,
    // width: "50%"
  },
  itemAvatar: {

  },
  mainAvatar: {
    height: 60,
    width: 60
  },

}));

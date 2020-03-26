import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import TextField from "@material-ui/core/TextField";
import Badge from '@material-ui/core/Badge';

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

export default function AcceptBookingCard({ event, PROFILE_DATA }) {
  const classes = useStyles();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const [expanded, setExpanded] = useState(false);
  const { context } = useContext(UserContext);
  const [confirmBooking, confirmStates] = useMutation(CONFIRM_BOOKING);

  const inputDescription = useRef(null);

  // console.log("event card props: ", props);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log("AcceptBookingCard: ", event);

  const ConfirmHandle = () => {
    confirmBooking({
      variables: {
        user_id: event.user._id,
        event_id: event.event._id,
        decision: true,
        response: inputDescription.current.value
      },
      refetchQueries: () => [
        {
          query: PROFILE_DATA,
          variables: { host_id: context._id }
        }
        // {
        //   query: ALL_EVENTS,
        //   variables: {
        //     date: new Date(props.event.dateStart)
        //       .toISOString()
        //       .split("T")[0]
        //   }
        // }
      ]
    });
  };

  let color = "transparent"
  if(expanded){
    if(xs_size_memo){
      color = "rgba(255,255,255,0.1)"
    } else {
      color = "white" //"rgba(0,0,0,0.05)"
    }
  }

let badgeContent 
if(event.decided){
    if(event.confirmed){
      badgeContent =  <DoneIcon fontSize="small" />
    } else {
      badgeContent =  <CloseIcon fontSize="small" /> //"rgba(0,0,0,0.05)"
    }
  } else {
    badgeContent = <FiberManualRecordIcon fontSize="small" className={classes.dotBadge} /> 
  }

  return (
    <Grid
      item
      className={classes.mainItem}
      style={{
        // boxShadow: expanded ? "4px 3px 5px 0px rgba(0,0,0,0.5)" : "none",
        color: md_size_memo ? "white" : "black",
        width: xs_size_memo ? "100%" : "70%",
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
            <Grid item alignContent="center" className={classes.itemAvatar}>
              <IconButton aria-label="settings">
                <Badge badgeContent={badgeContent} 
                        className={classes.badge} 
                        color={event.decided ? "primary" : "secondary"}
                        // style={{ backgroundColor: event.decided ? "grey" : "red"}}
                        >
                  <Avatar
                    src={event.user.picture}
                    className={classes.mainAvatar}
                  />
                </Badge>
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
            <b>{event.user.name}</b> wants to join your event{" "}
            <b>{event.event.name}</b>
          </Typography>
          <Typography
            variant="body2"
            align="left"
            className={classes.countdown}
          >
            {countdown(
              new Date(event.createdAt),
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
                alignContent="center"
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
          direction="column-reverse"
          className={classes.middleBody}
        >
          <Grid item sm={12} xs={12} className={classes.leftMiddleItem}>
            <UserAskMessage user={event.user} message={event.message} />
            {event.response && (
              <UserAskMessage
                reverse={true}
                user={event.event.author}
                message={event.response}
              />
            )}
          </Grid>
          <Grid item sm={12} xs={12}>
            <EventInfoLines
              event={event.event}
              name={event.event.name}
              date={event.event.dateStart}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            {!event.decided && (
              <Grid container className={classes.btnContainer}>
                <Grid item xs={12}>
                  <Grid
                    container
                    justify="center"
                    className={classes.textFieldCont}
                  >
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Response..."
                        variant="outlined"
                        inputRef={inputDescription}
                        className={classes.textField}
                        style={{ width: xs_size_memo ? "100%" : "300px" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} className={classes.btnWrapLeft}>
                  <Grid container justify="center">
                    <Grid item>
                      <IconButton aria-label="settings">
                        <Avatar src={ClosePNG} className={classes.btnAvatar} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify="center">
                    <Grid item>
                      <IconButton aria-label="settings" onClick={ConfirmHandle}>
                        <Avatar
                          src={ConfirmPNG}
                          className={classes.btnAvatar}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
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
  middleBody: {},
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
  btnAvatar: {
    height: 20,
    width: 20
  },
  thisLine: {
    height: "1px",
    width: "100%",
    marginTop: "2px",
    backgroundColor: "#707070"
  }
}));

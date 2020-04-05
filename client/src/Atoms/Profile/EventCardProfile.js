import React, { useState, useRef, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Badge from '@material-ui/core/Badge';

import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import countdown from "countdown";
import { withRouter, useHistory, NavLink } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useXsSize } from "../../Hooks/useXsSize";
import { UserContext } from "../../userContext";

import PlayListWrap from "./PlayListWrap";
import PlayPageGallery from "../../Molecules/play/PlayPageGallery";
import PlayPageMap from "../../Molecules/play/PlayPageMap";


export default function EventCardProfile({ event }) {
  const classes = useStyles();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const [expanded, setExpanded] = useState(false);
  const { context, setContext } = useContext(UserContext);

  const inputDescription = useRef(null);

  useEffect(() => {
    if(context.expanded_id === event._id){
      setExpanded(true)
    }else{
      setExpanded(false)
    }
  }, [context.expanded_id])

  const handleExpandClick = () => {

    console.log("event._id: ", event._id)

    if(context.expanded_id === event._id){
      setContext(prev => {
        return { ...prev, 
          expanded_id: null
        };
        })
    } else{
          setContext(prev => {
            return { ...prev, 
              expanded_id: event._id
            };
        })
    }
  };

  console.log("EventCardProfile evnt: ", event);

  let bgColor = "transparent"
  if(expanded){
    if(md_size_memo){
      bgColor = "rgba(0,0,0,0.1)"
    } else {
      bgColor = "transparent" //"rgba(0,0,0,0.05)"
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
        width: xs_size_memo ? "100%" : "86%",
        backgroundColor: expanded ? bgColor : "transparent",
        borderBottom: xs_size_memo ? "1px solid white" : "2px solid lightGrey"
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
                <Badge badgeContent={badgeContent} 
                        className={classes.badge} 
                        color={event ? "primary" : "secondary"}
                        // style={{ backgroundColor: event.decided ? "grey" : "red"}}
                        >
                  <Avatar
                    src={event.author.picture}
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
            <b>{event.author.name}</b> and his Event{" "}
            <b>{event.name}</b>
          </Typography>
          <Typography
            variant="body2"
            align="left"
            className={classes.countdown}
          >
            {countdown(
              new Date(event.dateStart),
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

          <PlayPageGallery event={event} />
          <PlayListWrap
              event={event}
              // showBookings={dataDB.showBookings} //showBookings
              // ONE_EVENT={PLAY_EVENTS}
              // cancelBooking={cancelBooking}
              // cancelledState={cancelledState}
            />
          <PlayPageMap
              event={event}
              paddingSides={"0px"}
              // showBookings={getPlayEvents.bookings} //showBookings
            /> 

            <Grid container justify="center">
              <Grid
                item
              >
                <IconButton
                      aria-label="settings" 
                      style={{backgroundColor: "lightGrey",margin: 5}}
                      onClick={handleExpandClick}>
                  <ExpandLessIcon fontSize="large" />
                </IconButton>
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
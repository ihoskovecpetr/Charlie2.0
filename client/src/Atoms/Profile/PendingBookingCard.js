import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';

import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import countdown from "countdown";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useXsSize } from "../../Hooks/useXsSize";
import { UserContext } from "../../userContext";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import { SEEN_BOOKING } from "src/Services/GQL/SEEN_BOOKING";

import PartyOn from "src/Atoms/PartyOn";
import BookingMessages from "src/Atoms/BookingMessages";
import ListTopHalf from "src/Atoms/Play/ListTopHalf";
import EventButtons from "src/Molecules/event/EventButtons";


export default function PendingBokingCard({ booking }) {
  const classes = useStyles();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const { context, setContext } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const [markBookingSeen, seenStates] = useMutation(SEEN_BOOKING);

  console.log("Rerender PendingBokingCard: ", booking.event.name)

useEffect(() => {
  // if(context.expanded_id === booking._id){
  //   setExpanded(true)
  // }else{
  //   setExpanded(false)
  // }
}, [])


  const handleExpandClick = () => {

    if(expanded){
      setExpanded(false)
      // setContext(prev => {
      //   return { ...prev, 
      //     expanded_id: null
      //   };
      //   })
    } else{
        setExpanded(true)
      //   setContext(prev => {
      //     return { ...prev, 
      //       expanded_id: booking._id
      //     };
      // })
    }
    // seenUserHandle()
  };

  const seenUserHandle = () => {
    markBookingSeen({
      variables: {
        booking_id: booking._id,
        user: true,
      },
      refetchQueries: () => [
        {
          query: PROFILE_DATA,
          variables: { host_id: context._id }
        }
      ]
    });
  };

  let color = "transparent"
  if(expanded){
    if(md_size_memo){
      color = "rgba(0,0,0,0.1)"
    } else {
      color = "white" //"rgba(0,0,0,0.05)"
    }
  }else{
    if(md_size_memo){
      if(booking.seenUser === false){
        color = "rgba(0,0,0,0.1)"
      }
    }else{
          if(booking.seenUser === false){
      color = "white"
    }
    }
  }

let badgeContent 
if(booking.decided){
    if(booking.confirmed){
      badgeContent =  <DoneIcon fontSize="small" />
    } else {
      badgeContent =  <CloseIcon fontSize="small" /> //"rgba(0,0,0,0.05)"
    }
  } else {
    badgeContent = null //<FiberManualRecordIcon fontSize="small" className={classes.dotBadge} /> 
  }

  return (
    <Grid
      item
      className={classes.mainItem}
      style={{
        // boxShadow: expanded ? "4px 3px 5px 0px rgba(0,0,0,0.5)" : "none",
        color: md_size_memo ? "white" : "black",
        width: xs_size_memo ? "100%" : "85%",
        backgroundColor: color, //expanded ? color : "transparent",
        borderBottom: xs_size_memo ? "1px solid white" : "2px solid lightGrey"
      }}
    >
      <Grid
        container
        onClick={handleExpandClick}
        alignItems="center"
        className={classes.mainSolidLine}
      >
        <Grid item xs={xs_size_memo ? 9 : 8}>
          <Typography
            variant="body2"
            align="left"
            className={classes.mainHeader}
          >
            <b>Your</b> request to join{" "}
            <b>{booking.event.name}</b> is {!booking.decided ? "PENDING" : booking.confirmed ? "CONFIRMED" : "DECLINED"}
          </Typography>
          <Grid container >
            <Grid item xs={6}>
              <Typography
                variant="body2"
                align="left"
                className={classes.countdown}
              >
                created <b>{countdown(
                  new Date(booking.createdAt),
                  new Date(),
                  "X",
                  1
                ).toString()}{" "}
                ago</b>
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.partyOnGrid}>
              {booking.event.happeningNow && <PartyOn />}
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={xs_size_memo ? 3 : 2}>
          <Grid container justify="center">
            <Grid item>
              <IconButton aria-label="settings">
                <Badge badgeContent={badgeContent} 
                        className={classes.badge} 
                        color={booking.decided ? "primary" : "secondary"}
                        // style={{ backgroundColor: booking.decided ? "grey" : "red"}}
                        >
                  <img
                    src={booking.event.imagesArr[0].thumbnail}
                    className={classes.mainAvatar}
                  />
                </Badge>
              </IconButton>
            </Grid>

          </Grid>
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
          <Grid container justify="center" className={classes.messageWrap}>
            <Grid item>
              <Grid container className={classes.messageContainer}>
                <BookingMessages booking={booking} />
              </Grid>
            </Grid>
          </Grid>
        <Grid container className={classes.middleBody}>
          <ListTopHalf event={booking.event} transparent={true}/>
        </Grid>
        <EventButtons event={booking.event} />
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
    fontWeight: 400,
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
  partyOnGrid: {
    marginTop: 10
  },
  textField: {},
  textFieldCont: {
    margin: 10
  },
  messageWrap: {
    padding: 10
  },
  messageContainer: {
    backgroundColor: "rgba(0,0,0,0.38)",
    borderRadius: 10
  },
  mainAvatar: {
    height: 80,
    width: 80
  },
  thisLine: {
    height: "1px",
    width: "100%",
    marginTop: "2px",
    backgroundColor: "#707070"
  }
}));

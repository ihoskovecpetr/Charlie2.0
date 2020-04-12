import React, { useState, useRef, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import TextField from "@material-ui/core/TextField";
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

import ConfirmPNG from "../../Images/confirm_pink.png";
import ClosePNG from "../../Images/close_black.png";
import UserAskMessage from "./UserAskMessage";
import EventInfoLines from "./EventInfoLines";
import ListTopHalf from "src/Atoms/Play/ListTopHalf";
import Spinner from "../Spinner";

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


export default function AcceptBookingCard({ event }) {
  const classes = useStyles();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const [expanded, setExpanded] = useState(false);
  const { context, setContext } = useContext(UserContext);
  const [confirmBooking, confirmStates] = useMutation(CONFIRM_BOOKING);
  const [markBookingSeen, seenStates] = useMutation(SEEN_BOOKING);

  const inputDescription = useRef(null);

  useEffect(() => {
    if(context.expanded_id === event._id){
      setExpanded(true)
    }else{
      setExpanded(false)
    }
  }, [context.expanded_id])


  const handleExpandClick = () => {

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
    seenHostHandle()
  };

  const seenHostHandle = () => {
    markBookingSeen({
      variables: {
        booking_id: event._id,
        user: false,
      },
      refetchQueries: () => [
        {
          query: PROFILE_DATA,
          variables: { host_id: context._id }
        }
      ]
    });
  };


  const ConfirmHandle = (decision) => {
    confirmBooking({
      variables: {
        user_id: event.user._id,
        event_id: event.event._id,
        decision: decision,
        response: inputDescription.current.value
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
      if(event.seenHost === false){
        color = "rgba(0,0,0,0.1)"
      }
    }else{
          if(event.seenHost === false){
      color = "white"
    }
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
    badgeContent = <HelpOutlineIcon fontSize="small" className={classes.dotBadge} /> 
  }

  console.log("confirmStates: ", confirmStates)

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
        <Grid item xs={xs_size_memo ? 3 : 2}>
          <Grid container justify="center">
            <Grid item className={classes.itemAvatar}>
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
            updated <b>{countdown(
              new Date(event.updatedAt),
              new Date(),
              "X",
              1
            ).toString()}{" "}
            ago</b>
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
      <Collapse in={context.expanded_id === event._id} timeout="auto" unmountOnExit>
        <Grid container className={classes.middleBody}>
          <ListTopHalf event={event.event} transparent={true}/>
        </Grid>
        <Grid container justify="center" className={classes.messageWrap}>
          <Grid item>
            <Grid container className={classes.messageContainer}>
                <Grid item xs={12}>
                  <UserAskMessage user={event.user} message={event.message} />
                      {event.decided && (
                          <UserAskMessage
                            reverse={true}
                            user={event.event.author}
                            message={event.response}
                          />
                      )}
                </Grid>
                <Grid item xs={12}>
            {!event.decided && (
              <Grid container alignItems="center" className={classes.decideContainer}>
                <Grid item xs={2}>
                  <Grid container justify="center">
                    <Grid item>
                      <IconButton aria-label="settings" 
                                  className={classes.iconBtn} 
                                  onClick={() => {ConfirmHandle(false)}}>
                                    {confirmStates.loading 
                                    ? <Spinner height={20} width={20} /> 
                                    : <Avatar src={ClosePNG} className={classes.btnAvatar} />}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <Grid container justify="center">
                    <Grid item>
                      <TextField
                              id="outlined-basic"
                              label="Response..."
                              variant="outlined"
                              disabled={confirmStates.loading ? true : false}
                              inputRef={inputDescription}
                              className={classes.textField}
                              style={{ width: xs_size_memo ? "100%" : "300px" }}
                            />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid container justify="center">
                    <Grid item>
                      <IconButton aria-label="settings" 
                                  className={classes.iconBtn} 
                                  onClick={() => {ConfirmHandle(true)}}>
                        {confirmStates.loading 
                                    ? <Spinner height={20} width={20} /> 
                                    : <Avatar src={ConfirmPNG} className={classes.btnAvatar} />}
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
    

                </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item style={{margin: 5}}>
            <IconButton aria-label="settings" className={classes.iconBtn} onClick={handleExpandClick}>
              <ExpandLessIcon />
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
  messageWrap: {
    padding: 10
  },
  messageContainer: {
    backgroundColor: "rgba(0,0,0,0.38)",
    borderRadius: 10
  },
  decideContainer: {
    marginBottom: 10
  },
  textField: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  textFieldCont: {
    margin: 10
  },
  btnWrapLeft: {
    // borderRight: "1px solid #707070"
  },
  btn: {
    // height: 50,
    // width: "50%"
  },
  iconBtn: {
    backgroundColor: "rgba(255,255,255,0.4)"
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

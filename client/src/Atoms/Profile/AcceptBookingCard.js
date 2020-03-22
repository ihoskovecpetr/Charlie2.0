import React, {useState, useRef, useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from '@material-ui/core/TextField';

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
  mutation confirmBooking($event_id: ID!, $user_id: ID!, $decision: Boolean, $response: String) {
    confirmBooking(event_id: $event_id, user_id: $user_id, decision: $decision, response: $response) {
      success
    }
  }
`;


export default function AcceptBookingCard({event, PROFILE_DATA}) {
  const classes = useStyles();
  const { xs_size_memo } = useXsSize();
  const [expanded, setExpanded] = useState(false);
  const { context } = useContext(UserContext);
  const [confirmBooking, confirmStates] = useMutation(CONFIRM_BOOKING);

  const inputDescription = useRef(null);

  // console.log("event card props: ", props);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log("AcceptBookingCard: ", event)

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
        },
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
  }

  return (
    <Grid item xs={12} className={classes.mainItem} 
          style={{
              boxShadow: expanded ? "4px 3px 5px 0px rgba(0,0,0,0.5)" : "none",
              backgroundColor: expanded ? "white" : "transparent"}}>
      <Grid container onClick={handleExpandClick} alignItems="center" className={classes.mainSolidLine} >

      <Grid item xs={2}>
        <Grid container justify="center">
            <Grid item alignContent="center">
            <IconButton aria-label="settings">
              <Avatar src={event.user.picture} className={classes.mainAvatar}/>
            </IconButton>
            </Grid>
          </Grid>
           
        </Grid>

        <Grid item xs={8}>
              <Typography variant="body2" align="left" className={classes.mainHeader}>
              <b>{event.user.name}</b> wants to join your event <b>{event.event.name}</b>
              </Typography>
              <Typography variant="body2" align="left" className={classes.countdown}>
              {countdown(new Date(event.createdAt), new Date(), "X", 1).toString()} ago
              </Typography>
        </Grid>


        <Grid item xs={2}>
          <Grid container justify="center">
            <Grid item 
                  alignContent="center"
                  style={{ transition: "transform .1s ease-in-out", transform: expanded ? "rotate(-180deg)" : "rotate(0deg)"}}>
              
              <IconButton aria-label="settings">
                <ExpandMoreIcon fontSize="large" />
            </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>


      <Grid container>
          <Grid item sm={8} 
                    xs={12} 
                    className={classes.leftMiddleItem}
                    style={{ borderRight: xs_size_memo ? "none" : "1px solid grey" }}>
            <UserAskMessage user={event.user} message={event.message} />
            <UserAskMessage user={event.event.author} message={event.response} />
          </Grid>
          <Grid item sm={4} xs={12}>
            <EventInfoLines name={event.event.name} date={event.event.dateStart} />
          </Grid>
        </ Grid>

        <Grid container>
        <Grid item xs={12}>

        {!event.decided &&  <Grid container className={classes.btnContainer}>
        <Grid item xs={12} >
            <Grid container justify="center">
              <Grid item >
              
              <TextField id="outlined-basic" 
                          label="Response..." 
                          variant="outlined" 
                          inputRef={inputDescription} 
                          className={classes.textField} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.btnWrapLeft} >
            <Grid container justify="center">
              <Grid item >
              <IconButton aria-label="settings" >
                <Avatar src={ClosePNG} className={classes.btnAvatar}/>
              </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="center">
              <Grid item>
                <IconButton aria-label="settings" onClick={ConfirmHandle}>
                <Avatar src={ConfirmPNG} className={classes.btnAvatar}/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
     }
          </Grid>
      </Grid>
      </Collapse>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  mainItem: {
    width: "100%",
    borderRadius: 15,
    // margin: 10,
    // padding: 10
  },
  mainSolidLine: {
    marginTop: 10,
    marginBottom: 20,
  },
  leftMiddleItem:{
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
    marginLeft: 20,
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
  textField: {
    width: 300, 
    margin: 10
  },
  btnWrapLeft: {
    borderRight: "1px solid #707070"
  },
  btn: {
    // height: 50,
    // width: "50%"
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
    height: '1px',
    width: '100%',
    marginTop: '2px',
    backgroundColor: "#707070"
  },
}));
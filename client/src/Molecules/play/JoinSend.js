import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import clsx from "clsx";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { Animated } from "react-animated-css";

import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import { GET_ONE_EVENT } from "src/Services/GQL/GET_ONE_EVENT";
import { EVENT_BOOKINGS } from "src/Services/GQL/EVENT_BOOKINGS";
import { PLAY_EVENTS_QUERY } from "src/Services/GQL/PLAY_EVENTS_QUERY";

import Spinner from "../../Atoms/Spinner";


const BOOKING_REQ = gql`
  mutation requestBookEvent(
    $event_id: String!
    $guest_id: String!
    $guest_name: String!
    $message: String!
  ) {
    requestBookEvent(
      event_id: $event_id
      guest_id: $guest_id
      guest_name: $guest_name
      message: $message
    ) {
      _id
      success
      message
    }
  }
`;

export default function JoinSend({event, localContext}) {
    const classes = useStyles();
    let history = useHistory();
    const [checked, setChecked] = useState(false);
    const [sending, setSending] = useState(false);
    // const [refetched, setRefetched] = useState(false);

    const [localState, setLocalState] = useState({
      message: "JOIN",
      pending: false,
      attending: false,
      icon: [<WhatshotIcon fontSize="large" />]
    });
    const [createReqBooking,  { loading, error, data }] = useMutation(BOOKING_REQ);

    const inputDescription = useRef(null);

    console.log("JOIN SEND RERENDER")
    useEffect(() => {

      event && event.bookings && event.bookings.map(item => {
        if( item.user._id === localContext._id) {
            if(item.decided && item.confirmed){
                // attending = true
                // icon = [<DoneIcon fontSize="large" />]
                setLocalState(prev => {
                  {
                    return { 
                      ...prev, 
                      message: "Attending",
                    attending: true,
                    icon: [<DoneIcon fontSize="large" />]
                   };
                  }
                })
            }
        }
    })

    }, [event, event.bookings, localContext._id])

    function openJoin(){
      if(!localState.attending && !localState.pending){
        setChecked(true)
        setTimeout(() => { 
          window.scrollBy({
          top: 200,
          left: 0,
          behavior: 'smooth'
        }); }, 100);
        setTimeout(() => { 
          document.getElementById("bottomAnchor").scrollIntoView();
        }, 400);
      }
    }

    function sendBooking(params) {
      setLocalState(prev => ({ 
            ...prev, 
            message: "Sending",
            attending: true,
            icon: [<HourglassEmptyIcon fontSize="large" />]
      }))
        createReqBooking({
            variables: {
              guest_id: localContext._id,
              guest_name: localContext.name,
              event_id: event._id,
              message: inputDescription.current.value
                        ? inputDescription.current.value
                        : null,
            },
            refetchQueries: () => [
              {
                query: PROFILE_DATA,
                variables: { host_id: localContext._id }
              },
              {
                query: GET_ONE_EVENT,
                variables: { event_id: history.location.pathname.split("/")[2]}
              },
              {
                query: EVENT_BOOKINGS,
                variables: { event_id: event._id }
              },
              {
                query: PLAY_EVENTS_QUERY,
                variables: {
                  plusDays: localContext.filterOn ? localContext.days : 10000,
                  lng: localContext.geolocationObj ? localContext.geolocationObj.lng : null,
                  lat: localContext.geolocationObj ? localContext.geolocationObj.lat : null,
                  radius: localContext.filterOn ? localContext.radius : 9999999,
                  shownEvents: localContext.shownEvents
                }
              }
            ]
          })
          setChecked(false)
    }

    if(event.areYouAuthor) return <p className={classes.textAuthor}> You are author of this event </p>

    return (
        <>
        <Chip 
        label={`${localState.message}`} 
        // icon={attending && <DoneIcon fontSize="large" />}
        icon={localState.icon[0]}
        //variant="outlined" 
        color="secondary" 
        className={classes.chipOne} 
        onClick={openJoin}
        disabled={checked || localState.attending || localState.pending}
        />
        <Grid container
            className={clsx(classes.sendJoinContainer, checked && classes.openSend, )}
            alignItems="center">
            {!loading && !data && (
            <Grid item xs={12} className={clsx(classes.itemSend, checked && classes.displayBlock)}>
            <Animated
              animationIn="fadeIn"
              animationOut="fadeOut"
              animationInDelay={500}
              //animationInDuration={5000}
              isVisible={true}
              infinite={true}
            >
                <InputLabel htmlFor="standard-adornment-amount">
                    YOUR MESSAGE
                </InputLabel>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    defaultValue="Hi, let me please come and pay you money :)"
                    multiline
                    rows="4"
                    color="primary"
                    inputRef={inputDescription}
                    name="decsription"
                    autoComplete="false"
                    className={classes.textField}
                    />
                    <Chip label={`SEND`} 
                        color="secondary" 
                        icon={<SendIcon fontSize="large" />}
                        className={classes.chipSend}
                        onClick={sendBooking}
                        />
                </Animated>
                <div id="bottomAnchor"></div>
            </Grid>
            )}
            {loading && (
              <Grid container justify="center" alignItems='center' className={classes.loadingGridCont}>
                <Grid item>
                  <Spinner height={100} width={100} />
                </Grid>
              </Grid>
            )}
            
            {!loading && data && data.requestBookEvent && (
            <Grid item xs={12} className={clsx(classes.itemSend, checked && classes.displayBlock)}>
                <InputLabel htmlFor="standard-adornment-amount">
                    Finished
                </InputLabel>
                
            </Grid>
            )}
        </Grid>
    </>
    )
}


const useStyles = makeStyles(theme => ({
   
    sendJoinContainer: {
      backgroundColor: "white",
      height: 0,
      overflow: 'hidden',
      transition: 'height 0.6s',
      transitionTimingFunction: 'ease-out',
    },
    openSend: {
      display: "block",
      height: 248,
      padding: 10,
    },
    textAuthor:{
      textAlign: "center"
    },
    itemSend: {
        display: "none",
      },
    displayBlock: {
        display: "block",
      },
    chipOne: {
      width: "90%", 
      fontWeight: 500, 
      fontSize: 25, 
      padding: 20, 
      margin: "5%"
      },
    chipSend: {
      width: "90%", 
      fontWeight: 500, 
      fontSize: 25, 
      padding: 20, 
      margin: "5%" 
    }
  
  }));
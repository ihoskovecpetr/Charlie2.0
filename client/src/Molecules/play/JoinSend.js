import React, { useState, useContext, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import clsx from "clsx";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { Animated } from "react-animated-css";

import { UserContext } from "../../userContext";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import {GET_ONE_EVENT} from "src/Services/GQL/GQL_GET_ONE_EVENT";

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

export default function JoinSend({event, getPlayEventsMutation}) {
    const classes = useStyles();
    let history = useHistory();
    const { context, setContext } = useContext(UserContext);
    const [checked, setChecked] = useState(false);
    const [refetched, setRefetched] = useState(false);

    const [localState, setLocalState] = useState({
      message: "JOIN",
      pending: false,
      attending: false,
      icon: [<WhatshotIcon fontSize="large" />]
    });
    const [createReqBooking,  { loading, error, data }] = useMutation(BOOKING_REQ);

    const inputDescription = useRef(null);

    console.log("JoinSend event: ", event)

    useEffect(() => {

      event && event.bookings && event.bookings.map(item => {
        console.log("Iterace", item)
        if( item.user._id === context._id) {
            if(item.confirmed){
              console.log("change sts Attending")
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
            } else{
              console.log("change sts Pending")
                // pending = true
                // icon = [<HourglassEmptyIcon fontSize="large" />]
                // setMessage("Pending")
                setLocalState(prev => {
                  {
                    return { 
                      ...prev, 
                      message: "Pending",
                      pending: true,
                    icon: [<HourglassEmptyIcon fontSize="large" />]
                   };
                  }
                })
            }
        }
    })

    console.log("USEEEFFF JOINSEND RES: ", localState.pending, localState.attending, localState.message)

    }, [event, event.bookings, context._id])

    function openJoin(){
      if(!localState.attending && !localState.pending){
        setChecked(true)
        setTimeout(() => { window.scrollBy({
          top: 200,
          left: 0,
          behavior: 'smooth'
        }); }, 400);

      }
    }

    function sendBooking(params) {
        createReqBooking({
            variables: {
              guest_id: context._id,
              guest_name: context.name,
              event_id: event._id,
              message: inputDescription.current.value
                        ? inputDescription.current.value
                        : null,
            },
            refetchQueries: () => [
              {
                query: PROFILE_DATA,
                variables: { host_id: context._id }
              },
              {
                query: GET_ONE_EVENT,
                variables: { id: history.location.pathname.split("/")[2] }
              },
            ]
          })
    }
    // Just for PLAY Page
    if(data && data.requestBookEvent.success && !refetched && getPlayEventsMutation){
      setRefetched(true)
      setChecked(false)
      setTimeout(() => {getPlayEventsMutation({variables:{
            plusDays: context.days,
            lng: context.geolocationObj ? context.geolocationObj.lng : null,
            lat: context.geolocationObj ? context.geolocationObj.lat : null,
            radius: context.radius, // playFilter.radius,
            shownEvents: context.shownEvents
      }})      }

      , 1000)
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
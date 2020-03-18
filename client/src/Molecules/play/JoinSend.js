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
import { Animated } from "react-animated-css";

import { UserContext } from "../../userContext";
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
    const [checked, setChecked] = useState(false);
    const [refetched, setRefetched] = useState(false);
    const { context, setContext } = useContext(UserContext);
    const [createReqBooking,  { loading, error, data }] = useMutation(BOOKING_REQ);

    const inputDescription = useRef(null);


    let pending = false
    let attending = false
    let message = "JOIN"
    let icon = [<WhatshotIcon fontSize="large" />]

    event && event.bookings && event.bookings.map(item => {
        if( item.user._id === context._id) {
            if(item.confirmed){
                attending = true
                message = "Attending"
                icon = [<DoneIcon fontSize="large" />]
            } else{
                pending = true
                message = "Pending"
                icon = [<HourglassEmptyIcon fontSize="large" />]
            }
        }
    })

    console.log("loading, error, data: ", loading, error, data );

    function openJoin(){
      if(!attending && !pending){
        setChecked(true)
        window.scrollBy({
          top: 200,
          left: 0,
          behavior: 'smooth'
        });
      }
    }

    function sendBooking(params) {
      console.log("Creating booking: ", context._id, context.name, event._id, inputDescription.current.value )
        createReqBooking({
            variables: {
              guest_id: context._id,
              guest_name: context.name,
              event_id: event._id,
              message: inputDescription.current.value
                        ? inputDescription.current.value
                        : null,
            },
            // refetchQueries: () => [
            //   {
            //     query: props.ONE_EVENT,
            //     variables: { id: props.match.params.id }
            //   }
            // ]
          })
    }

    if(data && data.requestBookEvent.success && !refetched){
      setRefetched(true)
      setChecked(false)
      console.log("Refetching EVT")
      setTimeout(() => {getPlayEventsMutation({variables:{
            plusDays: context.days,
            lng: context.geolocationObj ? context.geolocationObj.lng : null,
            lat: context.geolocationObj ? context.geolocationObj.lat : null,
            radius: context.radius, // playFilter.radius,
            shownEvents: context.shownEvents
      }})      }

      , 1000)
    }


    return (
        <>
        <Chip 
        label={`${message}`} 
        // icon={attending && <DoneIcon fontSize="large" />}
        icon={icon[0]}
        //variant="outlined" 
        color="secondary" 
        style={{width: "90%", fontWeight: 500, fontSize: 25, padding: 20, margin: "5%"}} 
        onClick={openJoin}
        disabled={checked || attending || pending}
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
                    // id="decsription"
                    defaultValue="Hi, let me please come and pay you money :)"
                    multiline
                    rows="4"
                    color="primary"
                    inputRef={inputDescription}
                    //label="Description"
                    name="decsription"
                    autoComplete="false" //improvisation, should be "off", or random "string"
                    className={classes.textField}
                    />
                    <Chip label={`SEND`} 
                        //variant="outlined" 
                        color="secondary" 
                        icon={<SendIcon fontSize="large" />}
                        style={{width: "90%", fontWeight: 500, fontSize: 25, padding: 20, margin: "5%"}} 
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
    itemSend: {
        display: "none",
      },
    displayBlock: {
        display: "block",
      }
  
  }));
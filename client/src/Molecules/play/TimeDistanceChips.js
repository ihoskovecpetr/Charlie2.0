import React, { useState, useContext, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AvTimerIcon from '@material-ui/icons/AvTimer';
import ExploreIcon from '@material-ui/icons/Explore';

import clsx from "clsx";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import dateFormat from "dateformat";
import countdown from "countdown";

import { UserContext } from "../../userContext";
import { useCountDistance } from "../../Hooks/useCountDistance";

import Spinner from "../../Atoms/Spinner";

export default function TimeDistanceChips({event}) {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const { context, setContext } = useContext(UserContext);
    const distance = useCountDistance(event.geometry.coordinates[1], event.geometry.coordinates[0], context.geolocationObj && context.geolocationObj.lat, context.geolocationObj && context.geolocationObj.lng )

    console.log("TimeDistanceMarks: ", event, context)
    console.log("countdownDDD ", countdown(new Date(event.dateStart), new Date(), "X", 2).toString())

    return (
        <Grid item style={{ marginBottom: 5}}>  
            <Chip 
            label={`${Math.floor(distance * 10)/10} Km`} 
            icon={<ExploreIcon />}
            variant="outlined" 
            color="secondary" 
            style={{ fontWeight: 300, fontSize: 16, padding: 10}} 
            disabled={false}
            />
            <Chip 
            label={`${countdown(new Date(event.dateStart), new Date(), "X", 2).toString()}`} 
            icon={<AvTimerIcon style={{ color: '#59F0EA'}} />}
            variant="outlined" 
            style={{ fontWeight: 300, fontSize: 16, padding: 10, borderColor: '#59F0EA', 
            color: '#59F0EA'}} 
            disabled={false}
            />     
        </Grid>
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
  }));
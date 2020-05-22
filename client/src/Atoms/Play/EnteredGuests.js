import React, {useContext, useState, useEffect} from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import CropFreeIcon from '@material-ui/icons/CropFree';
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "src/userContext";

const EnteredGuests = ({bookings}) => {
    const classes = useStyles();
    const history = useHistory();
    const { context, setContext } = useContext(UserContext);

    console.log("ENTr GSTS:", bookings);

    return(
            <Grid item xs={12}>
                   {bookings && bookings.map(booking => {
                     if(booking.entered){
                       console.log("ENTERREEEEEEEEE")
                       return <Avatar
                       alt={booking.user.name}
                       src={booking.user.picture}
                       className={classes.ButtonAvatar}
                       onClick={() => {history.push(`/user/${booking.user._id}`)}}
                     >
                       x
                     </Avatar>
                     }
                   })}
              </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   
  }));

export default EnteredGuests
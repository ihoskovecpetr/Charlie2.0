import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { NavLink, useHistory } from "react-router-dom";

import { UserContext } from "src/userContext";
import ptyBck from "src/Images/ptybck.png";

const useStyles = makeStyles(theme => ({
    blackBox: {
        width: "100%",
        height: 160,
        backgroundColor: "#E8045D",
        color: "white",
        // backgroundImage: `url(${ptyBck})`,
        // backgroundSize: "cover"
    },
    topPart: {
        height: 40,
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    middlePart: {
        width: "100%",
        height: 100,
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    bottomPart: {
        width: "100%",
        height: 60,
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    avatar: {
        height: 80,
        width: 80,
    },
    actBtns: {
        marginRight: 4
    },
    chipOutline: {
        // borderBottom: "1px solid white",
        margin: 5
    },
}));

export default function DrawerProfileBox({handleDrawerToggle}) {
  const classes = useStyles();
  const { context, setContext } = useContext(UserContext);
  let history = useHistory();

  const Out = () => {
    context.deleteToken()
    context.getLoggedInUser()
    handleDrawerToggle()
  };

  const SignIn = () => {
    history.push("/signin")
    handleDrawerToggle()
  };

  return (
        <Grid container className={classes.blackBox}>
            <Grid item xs={12}>
                <Grid container justify='center' alignItems="center" className={classes.middlePart}>
                    <Grid item onClick={handleDrawerToggle}>
                        <NavLink
                            to={`/profile`}
                            >
                            <Avatar className={classes.avatar} src={context.picture}>
                                <AccountCircleIcon  fontSize="large" onClick={SignIn} />
                            </Avatar>
                        </NavLink>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} >
            <Grid container justify='center' alignItems="center" className={classes.bottomPart}>
            {context.name && <>
            <Grid item className={classes.actBtns} onClick={handleDrawerToggle}>
            <Badge badgeContent={context.countUnseenBookings + context.countUnseenRatings} 
                    color="secondary">
                <NavLink to={`/profile`}>
                    {/* <Chip
                    className={classes.chip}
                    // avatar={
                    //   <Avatar
                    //     alt={booking.user.name}
                    //     src={booking.user.picture}
                    //   >
                    //     M
                    //   </Avatar>
                    // }
                    label="Actions"
                    style={{ color: "white"}}
                    /> */}
                        <Typography component="p">
                            ACTIVITY
                        </Typography>
                </NavLink>
            </Badge>
            </Grid>
            <Grid item onClick={Out} >
                <Chip
                    className={classes.chipOutline}
                    // avatar={<Avatar style={{backgroundColor: "#696565"}}><ExitToAppIcon fontSize="small" style={{color: "white"}} /></Avatar>}
                    label="SIGN OUT"
                    // color="secondary"
                    style={{color: "white", borderColor: "white"}}
                    variant="outlined"
                    />
            </Grid>
            </>}
            {!context.name &&             
            <Grid item onClick={SignIn} >
                    <Chip
                        className={classes.chipOutline}
                        
                        label="SIGN IN"
                        // color="secondary"
                        style={{color: "white", borderColor: "white"}}
                        variant="outlined"
                        
                      />
            </Grid>
            }
            </Grid>
            </Grid>

        </Grid>

  );
}

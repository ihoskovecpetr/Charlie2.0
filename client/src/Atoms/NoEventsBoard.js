import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from "@material-ui/core/styles";
import { Animated } from "react-animated-css";

import { useHistory } from "react-router-dom";

function NoEventsBoard(props) {
  let history = useHistory();
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.mainGrid}
      onClick={() => {
        setTimeout(() => {
          history.push(`/`);
        }, 200);
      }}
    >
      <Grid item xs={12} className={classes.loginTransparent}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.loginFirstContainer}
        >
          <Grid item>
            <p>
              NO EVENTS
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.fingerItem}>
        <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
          <Grid item>
            {/* <Animated
              animationIn="bounceInDown"
              animationOut="fadeOut"
              animationInDelay={500}
              //animationInDuration={5000}
              isVisible={true}
              infinite={true}
            > */}
              {/* <Avatar
                className={classes.fingerPng}
                src="https://res.cloudinary.com/party-images-app/image/upload/v1580483234/ol7l7zkkbvcojwzwz4dd.png"
              /> */}
              <FilterListIcon color='secondary' className={classes.arrowIcon} />
            {/* </Animated> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.loginBlack}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.loginContainer}
        >
          <Grid item>
            <Typography variant="h5" className={classes.backToApp}>
              <b>Back to Main Page</b>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  mainGrid: {
    width: 200,
    backgroundColor: '#CECDCD', //theme.palette.charliePink,
    borderRadius: 20,
    color: "black",
    boxShadow: "4px 3px 5px 0px rgba(0,0,0,0.5)"
  },

  loginTransparent: {
    height: 70
  },
  loginFirstContainer: {
    height: "100%",
    fontSize: 22,
    fontWeight: 600,
  },
  fingerItem: {
    height: 80
  },
  backToApp:{
    padding: 10,
    textAlign: "center",
    width: "100%"
  },
  arrowIcon: {
    height: 50,
    width: 50,
    color: 'grey'
  },

  loginBlack: {
    backgroundColor: theme.palette.charliePink,
    color: "white",
    height: "25%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  loginContainer: {
    height: "100%"
  }
}));

export default NoEventsBoard;

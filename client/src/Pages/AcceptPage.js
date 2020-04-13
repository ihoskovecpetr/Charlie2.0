import React, { useState, useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ConfirmPNG from "src/Images/confirm_pink.png";
import ClosePNG from "src/Images/close_black.png";

import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import { UserContext } from "src/userContext";

import { withRouter, useHistory, NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Spinner from "src/Atoms/Spinner";

import gql from "graphql-tag";

const SHOW_BOOKINGS = gql`
  query showBookings($id: ID!) {
    showBookings(id: $id) {
      confirmed
      cancelled
      decided
      entered
      message
      response
      user {
        _id
        name
        email
        picture
      }
      event {
        _id
        name
      }
    }
  }
`;

const MARK_ENTERED = gql`
  mutation markEntered($event_id: ID!, $user_id: ID!) {
    markEntered(event_id: $event_id, user_id: $user_id) {
      success
    }
  }
`;

let dataMock;

function AcceptPage(props) {
  const classes = useStyles();
  const { context, setContext } = useContext(UserContext);

  const [windowHeight, setWindowHeight] = useState(0);

  const { loading, error, data, refetch } = useQuery(SHOW_BOOKINGS, {
    variables: { id: props.match.params.event_id }
    //skip: !id,
    //pollInterval: 500
  });
  const [markEntered, markEnteredStates] = useMutation(MARK_ENTERED);

  const markEnteredHandler = () => {

    markEntered({
      variables: {
        user_id: props.match.params.user_id,
        event_id: props.match.params.event_id
      },
      refetchQueries: () => [
        {
          query: PROFILE_DATA,
          variables: { host_id: context._id }
        }
      ]
    });
  }


  console.log("props.match.params: ", props.match.params);

  if (data && data.showBookings) {
    return (
            <Grid
              container
              justify="center"
            >
              <Container maxWidth="sm" className={classes.mainContainer}>
              {data.showBookings.map(booking => {
                if(booking.user._id === props.match.params.user_id){
                    return <Grid container justify="center" className={classes.mainGrid}>
                            <Grid item>
                              CONFIRM ENTRANCE {booking.dateStart}
                              <IconButton color="primary" aria-label="upload picture" component="span">
                                <Avatar
                                    alt="Remy SharpXX"
                                    src={booking.user.picture}
                                    className={classes.buttonAvatar}
                                  >
                                    x
                                  </Avatar>
                              </IconButton>
                            </Grid>
                              <Grid item xs={12}>
                                <Grid container justify="center">
                                  <Grid item xs={12}>
                                    <Grid container justify="center">
                                      <Grid item>
                                        <IconButton aria-label="settings" 
                                                    className={classes.iconBtn} 
                                                    disabled={false}
                                                    onClick={markEnteredHandler}
                                                    >
                                                      {false 
                                                      ? <Spinner height={20} width={20} /> 
                                                      : <Avatar src={ClosePNG} className={classes.btnAvatar} />}
                                        </IconButton>
                                      </Grid>
                                      <Grid item>
                                        <IconButton aria-label="settings" 
                                                    className={classes.iconBtn} 
                                                    disabled={false}
                                                    onClick={markEnteredHandler}
                                                    >
                                                      {false 
                                                      ? <Spinner height={20} width={20} /> 
                                                      : <Avatar src={ConfirmPNG} className={classes.btnAvatar} />}
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  
                                </Grid>
                              </Grid>
                          </Grid> 
                }

              })}
              </ Container>
            </Grid>
    );
  }else{
    return <p> No DATA yet </p>
  }

}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: 20
  },
  mainGrid: {
    backgroundColor: "rgba(0,0,0,0.2)"
  },

  buttonAvatar: {
    // marginLeft: "10px",
    // marginRight: "10px"
  },

}));

export default withRouter(AcceptPage);

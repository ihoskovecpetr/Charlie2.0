import React, { useState, useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";

import { withRouter, useHistory, NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import { UserContext } from "src/userContext";

import LoginFirstBoard from "src/Atoms/LoginFirstBoard";
import Spinner from "src/Atoms/Spinner";
import UserCardPlay from "src/Molecules/play/UserCardPlay";

import AcceptDecide from "src/Atoms/Accept/AcceptDecide";
import AcceptEntered from "src/Atoms/Accept/AcceptEntered";
import AcceptDeclined from "src/Atoms/Accept/AcceptDeclined";

const ACCEPT_SHOW_BOOKING = gql`
  query acceptShowBooking($user_id: ID!, $event_id: ID!) {
    acceptShowBooking(user_id: $user_id, event_id: $event_id) {
      dataOut {
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
          description
        }
        event {
          _id
          name
        }
      }
      errorOut {
        name
        message
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
  let history = useHistory();
  const { context, setContext } = useContext(UserContext);
  const { loading, error, data, refetch } = useQuery(ACCEPT_SHOW_BOOKING, {
    variables: {event_id: props.match.params.event_id, user_id: props.match.params.user_id},
    //skip: !id,
    //pollInterval: 500
    fetchPolicy: "network-only"
  });
  const [markEntered, markEnteredStates] = useMutation(MARK_ENTERED);
  console.log("Data: ", data);
  const { dataOut } = data ? data.acceptShowBooking : { dataOut: undefined };
  const { errorOut } = data ? data.acceptShowBooking : { errorOut: undefined };

  console.log("dataOut: ", dataOut)
  console.log("errorOut: ", errorOut)

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
        },
        {
          query: ACCEPT_SHOW_BOOKING,
          variables: {event_id: props.match.params.event_id, user_id: props.match.params.user_id}
        }
      ]
    });
  }

  const Out = () => {
    context.deleteToken()
    context.getLoggedInUser()
  };


  console.log("markEnteredStates: ", markEnteredStates);

    return (
            <Grid
              container
              justify="center"
            >
              <Container maxWidth="sm" className={classes.mainContainer}>
                {context._id ? 
              <div className={classes.contentWrap}>
              {loading && "LOADING.."}
              {dataOut && <Grid container justify="center" className={classes.mainGrid}>
                      <Grid item>
                      <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h6" className={classes.mainSign}>
                          {!markEnteredStates.data && !dataOut.entered && "CONFIRM ENTRANCE"}
                          {dataOut.entered && "ENTERED"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} >
                        <UserCardPlay author={dataOut.user} />
                      </Grid>
                              
                      </Grid>
                      </Grid>
                          <Grid item xs={12}>
                            <Grid container justify="center">
                              <Grid item>
                              {loading && "LOADING.."}
                              {!markEnteredStates.data && !dataOut.entered && <AcceptDecide markEnteredStates={markEnteredStates} 
                                                                        markEnteredHandler={markEnteredHandler}/>}
                              {dataOut.entered && <AcceptEntered />}
                              </Grid>
                            </Grid>
                            {dataOut.entered && <Button fullWidth variant="contained" color="secondary" onClick={() => history.push('/')}>MAIN MENU</Button>}
                          </Grid>
                      </Grid> 
              }
              <Grid container justify="center" direction="column" className={classes.mainGrid}>
                              {!dataOut && !errorOut && <Spinner height={50} width={50} />}
              {!dataOut && errorOut && <>
                <Grid item>
                  <Typography variant="h6" className={classes.messagetText}>
                    {errorOut[0].message}
                  </Typography>
                </Grid>
                <Grid item>{errorOut[0].name == "Not Author Error" && <Button color="primary" fullWidth onClick={Out}> SIGN OUT </Button>}</Grid>
                </>
                }
              </Grid>

              </div>
              :
              <Grid justify="center" container>
                <Grid item >
                  <LoginFirstBoard />
                </Grid>
              </Grid>  
              }
              
              </ Container>
            </Grid>
    );

}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 20
  },
  contentWrap: {
    backgroundColor: "rgba(0,0,0,0.15)",
    paddingTop: 10,
    borderRadius: 10,
    padding: 10
  },
  mainGrid: {
  },
  mainSign:{
    margin: 10
  },
  messagetText: {
    textAlign: "center"
  },

}));

export default withRouter(AcceptPage);

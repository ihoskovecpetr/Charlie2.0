import React, { useState, useEffect, useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { UserContext } from "src/Contexts/userContext";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import { useXsSize } from "src/Hooks/useXsSize";

import ConfirmPNG from "src/Images/confirm_pink.png";
import ClosePNG from "src/Images/close_black.png";
import Spinner from "src/Atoms/Spinner";

const CONFIRM_BOOKING = gql`
  mutation confirmBooking(
    $event_id: ID!
    $user_id: ID!
    $decision: Boolean
    $response: String
  ) {
    confirmBooking(
      event_id: $event_id
      user_id: $user_id
      decision: $decision
      response: $response
    ) {
      success
    }
  }
`;

export default function BookingAcceptInput({ booking }) {
  const classes = useStyles();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const { context, setContext } = useContext(UserContext);
  const [confirmBooking, confirmStates] = useMutation(CONFIRM_BOOKING);

  const inputDescription = useRef(null);

  const handleConfirmRequest = (decision) => {
    confirmBooking({
      variables: {
        user_id: booking.user._id,
        event_id: booking.event._id,
        decision: decision,
        response: inputDescription.current.value,
      },
      refetchQueries: () => [
        {
          query: PROFILE_DATA,
          variables: { host_id: context._id },
        },
        // here refetch play data and event data
      ],
    });
  };

  return (
    <>
      {!booking.decided && (
        <Grid container alignItems="center" className={classes.decideContainer}>
          <Grid item xs={2}>
            <Grid container justify="center">
              <Grid item>
                <IconButton
                  aria-label="settings"
                  className={classes.iconBtn}
                  disabled={confirmStates.loading ? true : false}
                  onClick={() => {
                    handleConfirmRequest(false);
                  }}
                >
                  {confirmStates.loading ? (
                    <Spinner height={20} width={20} />
                  ) : (
                    <Avatar src={ClosePNG} className={classes.btnAvatar} />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              label="Response..."
              variant="outlined"
              disabled={confirmStates.loading ? true : false}
              inputRef={inputDescription}
              className={classes.textField}
              style={{ width: true ? "100%" : "300px" }}
            />
          </Grid>
          <Grid item xs={2}>
            <Grid container justify="center">
              <Grid item>
                <IconButton
                  aria-label="settings"
                  className={classes.iconBtn}
                  disabled={confirmStates.loading ? true : false}
                  onClick={() => {
                    handleConfirmRequest(true);
                  }}
                >
                  {confirmStates.loading ? (
                    <Spinner height={20} width={20} />
                  ) : (
                    <Avatar src={ConfirmPNG} className={classes.btnAvatar} />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  decideContainer: {
    marginBottom: 10,
  },
  textField: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  iconBtn: {
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  btnAvatar: {
    height: 20,
    width: 20,
  },
}));

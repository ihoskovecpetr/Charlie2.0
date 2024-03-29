import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

import { GET_ONE_EVENT } from "src/Services/GQL/GET_ONE_EVENT";
import { UserContext } from "src/Contexts/userContext";

import Spinner from "src/Atoms/Spinner";

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

function ModalJoin({ event }) {
  const classes = useStyles();
  const { context } = useContext(UserContext);
  let history = useHistory();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Hi, please let me in");
  const [createReqBooking, bookingReqStates] = useMutation(BOOKING_REQ);

  console.log("ModalJoin: history: ", history);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBooking = () => {
    createReqBooking({
      variables: {
        guest_id: context._id,
        guest_name: context.name,
        event_id: event._id,
        message: message,
      },
      refetchQueries: () => [
        {
          query: GET_ONE_EVENT,
          variables: { event_id: history.location.pathname.split("/")[2] },
        },
      ],
    });
  };

  if (bookingReqStates.data && bookingReqStates.data.requestBookEvent.success) {
    setTimeout(() => {
      setOpen(false);
    }, 500);
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.trueBtn}
        onClick={(e) => {
          e.preventDefault();
          handleOpen();
        }}
      >
        JOIN
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {bookingReqStates.loading && (
              <Grid container justify="center">
                <Grid item>
                  <Spinner height={100} width={100} />
                </Grid>
              </Grid>
            )}
            {bookingReqStates.data &&
              bookingReqStates.data.requestBookEvent.success && (
                <Grid container direction="column" alignItems="center">
                  <Grid item>Finished, success. Redirecting back... </Grid>
                  <Grid item>
                    <Spinner height={30} width={30} />
                  </Grid>
                </Grid>
              )}
            {bookingReqStates.data &&
              !bookingReqStates.data.requestBookEvent.success && (
                <div>Finished, FAIL</div>
              )}
            {!bookingReqStates.loading && !bookingReqStates.data && (
              <Grid
                container
                justify="center"
                direction="column"
                alignItems="center"
                alignContent="center"
                className={classes.mainGrid}
              >
                <Grid item>
                  <h2 id="transition-modal- title">
                    Request Author for admission
                  </h2>
                </Grid>
                <Grid item className={classes.textItem}>
                  <TextField
                    id="outlined-basic"
                    label="Comment"
                    variant="outlined"
                    multiline={true}
                    rows={5}
                    value={message}
                    style={{ minWidth: 250 }}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  >
                    CLOSE
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBooking}
                  >
                    SEND
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "0 !important",
    minWidth: 400,
  },
  mainGrid: {
    width: "100%",
  },
  textItem: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  trueBtn: {
    width: "100%",
    height: 60,
    borderRadius: 0,
  },
}));

export default ModalJoin;

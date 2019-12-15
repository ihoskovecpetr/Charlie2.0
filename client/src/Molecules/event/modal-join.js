import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

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
      success
      message
    }
  }
`;

function ModalJoin(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("Hi, please let me in");
  const [createReqBooking, bookingReqStates] = useMutation(BOOKING_REQ);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={e => {
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
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {bookingReqStates.loading && <Spinner height={100} width={100} />}
            {bookingReqStates.data &&
              bookingReqStates.data.requestBookEvent.success && (
                <div>Finished, success</div>
              )}
            {bookingReqStates.data &&
              !bookingReqStates.data.requestBookEvent.success && (
                <div>Finished, FAIL</div>
              )}
            {!bookingReqStates.loading && !bookingReqStates.data && (
              <>
                <h2 id="transition-modal-title">
                  Request Author for admission
                </h2>

                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label="Please let me in"
                    variant="outlined"
                    multiline={true}
                    rows={5}
                    value={message}
                    onChange={e => {
                      setMessage(e.target.value);
                    }}
                  />
                </form>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    //props.sendBookingRequest(message);
                    createReqBooking({
                      variables: {
                        guest_id: props.user._id,
                        guest_name: props.user.name,
                        event_id: props.event._id,
                        message: message
                      },
                      refetchQueries: () => [
                        {
                          query: props.ONE_EVENT,
                          variables: { id: props.match.params.id }
                        }
                      ]
                    });
                  }}
                >
                  SEND YOUR REQUEST
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    handleClose();
                  }}
                >
                  CLOSE
                </Button>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default withRouter(ModalJoin);

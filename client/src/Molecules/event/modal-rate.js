import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import gql from "graphql-tag";
import StarRatingComponent from "react-star-rating-component";
import { withRouter } from "react-router-dom";

import Spinner from "../../Atoms/Spinner";

const RATE_EVENT = gql`
  mutation rateEvent(
    $event_id: ID!
    $host_id: ID!
    $guest_id: ID!
    $ratingValue: Int!
    $message: String
  ) {
    rateEvent(
      event_id: $event_id
      host_id: $host_id
      guest_id: $guest_id
      ratingValue: $ratingValue
      message: $message
    ) {
      success
      ratingValue
      message
    }
  }
`;

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
  },
  starContainer: {
    fontSize: 30
  }
}));

function ModalRate(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("Hi, please let me in");
  const [stars, setStars] = React.useState(1);

  const [rateEvent, rateEventState] = useMutation(RATE_EVENT);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const onStarClick = (nextValue, prevValue, name) => {
  //   setStars(nextValue);
  // };

  console.log("MODAL RATING: props, stars, open ", props, stars, open);

  if (rateEventState.data && rateEventState.data.rateEvent.success) {
    setTimeout(() => {
      handleClose();
    }, 1000);
  }

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
        RATE EVENT
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
            {rateEventState.loading && <Spinner />}
            {rateEventState.data && rateEventState.data.rateEvent.success && (
              <div>Finished, success</div>
            )}
            {rateEventState.data && !rateEventState.data.rateEvent.success && (
              <div>Finished, FAIL</div>
            )}
            {!rateEventState.loading && !rateEventState.data && (
              <>
                <h2 id="transition-modal-title">Rate host of this event</h2>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  direction="column"
                >
                  <Grid item>
                    <StarRatingComponent
                      name={
                        String
                      } /* name of the radio input, it is required */
                      className={classes.starContainer}
                      value={
                        stars
                      } /* number of selected icon (`0` - none, `1` - first) */
                      starCount={5} /* number of icons in rating, default `5` */
                      starColor={
                        "#E8045D"
                      } /* color of selected icons, default `#ffb400` */
                      emptyStarColor={
                        "#999"
                      } /* color of non-selected icons, default `#333` */
                      editing={
                        true
                      } /* is component available for editing, default `true` */
                      onStarClick={(nextValue, prevValue, name) => {
                        setStars(nextValue);
                        console.log("SATRT SET: ", stars);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-basic"
                        label="You rock!"
                        variant="outlined"
                        multiline={true}
                        rows={4}
                        value={message}
                        onChange={e => {
                          setMessage(e.target.value);
                        }}
                      />
                    </form>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    console.log(
                      "GRAPH send: ",
                      props.event._id,
                      props.event.author._id,
                      props.user._id,
                      stars,
                      message
                    );
                    rateEvent({
                      variables: {
                        event_id: props.event._id,
                        host_id: props.event.author._id,
                        guest_id: props.user._id,
                        ratingValue: stars,
                        message: message
                      },
                      refetchQueries: () => [
                        {
                          query: props.EVENT_RATINGS,
                          variables: { event_id: props.match.params.id }
                        }
                      ]
                    });
                  }}
                >
                  SEND RATING
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
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

export default withRouter(ModalRate);

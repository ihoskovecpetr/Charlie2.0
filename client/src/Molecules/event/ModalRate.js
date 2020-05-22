import React, {useState, useContext} from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import GradeIcon from '@material-ui/icons/Grade';
import Chip from '@material-ui/core/Chip';
import StarRatingComponent from "react-star-rating-component";

import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

import { EVENT_RATINGS } from "src/Services/GQL/EVENT_RATINGS";
import { UserContext } from "src/userContext";

import Spinner from "src/Atoms/Spinner";

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

const MY_RATINGS_OF_EVENT = gql`
  query showMyRatingOfEvent(
    $event_id: ID!
    $guest_id: ID!
  ) {
    showMyRatingOfEvent(
      event_id: $event_id
      guest_id: $guest_id
    ) {
      success
      ratingValue
      message
    }
  }
`;

function ModalRate({event, match}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("You rock!");
  const [stars, setStars] = useState(3);
  const { context } = useContext(UserContext);

  const [rateEvent, rateEventState] = useMutation(RATE_EVENT);
  const { loading, error, data, refetch } = useQuery(MY_RATINGS_OF_EVENT, {
    variables: { event_id: event._id,
                  guest_id: context._id}
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const onStarClick = (nextValue, prevValue, name) => {
  //   setStars(nextValue);
  // };

  const handleRateEvent = () => {
    rateEvent({
      variables: {
        event_id: event._id,
        host_id: event.author._id,
        guest_id: context._id,
        ratingValue: stars,
        message: message
      },
      refetchQueries: () => [
        {
          query: EVENT_RATINGS,
          variables: { event_id: match.params.id }
        },
        {
          query: MY_RATINGS_OF_EVENT,
          variables: {  event_id: event.id,
                        guest_id: context._id}
        }
      ]
    });
  }


  if (rateEventState.data && rateEventState.data.rateEvent.success) {
    setTimeout(() => {
      handleClose();
    }, 1000);
  }

  return (
    <Grid xs={12}>
      {data && data.showMyRatingOfEvent.length === 0 && <Chip 
        label={`RATE this event`} 
        icon={<GradeIcon />}
        color="secondary" 
        className={classes.chipOne} 
        onClick={handleOpen}
          />}
      {data && data.showMyRatingOfEvent.length != 0 && <Chip 
        label={`You already rated this event`} 
        icon={<GradeIcon />}
        color="primary" 
        disabled={true}
        className={classes.chipOne} 
        onClick={handleOpen}
          />}
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
            {rateEventState.loading && <Spinner height={100} width={100} />}
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
                        label="Comment"
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
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
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
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={e => {
                          e.preventDefault();
                          handleRateEvent()
                        }}
                        >
                          SEND RATING
                        </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </Grid>
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
  },
  starContainer: {
    fontSize: 30
  },
  trueBtn: {
    width: "100%",
    height: 60,
    borderRadius: 0
  },
  chipOne: {
    width: "90%", 
    fontWeight: 500, 
    fontSize: 25, 
    padding: 20, 
    margin: "5%"
  },
}));

export default withRouter(ModalRate);

import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Rating from "@material-ui/lab/Rating";

import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import countdown from "countdown";
import { useMutation } from "@apollo/react-hooks";

import { useXsSize } from "../../Hooks/useXsSize";
import { UserContext } from "src/Contexts/userContext";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import { SEEN_RATING } from "src/Services/GQL/SEEN_RATING";

import EventInfoLines from "./EventInfoLines";
import ListTopHalf from "src/Atoms/Play/ListTopHalf";

export default function ReceivedRatingsCard({ rating }) {
  const classes = useStyles();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const { context } = useContext(UserContext);

  const [expanded, setExpanded] = useState(false);

  const [markRatingSeen, seenStates] = useMutation(SEEN_RATING);

  // console.log("event card props: ", props);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (rating.seenHost === false) {
      seenHostHandle();
    }
  };

  const seenHostHandle = () => {
    markRatingSeen({
      variables: {
        rating_id: rating._id,
      },
      optimisticResponse: {
        __typename: "Query",
        updateComment: {
          id: rating._id,
          __typename: "Rating",
          seenHost: true,
        },
      },
      refetchQueries: () => [
        {
          query: PROFILE_DATA,
          variables: { host_id: context._id },
        },
      ],
    });
  };

  let color = "transparent";
  if (expanded) {
    if (md_size_memo) {
      color = "rgba(0,0,0,0.1)";
    } else {
      color = "white"; //"rgba(0,0,0,0.05)"
    }
  } else {
    if (md_size_memo) {
      if (rating.seenHost === false) {
        color = "rgba(0,0,0,0.1)";
      }
    } else {
      if (rating.seenHost === false) {
        color = "white";
      }
    }
  }

  let badgeContent;

  return (
    <Grid
      container
      justify="center"
      alignItems="flex-start"
      className={classes.naimContainer}
    >
      <Grid
        item
        className={classes.mainItem}
        style={{
          // boxShadow: expanded ? "4px 3px 5px 0px rgba(0,0,0,0.5)" : "none",
          color: md_size_memo ? "white" : "black",
          width: xs_size_memo ? "100%" : "85%",
          backgroundColor: color, //expanded ? color : "transparent",
          borderBottom: xs_size_memo
            ? "1px solid white"
            : "2px solid lightGrey",
        }}
      >
        <Grid
          container
          onClick={handleExpandClick}
          alignItems="center"
          className={classes.mainSolidLine}
        >
          <Grid item xs={xs_size_memo ? 3 : 2}>
            <Grid container justify="center">
              <Grid item className={classes.itemAvatar}>
                <IconButton aria-label="settings">
                  <Avatar
                    alt={rating.guest.name}
                    src={rating.guest.picture ? rating.guest.picture : null}
                    className={classes.mainAvatar}
                  >
                    X
                  </Avatar>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={xs_size_memo ? 9 : 8}>
            <Typography
              variant="body2"
              align="left"
              className={classes.mainHeader}
            >
              <b>{rating.guest.name}</b> rated you. Event{" "}
              <b>{rating.event.name}</b>
            </Typography>
            <Typography variant="body2" align="left"></Typography>
            <Typography
              variant="body2"
              align="left"
              className={classes.countdown}
            >
              {!expanded ? (
                <Rating
                  name="simple-controlled"
                  readOnly
                  value={rating.ratingValue}
                  className={classes.ratingSmall}
                />
              ) : null}
              rated{" "}
              <b>
                {countdown(
                  new Date(rating.createdAt),
                  new Date(),
                  "X",
                  1
                ).toString()}{" "}
                ago
              </b>
            </Typography>
          </Grid>

          {!xs_size_memo && (
            <Grid item xs={2}>
              <Grid container justify="center">
                <Grid
                  item
                  style={{
                    transition: "transform .1s ease-in-out",
                    transform: expanded ? "rotate(-180deg)" : "rotate(0deg)",
                  }}
                >
                  <IconButton aria-label="settings">
                    <ExpandMoreIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Grid
            container
            alignItems="center"
            direction="row"
            spacing={2}
            className={classes.middleBody}
          >
            {/* <EventInfoLines
                event={rating.event}
                name={rating.event.name}
                date={rating.event.dateStart}
              />           */}

            <Grid
              container
              alignItems="center"
              direction="column"
              className={classes.starsBody}
            >
              <Grid item className={classes.body}>
                <Rating
                  name="simple-controlled"
                  readOnly
                  value={rating.ratingValue}
                />
              </Grid>
              <Grid item className={classes.body}>
                <Typography
                  variant="body2"
                  align="left"
                  className={classes.mainHeader}
                >
                  <b>{rating.message}</b>
                </Typography>
              </Grid>
            </Grid>

            <Grid container className={classes.middleBody}>
              <ListTopHalf
                event={rating.event}
                transparent={true}
                context={context}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  naimContainer: {
    color: "black",
    width: "100%",
  },
  mainItem: {
    // borderRadius: 15,
    // borderBottom: "3px solid white" //#707070
    // margin: 10,
    // padding: 10
  },
  mainSolidLine: {
    marginTop: 10,
    marginBottom: 20,
  },
  leftMiddleItem: {},
  middleBody: {
    paddingBottom: 10,
    width: "100%",
  },
  ratingSmall: {
    marginRight: 20,
    marginTop: 10,
    fontSize: 14,
  },
  starsBody: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  mainHeader: {
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
  },
  countdown: {
    marginTop: 10,
    fontWeight: 400,
    color: "grey",
    marginLeft: 20,
  },
  badge: {
    padding: "0 important",
  },
  dotBadge: {
    height: 15,
    width: 15,
  },
  userAvatar: {
    backgroundColor: red[500],
    height: 80,
    width: 80,
  },
  btnContainer: {
    marginBottom: 5,
    marginTop: 10,
  },
  textField: {},
  textFieldCont: {
    margin: 10,
  },
  btnWrapLeft: {
    borderRight: "1px solid #707070",
  },
  btn: {
    // height: 50,
    // width: "50%"
  },
  itemAvatar: {},
  mainAvatar: {
    height: 60,
    width: 60,
    backgroundColor: "grey",
    color: "white",
  },
}));

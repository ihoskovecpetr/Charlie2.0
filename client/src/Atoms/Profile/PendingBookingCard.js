import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import DoneIcon from "@material-ui/icons/Done";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import Badge from "@material-ui/core/Badge";

import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import countdown from "countdown";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { useXsSize } from "../../Hooks/useXsSize";
import { UserContext } from "../../userContext";
import { SHOW_HOST_NEWS } from "src/Services/GQL/SHOW_HOST_NEWS";
import { SEEN_BOOKING } from "src/Services/GQL/SEEN_BOOKING";

import PartyOn from "src/Atoms/PartyOn";
import BookingMessages from "src/Atoms/BookingMessages";
import ListTopHalf from "src/Atoms/Play/ListTopHalf";
import EventButtons from "src/Molecules/event/EventButtons";
import { GET_ONE_EVENT } from "src/Services/GQL/GET_ONE_EVENT";

export default function PendingBokingCard({ booking }) {
  const classes = useStyles();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const { context, setContext } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState("pending");
  const [markBookingSeen, seenStates] = useMutation(SEEN_BOOKING);
  // const { loading, error, data } = useQuery(GET_ONE_EVENT, {
  //   variables: { event_id: booking.event._id },
  // });

  console.log(
    "Rerender PendingBokingCard: getting EVENT ",
    { ...booking.event, bookings: [booking] }
    // loading,
    // error,
    // data
  );

  useEffect(() => {
    if (booking.decided) {
      if (booking.confirmed) {
        setStatus("confirmed");
      } else {
        setStatus("declined");
      }
    }
  }, [booking.decided, booking.confirmed]);

  const handleExpandClick = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
    if (!booking.seenUser) {
      seenUserHandle();
    }
  };

  const seenUserHandle = () => {
    markBookingSeen({
      variables: {
        booking_id: booking._id,
        user: true,
      },
      optimisticResponse: {
        __typename: "Query",
        updateComment: {
          id: booking._id,
          __typename: "Booking",
          seenUser: true,
        },
      },
      refetchQueries: () => [
        {
          query: SHOW_HOST_NEWS,
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
      if (booking.seenUser === false) {
        color = "rgba(0,0,0,0.1)";
      }
    } else {
      if (booking.seenUser === false) {
        color = "white";
      }
    }
  }

  let badgeContent;
  if (booking.decided) {
    if (booking.confirmed) {
      badgeContent = <DoneIcon fontSize="small" />;
    } else {
      badgeContent = <NotInterestedIcon fontSize="small" />; //"rgba(0,0,0,0.05)"
    }
  } else {
    badgeContent = <HelpOutlineIcon fontSize="small" />; // null;
  }

  return (
    <Grid
      item
      className={classes.mainItem}
      style={{
        color: md_size_memo ? "white" : "black",
        width: xs_size_memo ? "100%" : "85%",
        backgroundColor: color, //expanded ? color : "transparent",
        borderBottom: xs_size_memo ? "1px solid white" : "2px solid lightGrey",
      }}
    >
      <Grid
        container
        onClick={handleExpandClick}
        alignItems="center"
        className={classes.mainSolidLine}
      >
        <Grid item xs={12} className={classes.happeningNowLine}>
          {booking.event.happeningNow && <PartyOn />}
        </Grid>
        <Grid item xs={xs_size_memo ? 9 : 8}>
          <Typography
            variant="body2"
            align="left"
            className={classes.mainHeader}
          >
            <b>Your</b> request to join <b>{booking.event.name}</b> is{" "}
            {!booking.decided ? (
              <span className={classes.pendingText}>PENDING</span>
            ) : booking.confirmed ? (
              <span className={classes.confirmedText}>CONFIRMED</span>
            ) : (
              <span className={classes.declinedText}>DECLINED</span>
            )}
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                align="left"
                className={classes.countdown}
              >
                created{" "}
                <b>
                  {countdown(
                    new Date(booking.createdAt),
                    new Date(),
                    "X",
                    1
                  ).toString()}{" "}
                  ago
                </b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={xs_size_memo ? 3 : 2}>
          <Grid container justify="center">
            <Grid item>
              <Badge
                badgeContent={badgeContent}
                className={classes.badge}
                color={booking.decided ? "primary" : "secondary"}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                classes={{
                  colorPrimary: booking.confirmed
                    ? classes.greenBack
                    : classes.greyBack,
                }}
                // style={{ backgroundColor: booking.decided ? "grey" : "red"}}
              >
                <img
                  src={booking.event.imagesArr[0].thumbnail}
                  className={classes.mainAvatar}
                />
              </Badge>
            </Grid>
          </Grid>
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
        <Grid container justify="center" className={classes.messageWrap}>
          <Grid item>
            <Grid container>
              <BookingMessages booking={booking} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.middleBody}>
          <ListTopHalf
            event={booking.event}
            transparent={true}
            context={context}
            activeLinkEvent={true}
          />
        </Grid>
        {/* {loading && <Typography> Loading...</Typography>} */}
        <EventButtons event={{ ...booking.event, bookings: [booking] }} />
        <Grid container justify="center">
          <Grid item style={{ margin: 5 }}>
            <IconButton
              aria-label="settings"
              className={classes.iconBtn}
              onClick={handleExpandClick}
            >
              <ExpandLessIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
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
  middleBody: {},
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
  userAvatar: {
    backgroundColor: red[500],
    height: 80,
    width: 80,
  },
  partyOnGrid: {
    marginTop: 10,
  },
  textField: {},
  textFieldCont: {
    margin: 10,
  },
  messageWrap: {
    padding: 10,
  },
  mainAvatar: {
    height: 80,
    width: 80,
  },
  thisLine: {
    height: "1px",
    width: "100%",
    marginTop: "2px",
    backgroundColor: "#707070",
  },
  pendingText: {
    color: "red",
    fontWeight: 800,
  },
  confirmedText: {
    color: "green",
    fontWeight: 700,
  },
  declinedText: {
    color: "grey",
    fontWeight: 700,
    textDecoration: "line-through",
  },
  greenBack: {
    backgroundColor: "green",
  },
  greyBack: {
    backgroundColor: "grey",
  },
}));

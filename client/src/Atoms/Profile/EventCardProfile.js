import React, { useState, useRef, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Badge from "@material-ui/core/Badge";

import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";

import { useXsSize } from "../../Hooks/useXsSize";
import { useCountdown } from "src/Hooks/useCountdown";
import { UserContext } from "src/Contexts/userContext";

import PlayListWrap from "./PlayListWrap";
import PlayPageGallery from "../../Molecules/play/PlayPageGallery";
import PlayPageMap from "../../Molecules/play/PlayPageMap";
import PartyOn from "src/Atoms/PartyOn";
import EventButtons from "src/Molecules/event/EventButtons";

export default function EventCardProfile({ event }) {
  const classes = useStyles();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const { counteddownDate } = useCountdown(event.dateStart, 1);
  const [expanded, setExpanded] = useState(false);

  let bgColor = "transparent";
  if (event.happeningNow) {
    bgColor = "transparent";
  } else if (expanded) {
    if (md_size_memo) {
      bgColor = "rgba(0,0,0,0.1)";
    } else {
      bgColor = "transparent"; //"rgba(0,0,0,0.05)"
    }
  }

  let badgeContent;
  if (event.decided) {
    if (event.confirmed) {
      badgeContent = <DoneIcon fontSize="small" />;
    } else {
      badgeContent = <CloseIcon fontSize="small" />; //"rgba(0,0,0,0.05)"
    }
  } else {
    badgeContent = (
      <FiberManualRecordIcon fontSize="small" className={classes.dotBadge} />
    );
  }
  badgeContent = <Avatar src={event.author.picture} />;

  return (
    <Grid
      item
      style={{
        // boxShadow: expanded ? "4px 3px 5px 0px rgba(0,0,0,0.5)" : "none",
        color: md_size_memo ? "white" : "black",
        width: xs_size_memo ? "100%" : "86%",
        // width: "100%",
        backgroundColor: bgColor, //expanded ? bgColor : "transparent",
        borderBottom: xs_size_memo ? "1px solid white" : "2px solid lightGrey",
      }}
    >
      <Grid
        container
        onClick={() => {
          setExpanded(!expanded);
        }}
        alignItems="center"
        className={classes.mainSolidLine}
      >
        <Grid item xs={12} className={classes.happeningNowLine}>
          {event.happeningNow && <PartyOn />}
        </Grid>
        <Grid item xs={xs_size_memo ? 4 : 3}>
          <Grid container justify="center">
            <Grid item className={classes.itemAvatar}>
              <IconButton aria-label="settings">
                <Badge
                  badgeContent={badgeContent}
                  className={classes.badge}
                  //color={event ? "primary" : "secondary"}
                  // style={{ backgroundColor: event.decided ? "grey" : "red"}}
                >
                  <img
                    src={event.imagesArr[0].thumbnail}
                    className={classes.mainAvatar}
                  />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={xs_size_memo ? 8 : 7}>
          <Typography
            variant="body2"
            align="left"
            className={classes.mainHeader}
          >
            <b>{event.name}</b> hosted by <b>{event.author.name}</b>
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                align="left"
                className={classes.countdown}
              >
                Start <b>{counteddownDate}</b>
              </Typography>
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
        <PlayPageGallery event={event} />
        <PlayListWrap event={event} />
        <EventButtons event={event} />
        <PlayPageMap event={event} paddingSides={"0px"} />
        <Grid container justify="center">
          <Grid item>
            <IconButton
              aria-label="settings"
              style={{ backgroundColor: "lightGrey", margin: 5 }}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <ExpandLessIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  mainSolidLine: {
    // marginTop: 10,
    marginBottom: 20,
  },
  happeningNowLine: {
    marginBottom: 5,
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
  // partyOnGrid: {
  //   marginTop: 10
  // },
  badge: {
    padding: "0 important",
  },
  dotBadge: {
    height: 15,
    width: 15,
  },
  userAvatar: {
    backgroundColor: "red",
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
    height: 90,
    width: 90,
  },
  btnAvatar: {
    height: 20,
    width: 20,
  },
  thisLine: {
    height: "1px",
    width: "100%",
    marginTop: "2px",
    backgroundColor: "#707070",
  },
}));

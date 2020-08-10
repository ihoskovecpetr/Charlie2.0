import React, { useState, useRef, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import { withRouter, useHistory, NavLink } from "react-router-dom";

import { useXsSize } from "src/Hooks/useXsSize";
import { useCountdown } from "src/Hooks/useCountdown";
import { UserContext } from "src/Contexts/userContext";
import { useHighlitedSearchString } from "src/Hooks/useHighlitedSearchString";

import PartyOn from "src/Atoms/PartyOn";

export default function EventCardProfile({ event, searchText }) {
  const classes = useStyles();
  let history = useHistory();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const { counteddownDate } = useCountdown(event.dateStart, 1);
  const [expanded, setExpanded] = useState(false);
  const { context, setContext } = useContext(UserContext);

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

  return (
    <Grid
      item
      className={classes.mainItem}
      onClick={() => history.push(`/event/${event._id}`)}
      style={{ backgroundColor: bgColor }}
    >
      <Grid container alignItems="center" className={classes.mainSolidLine}>
        <Grid item xs={xs_size_memo ? 4 : 3}>
          <Grid container justify="center">
            <Grid item className={classes.itemAvatar}>
              <IconButton aria-label="settings">
                <Badge
                  badgeContent={<Avatar src={event.author.picture} />}
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
            <b>
              {useHighlitedSearchString({
                string: event.name,
                searchText: searchText,
              }).map((item) => item)}
            </b>{" "}
            hosted by <b>{event.author.name}</b>
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                align="left"
                className={classes.countdown}
              >
                {useHighlitedSearchString({
                  string: event.address,
                  searchText: searchText,
                }).map((item) => item)}
                , Start <b>{counteddownDate}</b>
              </Typography>
              <Typography
                variant="body2"
                align="left"
                className={classes.descriptionText}
              >
                {useHighlitedSearchString({
                  string: event.description,
                  searchText: searchText,
                }).map((item) => item)}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.partyOnGrid}>
              {event.happeningNow && <PartyOn />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  mainItem: {
    width: "100%",
    borderBottom: "1px solid lightGrey",
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
    // textDecoration: "underline"
  },
  countdown: {
    marginTop: 10,
    fontWeight: 400,
    color: "grey",
    marginLeft: 20,
  },
  descriptionText: {
    marginTop: 10,
    marginLeft: 20,
  },
  partyOnGrid: {
    marginTop: 10,
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

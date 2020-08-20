import React, { useState, useRef, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import { useHistory } from "react-router-dom";

import { useXsSize } from "src/Hooks/useXsSize";
import { useHighlitedSearchString } from "src/Hooks/useHighlitedSearchString";
import { UserContext } from "src/Contexts/userContext";
import AverageRatingStars from "src/Atoms/AverageRatingStars";

export default function UserResult({ user, searchText }) {
  const classes = useStyles();
  let history = useHistory();
  const { xs_size_memo, md_size_memo } = useXsSize();
  const [expanded, setExpanded] = useState(false);
  const { context, setContext } = useContext(UserContext);

  let bgColor = "transparent";
  if (expanded) {
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
      onClick={() => history.push(`/?user=${user._id}`)}
      style={{ backgroundColor: bgColor }}
    >
      <Grid container alignItems="center" className={classes.mainSolidLine}>
        <Grid item xs={4}>
          <Grid container justify="center">
            <Grid item className={classes.itemAvatar}>
              <Avatar className={classes.avatarUser} src={user.picture} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={8}>
          <Typography
            variant="body2"
            align="left"
            className={classes.mainHeader}
          >
            <b>
              {useHighlitedSearchString({
                string: user.name,
                searchText: searchText,
              }).map(item => item)}
            </b>
          </Typography>
          <AverageRatingStars userId={user._id} />
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                align="left"
                className={classes.countdown}
              >
                {useHighlitedSearchString({
                  string: user.description,
                  searchText: searchText,
                }).map(item => item)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  mainItem: {
    width: "100%",
    borderBottom: "1px solid lightGrey",
  },
  mainSolidLine: {
    marginTop: 10,
    marginBottom: 20,
  },
  mainHeader: {
    fontSize: 16,
  },
  avatarUser: {
    backgroundColor: red[500],
    height: 80,
    width: 80,
    border: "1px solid white",
  },
  btnContainer: {
    marginBottom: 5,
    marginTop: 10,
  },
  highlited: {
    backgroundColor: "yellow",
  },
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

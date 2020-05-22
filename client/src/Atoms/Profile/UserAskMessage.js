import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withRouter, useHistory } from "react-router-dom";
import {useSpring, animated} from 'react-spring'

export default function UserAskMessage({ user, message, reverse }) {
  const classes = useStyles();
  let history = useHistory(); 
  const [value, setValue] = React.useState(2);
  const swingIn = useSpring({transform: "translateX(0px)", opacity: 1, from: {opacity: 0, transform: "translateX(-100px)"}})

  return (
    <animated.div style={swingIn}>
    <Grid container 
          direction={reverse ? "row-reverse" : "row"} 
          className={classes.containerMain}>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={user.picture}
                  onClick={() => {history.push(`/user/${user._id}`)}}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                <Typography variant="subtitle2" className={classes.text}>
                  {user.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid container>
          {/* <Grid item >
          <SubHeader />
        </Grid> */}

          <Grid item xs={12}>
            <Typography variant="subtitle2" className={classes.text}>
              {message}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </animated.div>
  );
}

const useStyles = makeStyles(theme => ({
  containerMain: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  avatar: {
    backgroundColor: "red",
    color: "lightgrey",
    width: 40,
    height: 40
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: 600,
  }
}));

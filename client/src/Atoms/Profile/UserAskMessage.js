import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Rating from "@material-ui/lab/Rating";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { NavLink } from "react-router-dom";
import {useSpring, animated} from 'react-spring'

import Spinner from "../../Atoms/Spinner";

const HOST_RATINGS = gql`
  query showRatings($host_id: ID!) {
    showRatings(host_id: $host_id) {
      guest {
        picture
        name
      }
      message
      ratingValue
      createdAt
    }
  }
`;

export default function UserAskMessage({ user, message, reverse }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const { loading, error, data } = useQuery(HOST_RATINGS, {
    variables: { host_id: user._id }
  });
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
    backgroundColor: red[500],
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

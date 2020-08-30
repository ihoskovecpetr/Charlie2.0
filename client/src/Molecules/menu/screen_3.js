import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Animated } from "react-animated-css";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { UserContext } from "src/Contexts/userContext";

import Spinner from "src/Atoms/Spinner";
import LoginFirstBoard from "src/Atoms/LoginFirstBoard";
import EventCard from "src/Atoms/EventCard";

const USER_NEW_BOOKINGS = gql`
  query showNewestUserBookings($user_id: ID!) {
    showNewestUserBookings(user_id: $user_id) {
      event {
        _id
        name
        description
        dateStart
        dateEnd
        imagesArr {
          caption
          src
          thumbnail
          thumbnailHeight
          thumbnailWidth
          marginLeft
          vwidth
        }
        author {
          _id
          name
          picture
        }
      }
    }
  }
`;

export default function Screen3() {
  const classes = useStyles();
  const [sorted, setSorted] = useState([]);
  const { context } = useContext(UserContext);

  const { loading, error, data } = useQuery(USER_NEW_BOOKINGS, {
    variables: { user_id: context._id },
  });

  useEffect(() => {
    let workSorted = [];

    console.log("pre: ", data && data.showNewestUserBookings);

    if (data) {
      workSorted = data.showNewestUserBookings.reduce(
        (accumulator, currentValue) => {
          console.log(
            "Hmm> ",
            new Date(currentValue.event.dateEnd) >= new Date(),
            accumulator
          );
          if (new Date(currentValue.event.dateEnd) >= new Date()) {
            return [...accumulator, currentValue.event];
          }
          return accumulator;
        },
        []
      );

      console.log("workReduced: ", workSorted);

      if (workSorted.length >= 2) {
        console.log("Not getting here");
        workSorted = workSorted.sort(function(a, b) {
          let aDate = new Date(a.dateEnd);
          let bDate = new Date(b.dateEnd);
          if (aDate > bDate) {
            return 1;
          }
          if (aDate < bDate) {
            return -1;
          }
        });
      }
      setSorted(workSorted);
    }
  }, [data, data && data.showNewestUserBookings]);

  return (
    <div className="section s3">
      <Container maxWidth="sm" className={classes.container_2}>
        <Grid
          item
          id="s_3_id" // style={{ display: "none" }}
        >
          <Animated
            animationIn="bounceInLeft"
            animationOut="fadeOut"
            animationInDelay={500}
            animationInDuration={1000}
            isVisible={true}
          >
            <Typography className={classes.defaultHeader}>
              YOUR <b>NEXT</b> EVENT
            </Typography>
          </Animated>
        </Grid>

        <Grid item xs={12}>
          <Grid justify="center" container>
            <Grid item>
              {!loading && !data && <LoginFirstBoard />}
              {loading && <Spinner height={100} width={100} />}
              {data && sorted.length === 0 && (
                <Typography> You dont have an upcomming event </Typography>
              )}
              {sorted.length != 0 && <EventCard event={sorted[0]} />}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container_2: {
    color: "black",
    paddingTop: 80,
    paddingBottom: 80,
  },

  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    paddingTop: 20,
    fontSize: 20,
    margin: 10,
  },
  containerIframe: {
    width: "100%",
  },
  iFrame: {
    width: "100%",
    height: 250,
  },
}));

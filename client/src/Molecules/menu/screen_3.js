import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Animated } from "react-animated-css";

import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// import "../../Pages/Menu.css";
import { UserContext } from "../../userContext";

import Spinner from "../../Atoms/Spinner";
import LoginFirstBoard from "src/Atoms/LoginFirstBoard";
import EventCard from "../../Atoms/EventCard";

const USER_NEW_BOOKINGS = gql`
  mutation newestUserBookings($user_id: ID!) {
    newestUserBookings(user_id: $user_id) {
      event {
        _id
        name
        description
        dateStart
        imagesArr {
          caption
          src
          thumbnail
          thumbnailHeight
          thumbnailWidth
          scaletwidth
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


export default function Screen3(props) {
  const classes = useStyles();
  const { context } = useContext(UserContext);
  const [newBookingsArr, { loading, error, data }] = useMutation(
    USER_NEW_BOOKINGS,
    {
      variables: { user_id: context._id }
    }
  );

  let Sorted = [];

  if (context.success) {
    {
      !loading && !data && newBookingsArr();
    }
  }

  useEffect(() => {
    if (context.success && context._id) {
        newBookingsArr()
    }

  }, [context]);

  // if (props.idx === 3) {
  //   console.log("Ano podminka");
  // }
  if (data) {
    Sorted = data.newestUserBookings.filter(item => {
      if(item.event)return true
      return false})

    if(Sorted.length >= 2){
          Sorted = data.newestUserBookings.sort(function(a, b) {
          let aDate = new Date(a.event.dateStart);
          let bDate = new Date(b.event.dateStart);
          if (aDate > bDate) {
            return 1;
          }
          if (aDate < bDate) {
            return -1;
          }
        });
    }

  }

  return (
    <div className="section s3">
      <Container maxWidth="sm" className={classes.container_2}>
        <Grid item id="s_3_id" // style={{ display: "none" }}
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
            <Grid item >
              {!loading && !data && <LoginFirstBoard />}
              {loading && <Spinner height={100} width={100} />}
              {Sorted.map((event, index) => {
                if (new Date(event.event.dateStart) >= new Date()) {
                  return <EventCard event={event.event} key={index} />;
                } else {
                  return <p>You have got no upconning event</p>;
                }
              })}
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
    paddingBottom: 80
  },

  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    paddingTop: 20,
    fontSize: 20,
    margin: 10
  },
  containerIframe: {
    width: "100%"
  },
  iFrame: {
    width: "100%",
    height: 250
  }
}));

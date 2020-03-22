import React from "react"
import Grid from "@material-ui/core/Grid";
import Gallery from "react-grid-gallery";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";

import PlayMap from "./Carousel/PlayMap";
import UserCardPlay from "./UserCardPlay";
import RatingCard from "./RatingCardPlay";

const EVENT_RATINGS = gql`
  query showRatings($event_id: ID!) {
    showRatings(event_id: $event_id) {
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

const PlayPageMap = ({event}) => {
    const classes = useStyles();
    const ratings = useQuery(EVENT_RATINGS, {
      variables: { event_id: event._id }
      //skip: !id,
      //pollInterval: 500
    });

    return(
        <Grid container 
              className={classes.mapContainer}>
        <PlayMap event={event} />
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
          direction="row"
          className={classes.ratingAuthorContainer}
        >
          <Grid item xs={12}>
            <Grid
              container
              justify="center"
              className={classes.authorContainer}
            >
              <Grid item xs={12} style={{color: "lightGrey"}}>
                <UserCardPlay author={event.author} />
              </Grid>
            </Grid>
          </Grid>
          <p className={classes.thisLine}></p>

          {/* <Grid item xs={3}>
            <Typography component="div" className={classes.standardHeading}>
              RATING
            </Typography>
          </Grid>

          <Grid item xs={3}>
            {ratings.data &&
              ratings.data.showRatings.map((rating, index) => (
                <Grid item key={index}>
                  <RatingCard rating={rating} />
                </Grid>
              ))}
          </Grid> */}
        </Grid>

      </Grid>  
    )
}


const useStyles = makeStyles(theme => ({
  mapContainer: {
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  ratingAuthorContainer: {
      padding: '0px',
      paddingTop: '5px',
      paddingBottom: '0px',
      width: '100%',
      color: 'white'
    },
    standardHeading: {
      fontWeight: 500,
      color: "grey",
      textAlign: 'left'
    },
    authorContainer: {
      width: "100%"
    },
    thisLine:{
      height: '1px',
      width: '100%',
      marginTop: '2px',
      backgroundColor: "#707070"
    },
  }));

export default React.memo(PlayPageMap)
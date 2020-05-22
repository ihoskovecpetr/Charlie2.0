import React from "react"
import Grid from "@material-ui/core/Grid";
import Gallery from "react-grid-gallery";
import Typography from "@material-ui/core/Typography";
import RoomIcon from '@material-ui/icons/Room';

import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { NavLink } from "react-router-dom";

import gql from "graphql-tag";

import PlayMap from "./Carousel/PlayMap";
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

const PlayPageMap = ({event, paddingSides}) => {
    const classes = useStyles();
    const ratings = useQuery(EVENT_RATINGS, {
      variables: { event_id: event._id }
      //skip: !id,
      //pollInterval: 500
    });

    return(
        <Grid container 
            style={{padding: paddingSides ? paddingSides : '20px'}}
              className={classes.mapContainer}>
        <a  className={classes.gmapsLink} 
            target="blank"
            href={`https://www.google.com/maps?q=${event.geometry.coordinates[1]},${event.geometry.coordinates[0]}&ll=${event.geometry.coordinates[1]},${event.geometry.coordinates[0]}&z=17`}>
              {event.address}
              <RoomIcon />
        </a>
        <PlayMap event={event} />
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
          direction="row"
          className={classes.ratingAuthorContainer}
        >
        </Grid>

      </Grid>  
    )
}


const useStyles = makeStyles(theme => ({
  mapContainer: {
    width: '100%',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: 20
  },
  gmapsLink:{
    textDecoration: "underline",
    color: "aqua"
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
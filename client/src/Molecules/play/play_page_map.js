import React from "react"
import Grid from "@material-ui/core/Grid";
import Gallery from "react-grid-gallery";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

import PlayMap from "./Carousel/PlayMap";
import UserCard from "../../Molecules/event/user-card";
import RatingCard from "../../Molecules/rating-card";

const PlayPageMap = ({event, ratings}) => {
    const classes = useStyles();

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
            <Grid item>
              <UserCard author={event.author} />
            </Grid>
          </Grid>
          </Grid>



          <Grid item xs={3}>
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
        </Grid>
        </Grid>

      </Grid>  
    )
}


const useStyles = makeStyles(theme => ({
  mapContainer: {
    width: '100%',
  },
  ratingAuthorContainer: {
      padding: '40px',
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
  }));

export default PlayPageMap
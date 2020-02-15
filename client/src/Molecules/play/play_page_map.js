import React from "react"
import Grid from "@material-ui/core/Grid";
import Gallery from "react-grid-gallery";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

import PlayMap from "../../Molecules/play/Carousel/play-map";
import UserCard from "../../Molecules/event/user-card";
import RatingCard from "../../Molecules/rating-card";


const PlayPageMap = ({dataDB, ratings}) => {
    const classes = useStyles();

    console.log("Play_Page_Map rdr");

    return(
        <Grid container className={classes.mapContainer}>
        <PlayMap event={dataDB.getOneEvent} />
        <Grid container>
      <Typography component="div" className={classes.standardHeading}>
            AUTHOR
          </Typography>
          <Grid
            container
            justify="center"
            className={classes.authorContainer}
          >
            <Grid item>
              <UserCard author={dataDB.getOneEvent.author} />
            </Grid>
          </Grid>

        <Typography component="div" className={classes.standardHeading}>
          RATING
        </Typography>

        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
          direction="column"
          className={classes.ratingContainer}
        >
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
   
    galleryGrid: {
      width: "100%",
      padding: 0
    }
  }));

export default PlayPageMap
import React from "react"
import Grid from "@material-ui/core/Grid";
import Gallery from "react-grid-gallery";
import { makeStyles } from "@material-ui/core/styles";


const PlayPageGallery = ({event}) => {
    const classes = useStyles();

    return(
        <Grid item className={classes.galleryGrid}>
            <Gallery
            images={event.imagesArr}
            rowHeight={250}
            //display={visible === 1 ? true : false}
            backdropClosesModal={true}
            width={'100%'}
            />
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   
    galleryGrid: {
      width: "100%",
      padding: 0,
      overflow: "hidden"
    }
  }));

export default PlayPageGallery
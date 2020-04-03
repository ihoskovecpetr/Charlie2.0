import React, {useState} from "react"
import Grid from "@material-ui/core/Grid";
import Gallery from "react-grid-gallery";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { makeStyles } from "@material-ui/core/styles";

const PlayPageGallery = ({event}) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleToggleExpand = () => {
    console.log("Expanidnf: ", !expanded)
    setExpanded(!expanded)
  }

    return(
        <Grid item className={classes.galleryGrid}>
          <Collapse in={expanded} timeout="auto" collapsedHeight="277px">
            <Gallery
            images={event.imagesArr}
            rowHeight={250}
            //display={visible === 1 ? true : false}
            backdropClosesModal={true}
            width={'100%'}
            />
             </ Collapse>
             <Grid container 
                  justify="flex-end" 
                  alignItems="center"
                  style={{backgroundColor: "rgba(0,0,0,0.2)",
                          position: "relative", 
                          height: 55,   
                          top: -55}}>
                <Grid item>
                <IconButton 
                    aria-label="settings" 
                    color="secondary" 
                    style={{backgroundColor: "rgba(255,255,255,0.2)", padding: 6, top: 0}}
                    onClick={handleToggleExpand}>
                    {expanded ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
                </IconButton>
                </Grid>
            </Grid>
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
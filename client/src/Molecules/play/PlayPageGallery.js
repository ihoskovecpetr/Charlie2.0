import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Gallery from "react-grid-gallery";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";

import { makeStyles } from "@material-ui/core/styles";

const PlayPageGallery = ({ event }) => {
  const [expanded, setExpanded] = useState(false);
  const [overhangGallery, setOverhangGallery] = useState(false);
  const classes = useStyles();

  const handleToggleExpand = () => {
    console.log("Expanidnf: ", !expanded);
    setExpanded(!expanded);
  };

  useEffect(() => {
    setTimeout(() => {
      let element = document.getElementById("collapse_gallery_id");
      if (
        element &&
        element.childNodes[0] &&
        element.childNodes[0].getBoundingClientRect().height > 277
      ) {
        setOverhangGallery(true);
      } else {
        setOverhangGallery(false);
      }
    }, 1000);
  });

  return (
    <Grid item className={classes.galleryGrid}>
      <Collapse
        in={expanded}
        timeout="auto"
        collapsedHeight="277px"
        id="collapse_gallery_id"
      >
        <Gallery
          images={event.imagesArr}
          rowHeight={230}
          //display={visible === 1 ? true : false}
          backdropClosesModal={true}
          width={"100%"}
          id="gallery_id"
        />
      </Collapse>
      {overhangGallery && (
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          className={classes.arrowGrid}
        >
          <Grid item>
            <IconButton
              aria-label="settings"
              color="secondary"
              className={classes.expandArrowWrap}
              onClick={handleToggleExpand}
            >
              {expanded ? (
                <VerticalAlignTopIcon fontSize="large" />
              ) : (
                <VerticalAlignBottomIcon fontSize="large" />
              )}
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  galleryGrid: {
    width: "100%",
    padding: 0,
    overflow: "hidden",
  },
  arrowGrid: {
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "relative",
    height: 55,
    top: -55,
  },
  expandArrowWrap: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 6,
    top: 0,
  },
}));

export default PlayPageGallery;

import React from "react"
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from "@material-ui/core/styles";

import { useWindowSize } from "../../../Hooks/useWindowSize";


export default function JoinPanel(){
    const classes = useStyles();
    const windowSize = useWindowSize();

    return(
        <div 
            className={classes.wrapGridButtons} 
            style={{top: `${windowSize.height-40}px`}}>
        <Container
        maxWidth="xs"
        style={{padding: 0}}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          className={classes.gridButtons}
        >
          <Grid item xs={8}>
            <Grid container justify="center">
              <Grid item xs={12} className={classes.actionJoin}>
              <Chip label={`JOIN ${0}`} variant="outlined" color="secondary" style={{width: "100%"}} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} >
            <Grid container justify="center">
              <Grid item xs={12} className={classes.actionNext}>
                <Chip label={`PASS`} variant="outlined" color="primary" style={{width: "100%"}}  />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Container >
        </div>
    )

}

const useStyles = makeStyles(theme => ({
    wrapGridButtons: {
        position: "fixed",
        width: '100%',
        height: "0px", 
        top: 0,
        zIndex: 100,
      },
    gridButtons: {
      color: "white",
      marginTop: "0 !important",
      display: "flex",
      height: 40,
      width: '100%',
      zIndex: 100,
      backgroundColor: "rgba(0,0,0,0.7)"
    },
    actionJoin: {
      alignContent: "center",
    },
    actionNext: {
      backgroundColor: "lightGrey",
      alignContent: "center",
      borderRadius: "25px",
      position: "relative",
      boxShadow: "5px 5px 10px 0px rgba(0,0,0,0.7)"
    }
  }));


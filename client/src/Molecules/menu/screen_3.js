import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {Animated} from "react-animated-css";


import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import "../../Pages/Menu.css";

import Spinner from "../../Atoms/Spinner";
import EventCard from "../../Molecules/event-card";

export default function Screen2(props){
    const classes = useStyles();

    let Sorted = [];
    if (props.data) {
      Sorted = props.data.newestUserBookings.sort(function(a, b) {
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

    return (
        <div className="section s3">
        <Container maxWidth="sm" className={classes.container_2}>
          <Grid item>
                    <Typography className={classes.defaultHeader}>
                      YOUR <b>NEXT</b> EVENTS
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Grid justify="center" container style={{ width: "100%" }}>
                      <Grid item style={{ width: "90%" }}>
                        {!props.loading && !props.data && <p>No data</p>}
                        {props.loading && <Spinner height={100} width={100} />}
                        {Sorted.map((event, index) => {
                          if (new Date(event.event.dateStart) >= new Date()) {
                            return (
                              <EventCard event={event.event} key={index} />
                            );
                          } else {
                            //console.log("PAST EVENT: ", event.event.dateStart);
                            return null;
                          }
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
        </Container>
      </div>

    )

}

const useStyles = makeStyles(theme => ({
    container_2: {
      height: "100vh",
      color: "black",
      paddingTop: "12vh",
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
      },

  }));
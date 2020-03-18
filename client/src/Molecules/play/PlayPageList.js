import React from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import clsx from 'clsx'

import Spinner from "../../Atoms/Spinner";
import PendingGuest from "../event/PendingGuest";
import ConfirmedGuest from "../event/confirmed-guest";

import { displayDate } from "../../Services/transform-services";


const PlayPageList = ({event, showBookings, ONE_EVENT,cancelBooking, cancelledState, bookingStates}) => {
    const classes = useStyles();

    return(
        <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        alignContent="flex-start"
        className={classes.mainContainer}
        style={{touchAction: "inherit"}}
      >
      <Grid item xs={12}>
          <Grid container 
                justify="center">
            <Grid item>
              <Typography variant="h4" className={classes.mainHeader}>
              {event.name}
              
              <p className={classes.thisLineHeader}></p>

              </Typography>
            </Grid>
          </Grid>
      </Grid>
        <Grid item xs={12}>
            <Typography component="p" className={classes.standardDescription}>
              {event.description}
            </Typography>
  
        </Grid>


        <Grid item xs={12} className={classes.listRow}>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography component="div" className={classes.standardHeading}>
                DATE
              </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography component="div" className={clsx(classes.standardContent)}>
                  {event.dateStart &&
                    displayDate(event.dateStart)}
                </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.listRow}>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography component="div" className={classes.standardHeading}>
                PRICE
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography component="p" className={classes.standardContent}>
                {event.price} {event.currency}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12} className={classes.listRow}>
        <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography component="div" className={classes.standardHeading}>
            BYO
          </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography component="p" className={classes.standardContent}>
              {event.BYO ? "YES" : "NO"}
            </Typography>
        </Grid>
        </Grid>
        </Grid>

        <Grid item xs={12} className={classes.listRow}>
        <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography component="div" className={classes.standardHeading}>
            ATTENDEES
          </Typography>
        </Grid>
        <Grid item xs={8}>
            <ConfirmedGuest
              bookings={event.bookings}
              cancelBooking={cancelBooking}
              cancelledState={cancelledState}
              event={event}
              ONE_EVENT={ONE_EVENT}
            />

            {bookingStates && bookingStates.loading && (
              <Spinner height={100} width={100} />
            )}
        </Grid>
        </Grid>
        </Grid>

        {/* <Grid item xs={12}>
          {event.areYouAuthor && (
            <>
              <Typography
                component="div"
                className={classes.standardHeading}
              >
                PENDING
              </Typography>
              <Grid container>
                <Box textAlign="left" m={1}>
                  <Grid container direction="row">
                    {showBookings && showBookings.map(booking => {
                      console.log("Pending GSTS: ", !booking.confirmed && !booking.cancelled)
                      if (!booking.confirmed && !booking.cancelled) {
                        return (
                          <Grid item>
                            <PendingGuest
                              booking={booking}
                              event={event}
                              ONE_EVENT={ONE_EVENT}
                            />
                          </Grid>
                        );
                      }
                      return null;
                    })}
                  </Grid>
                  {bookingStates.loading && (
                    <Spinner height={100} width={100} />
                  )}
                </Box>
              </Grid>
              <p className={classes.thisLine}></p>
            </>
          )}
        </Grid> */}
        <Grid item xs={12} className={classes.listRow}>
        <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography component="div" className={classes.standardHeading}>
            ADDRESS
          </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography component="p" className={classes.standardContent}>
              {event.address ? event.address : "NO Address"}
            </Typography>
        </Grid>
        </Grid>
        </Grid>
      </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   
    mainContainer:{
        padding: '20px',
        paddingTop: '5px',
        paddingBottom: '0px',
        width: '100%',
      },
      listRow:{
        width: '100%',
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: "rgba(255,255,255,0.05)",
      },
      thisLine:{
        height: '1px',
        width: '100%',
        marginTop: '2px',
        // backgroundColor: "#707070"
      },
      thisLineHeader:{
        height: '1px',
        width: '100%',
        marginTop: '2px',
        backgroundColor: "#707070"
      },
      mainHeader:{
        marginTop: '20px',
        marginBottom: '5px'
      },
      standardHeading: {
        fontWeight: 500,
        // color: "lightGrey",
        textAlign: 'left',
        backgroundColor: "rgba(255,255,255,0.05)",
        padding: 10
      },
      standardDescription: {
        fontWeight: 400,
        textAlign: 'left',
        padding: 10
      },
      standardContent: {
        fontWeight: 400,
        textAlign: 'right',
        color: '#29FFF7',
        padding: 10
      }
  }));

export default PlayPageList
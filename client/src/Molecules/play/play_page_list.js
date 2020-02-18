import React from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import clsx from 'clsx'

import Spinner from "../../Atoms/Spinner";
import PendingGuest from "../../Molecules/event/pending-guest";
import ConfirmedGuest from "../../Molecules/event/confirmed-guest";
import { useWindowSize } from "../../Hooks/useWindowSize";

import { displayDate } from "../../Services/transform-services";


const PlayPageList = ({event, showBookings, ONE_EVENT,cancelBooking, cancelledState, bookingStates}) => {
    const classes = useStyles();
    const windowSize = useWindowSize()
    return(
        <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        alignContent="flex-start"
        direction="column"
        className={classes.mainContainer}
      >
      <Grid item xs={12}>
          <Typography variant="h4" className={classes.mainHeader}>
          {event.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography component="p" className={classes.standardDescription}>
              {event.description}
            </Typography>
  
        </Grid>

        <p className={classes.thisLine}></p>

        <Grid item xs={12} className={classes.listRow}>
          <Grid container item xs={12}>
            <Grid item xs={3}>
              <Typography component="div" className={classes.standardHeading}>
                DATE
              </Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography component="div" className={clsx(classes.standardContent)}>
                  {event.dateStart &&
                    displayDate(event.dateStart)}
                </Typography>
            </Grid>
          </Grid>
        </Grid>
        <p className={classes.thisLine} style={{width: windowSize.height/10}}></p>
        <p className={classes.thisLine} style={{width: '10vh'}}></p>
        <Grid item xs={12} className={classes.listRow}>
          <Grid container item xs={12}>
            <Grid item xs={3}>
              <Typography component="div" className={classes.standardHeading}>
                PRICE {windowSize.width}px / {windowSize.height}px
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography component="p" className={classes.standardContent}>
                {event.price} {event.currency}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        
        <p className={classes.thisLine}></p>
        <Grid item xs={12} className={classes.listRow}>
        <Grid container item xs={12}>
        <Grid item xs={3}>
          <Typography component="div" className={classes.standardHeading}>
            BYO
          </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography component="p" className={classes.standardContent}>
              {event.BYO ? "YES" : "NO"}
            </Typography>
        </Grid>
        </Grid>
        </Grid>
        <p className={classes.thisLine}></p>
        <Grid item xs={12} className={classes.listRow}>
        <Grid container item xs={12}>
        <Grid item xs={3}>
          <Typography component="div" className={classes.standardHeading}>
            ATTENDEES
          </Typography>
          </Grid>
          <Grid item xs={9}>
          <Box textAlign="left" m={1}>
            {/* <ConfirmedGuest
              bookings={showBookings}
              cancelBooking={cancelBooking}
              cancelledState={cancelledState}
              event={event}
              ONE_EVENT={ONE_EVENT}
            /> */}

            {bookingStates.loading && (
              <Spinner height={100} width={100} />
            )}
          </Box>
        </Grid>
        </Grid>
        </Grid>
        <Grid item xs={12}>
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
            </>
          )}
        </Grid>

      </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   
    mainContainer:{
        padding: '40px',
        paddingTop: '5px',
        paddingBottom: '0px',
        width: '100%',
        color: 'white'
      },
      listRow:{
        width: '100%',
      },
      thisLine:{
        height: '2px',
        //width: '100%',
        marginTop: '2px',
        backgroundColor: "lightgrey"
      },
      mainHeader:{
        marginTop: '20px',
        marginBottom: '5px'
      },
      standardHeading: {
        fontWeight: 500,
        color: "grey",
        textAlign: 'left'
      },
      standardDescription: {
        fontWeight: 300,
        textAlign: 'left'
      },
      standardContent: {
        fontWeight: 400,
        textAlign: 'right',
        color: '#29FFF7'
      }
  }));

export default PlayPageList
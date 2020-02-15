import React from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import clsx from 'clsx'

import Spinner from "../../Atoms/Spinner";
import PendingGuest from "../../Molecules/event/pending-guest";
import ConfirmedGuest from "../../Molecules/event/confirmed-guest";

import { displayDate } from "../../Services/transform-services";


const PlayPageList = ({dataDB, ONE_EVENT,cancelBooking, cancelledState, bookingStates}) => {
    const classes = useStyles();

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
          {dataDB.getOneEvent.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography component="p" className={classes.standardDescription}>
              {dataDB.getOneEvent.description}
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
                  {dataDB.getOneEvent.dateStart &&
                    displayDate(dataDB.getOneEvent.dateStart)}
                </Typography>
            </Grid>
          </Grid>
        </Grid>
        <p className={classes.thisLine}></p>
        <Grid item xs={12} className={classes.listRow}>
          <Grid container item xs={12}>
            <Grid item xs={3}>
              <Typography component="div" className={classes.standardHeading}>
                PRICE
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography component="p" className={classes.standardContent}>
                {dataDB.getOneEvent.price} {dataDB.getOneEvent.currency}
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
              {dataDB.getOneEvent.BYO ? "YES" : "NO"}
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
            <ConfirmedGuest
              bookings={dataDB.showBookings}
              cancelBooking={cancelBooking}
              cancelledState={cancelledState}
              event={dataDB.getOneEvent}
              ONE_EVENT={ONE_EVENT}
            />

            {bookingStates.loading && (
              <Spinner height={100} width={100} />
            )}
          </Box>
        </Grid>
        </Grid>
        </Grid>
        <Grid item xs={12}>
          {dataDB.getOneEvent.areYouAuthor && (
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
                    {dataDB.showBookings.map(booking => {
                      if (!booking.confirmed && !booking.cancelled) {
                        return (
                          <Grid item>
                            <PendingGuest
                              booking={booking}
                              event={dataDB.getOneEvent}
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
        height: '1px',
        width: '100%',
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
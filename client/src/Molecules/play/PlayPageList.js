import React from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import clsx from 'clsx'

import Spinner from "../../Atoms/Spinner";
import PendingGuest from "../event/PendingGuest";
import ConfirmedGuest from "../event/ConfirmedGuest";

import { displayDate } from "../../Services/transform-services";


const PlayPageList = ({event, bookings, GQL_refetch, refetchVariables, cancelBooking, cancelledState, paddingSides}) => {
    const classes = useStyles();

    console.log("PlayPageList evt: ", event);

    return(
        <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        alignContent="flex-start"
        className={classes.mainContainer}
        style={{touchAction: "inherit", padding: paddingSides ? paddingSides : '20px'}}
      >
        {/* <Grid item xs={12}>
            <Grid container 
                  justify="center">
              <Grid item>
                <Typography variant="h4" className={classes.mainHeader}>
                {event.name}
                <p className={classes.thisLineHeader}></p>
                </Typography>
              </Grid>
            </Grid>
        </Grid> */}
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
              event={event}
              bookings={bookings}
              cancelBooking={cancelBooking}
              cancelledState={cancelledState}
              GQL_refetch={GQL_refetch}
              refetchVariables={refetchVariables}
            />

            {/* {bookingStates && bookingStates.loading && (
              <Spinner height={100} width={100} />
            )} */}
        </Grid>
        </Grid>
        </Grid>

        <Grid item xs={12} className={classes.listRow}>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography component="div" className={classes.standardHeading}>
                ADDRESS
              </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography component="p" className={classes.standardContent}>
                  {event.address}
                </Typography>
            </Grid>
          </Grid>
        </Grid>
        {event.areYouAuthor &&
        <Grid item xs={12} className={classes.listRow}>
                      <Grid container item xs={12}>
                        <Grid item xs={4}>
                          <Typography component="div" className={classes.standardHeading}>
                            PENDING
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div" className={classes.standardContent}>
                                <Grid container>
                                    <Grid container direction="row">
                                      {bookings && bookings.map(booking => {
                                        if (!booking.confirmed && !booking.cancelled) {
                                          return (
                                            <Grid item>
                                              <PendingGuest
                                                booking={booking}
                                                event={event}
                                              />
                                            </Grid>
                                          );
                                        }
                                        return null;
                                      })}
                                    </Grid>
                                    {/* {bookingStates.loading && (
                                    <Grid container justify="center" alignItems="center" style={{width: "100%", height: 300}}>
                                      <Grid item>
                                        <Spinner height={100} width={100} />
                                      </Grid>
                                    </Grid>
                                    )} */}
                                </Grid>
                            </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
        }
      </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   
    mainContainer:{
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
        width: '100%',
        fontWeight: 500,
        // color: "lightGrey",
        textAlign: 'right',
        backgroundColor: "rgba(255,255,255,0.05)",
        padding: 10,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      standardDescription: {
        fontWeight: 400,
        textAlign: 'left',
        padding: 10,
      },
      standardContent: {
        width: '100%',
        fontWeight: 400,
        textAlign: 'left',
        color: '#29FFF7',
        padding: 10,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
  }));

export default PlayPageList
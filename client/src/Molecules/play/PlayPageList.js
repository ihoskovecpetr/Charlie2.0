import React, {useContext} from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

import clsx from 'clsx'

import { UserContext } from "src/userContext";
import { displayDate } from "../../Services/transform-services";
import { useXsSize } from "src/Hooks/useXsSize";

import ListTopHalf from "src/Atoms/Play/ListTopHalf";
import QRCodeEntering from "src/Atoms/Play/QRCodeEntering";
import PendingGuest from "../event/PendingGuest";
import ConfirmedGuest from "../event/ConfirmedGuest";
import UserCardPlay from "./UserCardPlay";
import EnteredGuests from "src/Atoms/Play/EnteredGuests";
import BookingMessages from "src/Atoms/BookingMessages";
import BookingAcceptInput from "src/Atoms/BookingAcceptInput";


const PlayPageList = ({event, bookings, GQL_refetch, refetchVariables, cancelBooking, cancelledState, paddingSides}) => {
    const classes = useStyles();
    const { context, setContext } = useContext(UserContext);
    const { xs_size_memo, md_size_memo } = useXsSize();

    //Count confirmed 
    var confBookings = 0
    if(bookings){
      confBookings = bookings.filter(booking => {
        if(booking.confirmed){
          return true
        }else{return false }
      })
    }
    console.log("confBookings: ", confBookings, event.name)

    let bgColor = "transparent"
    if(md_size_memo){
      bgColor = "rgba(0,0,0,0.1)"
    } else {
      bgColor = "rgba(0,0,0,0.1)"
    }

    return(
        <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        alignContent="flex-start"
        className={classes.mainContainer}
        style={{touchAction: "inherit", 
                paddingLeft: paddingSides ? paddingSides : '20px',
                paddingRight: paddingSides ? paddingSides : '20px'}}
      >

        <ListTopHalf event={event} />

        <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              <Grid item className={classes.separatorLineItem}>
            </Grid>
            </Grid>
        </Grid>

        <Grid item xs={12} 
              className={classes.blackBackContainer}
              style={{backgroundColor: bgColor }}>
            <Grid container alignItems="center">
              <Grid item className={classes.descWrap}>
                <Typography variant="subtitle1" className={classes.standardDescription}>
                {event.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid container 
                  alignItems="center"
                  justify="flex-end">
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.lineHeader}>
                  ATTENDEES ({confBookings.length}/{event.capacityMax})
                </Typography>
              </Grid>
              <Grid item xs={10} className={classes.attendeesWrap}>
                <ConfirmedGuest
                  event={event}
                  bookings={bookings}
                  cancelBooking={cancelBooking}
                  cancelledState={cancelledState}
                  GQL_refetch={GQL_refetch}
                  refetchVariables={refetchVariables}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.lineHeader}>
                BRING YOUR OWN DRINK/SNACK
                </Typography>

              </Grid>
              <Grid item xs={10}>

                  <FormControlLabel
                      className={classes.switchBYOWrap}
                      label={event.BYO ? "YES you can" : "NO you can't"}
                      control={ <Switch checked={event.BYO} /> }
                    />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.lineHeader}>
                  AUTHOR
                </Typography>
              </Grid>
              <Grid item xs={10} >
                <UserCardPlay author={event.author} />
              </Grid>

              {event.areYouAuthor &&
            <>
              <Grid item xs={12}>
                <Typography component="div" className={classes.lineHeader}>
                  PENDING
                </Typography>
              </Grid>
              <Grid item xs={12}>
                        <Grid container justify="center">
                              {bookings && bookings.map(booking => {
                                console.log("Booking: ", booking)
                                if (!booking.decided) {
                                  return (
                                    <Grid item className={classes.bookingMessInput}>
                                        <BookingMessages booking={booking} />
                                        <BookingAcceptInput booking={booking} />
                                    </Grid>
                                  );
                                }
                                return null;
                              })}
                            {/* {bookingStates.loading && (
                            <Grid container justify="center" alignItems="center" style={{width: "100%", height: 300}}>
                              <Grid item>
                                <Spinner height={100} width={100} />
                              </Grid>
                            </Grid>
                            )} */}
                        </Grid>
              </Grid>
              </>}
              {event.happeningNow &&
              <>
                <Grid item xs={12}>
                  <Typography component="div" className={classes.lineHeader}>
                    ENTERED guests
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <QRCodeEntering bookings={bookings} />
                </Grid>
                <Grid item xs={12}>
                  <EnteredGuests bookings={bookings} />
                </Grid>
              </>
              }
            </Grid>
        </Grid>
      </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   
    mainContainer:{
        paddingTop: 5,
        paddingBottom: '0px',
        width: '100%',
      },
      blackBackContainer:{
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        padding: 5,
        paddingTop: 20,
        paddingBottom: 20,
      },

      separatorLineItem:{
        backgroundColor: "rgba(129, 123,123,0.5)",
        height: 10,
        width: 45,
        borderRadius: 5
      },

      lineHeader:{
        paddingLeft: 15,
        width: '100%',
        paddingTop: 10,
        color: '#7E7B7B',
        textAlign: 'left'
      },
      attendeesWrap:{
        minHeight: 60,
 
      },

      listRow:{
        width: '100%',
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: "rgba(255,255,255,0.05)",
      },
      thisLine:{
        height: '1px',
        width: '80%',
        margin: 0,
        marginTop: '2px',
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: "#707070"
      },
      thisLineHeader:{
        height: '1px',
        width: '100%',
        marginTop: '2px',
        backgroundColor: "#707070"
      },
      mainHeader:{
        textAlign: "center",
        fontSize: 30,
        fontWeight: 600,
        padding: 10,
      },
      headerPrice:{
        fontSize: 20,
      },
      headerPerPerson:{
        fontSize: 16,
        fontWeight: 300
      },
      addressGreyWrap:{
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
      },
      switchBYOWrap:{
        margin: 10,
      },
      addressGrey:{
      },
      timeDistanceWrap:{
        padding: 10,
        paddingRight: 20
      },
      timeDistance:{
        fontSize: 16,
      },
      descWrap:{
        padding: 20
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
        fontWeight: 500,
        fontSize: 16,
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
      bookingMessInput: {
        backgroundColor: "rgba(0,0,0,0.38)",
        borderRadius: 10,
        marginBottom: 5
      }
  }));

export default PlayPageList
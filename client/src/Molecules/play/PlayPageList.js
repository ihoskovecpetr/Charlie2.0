import React, {useContext, useState} from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkIcon from '@material-ui/icons/Link';

import clsx from 'clsx'
import { useHistory } from "react-router-dom";

import { displayDate } from "../../Services/transform-services";
import { useXsSize } from "src/Hooks/useXsSize";
import { UserContext } from "src/userContext";

import ListTopHalf from "src/Atoms/Play/ListTopHalf";
import QRCodeEntering from "src/Atoms/Play/QRCodeEntering";
import PendingGuest from "../event/PendingGuest";
import ConfirmedGuest from "../event/ConfirmedGuest";
import UserCardPlay from "./UserCardPlay";
import EnteredGuests from "src/Atoms/Play/EnteredGuests";
import BookingMessages from "src/Atoms/BookingMessages";
import BookingAcceptInput from "src/Atoms/BookingAcceptInput";

const PlayPageList = ({propContext, propSetContext, event, bookings, GQL_refetch, refetchVariables, cancelBooking, cancelledState, paddingSides}) => {
    const classes = useStyles();
    const { xs_size_memo, md_size_memo } = useXsSize();
    const {context, setContext} = useContext(UserContext)
    const [openTooltip, setOpenTooltip] = useState(false);
    let history = useHistory();
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

    const handleTooltipClose = () => {
      setOpenTooltip(false);
    };

    const handleCopyLink = () => {
      var copyText = document.getElementById("myInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy");
      setOpenTooltip(true);
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

        <ListTopHalf event={event} context={propContext ? propContext : context}/>  {/* in case of rendering on map is Context passed as a prop to components */}

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
                  ATTENDEES ({confBookings && confBookings.length}/{event.capacityMax})
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
                              {bookings && bookings.length === 0 && <p>No pending guests</p>}
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
                  <EnteredGuests bookings={bookings} />
                </Grid>
                {event.areYouAuthor &&
                <Grid item xs={12} className={classes.quoteAccGuest}>
                  <p>
                  "Scan QR code from guests email and accept them opening link in QR code."
                  </p>
                  <p>More info 
                    <span className={classes.linkToAbout}
                      onClick={() => {history.push('/about')}}>
                      HERE
                    </span>
                  </p>
                  {/* <QRCodeEntering bookings={bookings} /> */}
                </Grid>
                }
              </>
              }
              <Grid item xs={12}>
                <p className={classes.thisLine}></p>
                <Typography component="div" className={classes.lineHeader}> 
                  SHARE                  
                </Typography>
              </Grid>
                <Grid item xs={9}>
                  <Grid container justify="flex-end">
                    <TextField id="myInput" className={classes.copyLink} fullWidth variant="outlined" value={`https://www.charliehouseparty.club/play/${event._id}`} />
                  </Grid>
                </Grid>

                <Grid item xs={3}>
                  <Grid container justify="center">
                    <Tooltip 
                        title="link copied" 
                        PopperProps={{
                          disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={openTooltip}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        placement="top">
                      <Button variand="outlined" color="primary" onClick={handleCopyLink}><LinkIcon /> copy Link </ Button>
                    </Tooltip>
                  </Grid>
                </Grid>
                

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
      linkToAbout: {
        textDecoration: 'underline',
        fontWeight: 500
      },
      copyLink: {
        color: 'white',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 5,
        cursor: 'copy'
      },
      quoteAccGuest:{
        padding: 10
      },
      copyLinkSpan: {
        color: 'primary',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
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
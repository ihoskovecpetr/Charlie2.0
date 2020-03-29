import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { displayDate } from "../../Services/transform-services";
import { useCountDistance } from "../../Hooks/useCountDistance";
import { UserContext } from "../../userContext";
import PendingGuest from "../../Molecules/event/PendingGuest";
import Spinner from "../../Atoms/Spinner";

import countdown from "countdown";


export default function PendingGuestsListItem({ bookings, areYouAuthor, ONE_EVENT }) {
  const classes = useStyles();
  const { context, setContext } = useContext(UserContext);

    console.log("PENDING GST: ", bookings, areYouAuthor );
  return (
    <>
        {bookings && areYouAuthor && (
                  <>
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
                                      {bookings.map(booking => {
                                        if (!booking.confirmed && !booking.cancelled) {
                                          return (
                                            <Grid item>
                                              <PendingGuest
                                                booking={booking}
                                                event={booking.event}
                                                // ONE_EVENT={ONE_EVENT}
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
                  </>
        )}
    </>
  );
}

const useStyles = makeStyles(theme => ({
    listRow:{
        width: '100%',
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: "rgba(255,255,255,0.05)",
      },
    standardHeading: {
        width: '100%',
        fontWeight: 500,
        // color: "lightGrey",
        textAlign: 'left',
        backgroundColor: "rgba(255,255,255,0.05)",
        padding: 10,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      standardContent: {
        fontWeight: 400,
        textAlign: 'right',
        color: '#29FFF7',
        padding: 10
      },
}));

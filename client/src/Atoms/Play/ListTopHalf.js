import React, {useContext} from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RoomIcon from '@material-ui/icons/Room';
import EventIcon from '@material-ui/icons/Event';
import { makeStyles } from "@material-ui/core/styles";

import countdown from "countdown";

import { UserContext } from "src/userContext";
import { displayDate } from "src/Services/transform-services";
import { useCountDistance } from "src/Hooks/useCountDistance";
import { useXsSize } from "src/Hooks/useXsSize";

const ListTopHalf = ({event, transparent}) => {
    const classes = useStyles();
    const { context, setContext } = useContext(UserContext);
    const { xs_size_memo, md_size_memo } = useXsSize();
    const distance = useCountDistance(event.geometry.coordinates[1], event.geometry.coordinates[0], context.geolocationObj && context.geolocationObj.lat, context.geolocationObj && context.geolocationObj.lng, "K")

    let bgColor = "transparent"

    if(md_size_memo){
      bgColor = "rgba(0,0,0,0.1)"
    } else {
      bgColor = "rgba(0,0,0,0.1)" // "white" //"rgba(0,0,0,0.05)"
    }
    if(transparent){
        bgColor = "transparent"
    }

    return(
        <Grid item xs={12} 
              className={classes.blackBackContainer} 
              style={{backgroundColor: bgColor }}>
            <Grid container 
                  alignItems="center"
                  justify="center"
                  className={classes.nameAndPrice} 
                  >
              <Grid item xs={8}>
                <Typography variant="h4" className={classes.mainHeader}>
                {event.name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h4" className={classes.headerPrice}>
                {event.price} {event.currency}
                </Typography>
                <Typography variant="h4" className={classes.headerPerPerson}>
                /per person
                </Typography>
              </Grid>
            </Grid>

            <Grid container 
                  alignItems="center">
              <Grid item xs={6} className={classes.addressGreyWrap}>
                <Typography variant="p" className={classes.addressGrey}>
                {event.address}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="center">
                    <Grid item>
                        <RoomIcon color="secondary" />
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} className={classes.timeDistanceWrap}>
                <Typography variant="p" className={classes.timeDistance}>
                <b>{`${Math.floor(distance * 10)/10} Km`}</b> away
                </Typography>
              </Grid>
            </Grid>
            <p className={classes.thisLine}></p>
            <Grid container 
                  alignItems="center"
                  justify="center">
              <Grid item xs={6} className={classes.addressGreyWrap}>
                <Typography variant="p" className={classes.addressGrey}>
                  {event.dateStart && displayDate(event.dateStart)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="center">
                    <Grid item>
                        <EventIcon color="secondary" />
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} className={classes.timeDistanceWrap}>
                <Typography variant="p" className={classes.timeDistance}>
                In <b>{`${countdown(new Date(event.dateStart), new Date(), "X", 1).toString()}`}</b>
                </Typography>
              </Grid>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   

      blackBackContainer:{
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        padding: 5,
        paddingTop: 20,
        paddingBottom: 20,
      },
      thisLine:{
        height: '1px',
        width: '80%',
        margin: 0,
        marginTop: '2px',
        marginBottom: '2px',
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: "#707070"
      },
      nameAndPrice:{
        marginBottom: 25
      },
      mainHeader:{
        textAlign: "center",
        fontSize: 30,
        fontWeight: 600,
        padding: 10,
      },
      headerPrice:{
        fontSize: 20,
        textAlign: "center",
      },
      headerPerPerson:{
        fontSize: 16,
        fontWeight: 300,
        textAlign: "center",
      },
      addressGreyWrap:{
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: "center",
      },
      timeDistanceWrap:{
        padding: 10,
        paddingRight: 20
      },
      timeDistance:{
        fontSize: 16,
        textAlign: "left",
      },
      descWrap:{
        padding: 20
      },
  }));

export default ListTopHalf
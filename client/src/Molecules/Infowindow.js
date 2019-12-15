import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { green } from "@material-ui/core/colors";

import { displayDate } from "../Services/transform-services";

var alreadyAttending = false;

function Infowindow(props) {
  console.log("props.location: ", props.location);
  let Pic = props.location.imagesArr[0];
  let Author = props.location.author;

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const openModalEvent = () => {
    console.log("openModalEvent: window history??: ", window);

    var youOwnerVar = false;

    if (props.location.creatorEmail == props.email) {
      console.log("You are the OWNER!");
      youOwnerVar = true;
    } else {
      console.log("You are NOT the owner!");
    }
    console.log("Event _id: ", props.location._id);
    var string = "/event/" + props.location._id;
    console.log("correct string: ", string);

    window.AppHistory.push(string, {
      //tady: napsatStateKdyžtak
    });
  };

  return (
    <>
      <CssBaseline />
      <Grid container justify="center" className={classes.topbar}>
        <Grid>
          <h3 className={classes.h3Name}>{props.location.name}</h3>
        </Grid>
      </Grid>
      <img src={Pic.src} alt={Pic.capture} className={classes.img} />
      <Grid container justify="center" className={classes.authorGrid}>
        <Avatar
          alt="Author picture"
          src={Author.picture}
          className={classes.avatar}
        />
      </Grid>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.body}
      >
        <Grid item alignItems="center">
          <Typography noWrap>
            {displayDate(props.location.dateStart)}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.gridButton}
      >
        <Button
          variant="contained"
          color="#E8045D"
          className={classes.buttonOpen}
          onClick={e => {
            e.preventDefault();
            openModalEvent();
          }}
        >
          OPEN
        </Button>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  img: {
    height: 100,
    width: 200
  },
  topbar: {
    position: "absolute",
    //height: 35,
    width: "100%",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.3) 100%)",
    color: "white",
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center"
  },
  buttonOpen: {
    width: "100%",
    background: "#E8045D",
    color: "white",
    borderRadius: 0
  },
  h3Name: {
    display: "inline-block",
    margin: "0.5em",
    fontSize: 18
  },

  authorGrid: {
    top: -30,
    position: "relative"
  },
  avatar: {
    border: "2px solid #FFFFFF",
    width: 60,
    height: 60
  },
  body: {
    top: -30,
    position: "relative",
    width: "100%",
    color: "white",
    flexGrow: 1
  },
  gridButton: {
    width: "100%",
    bottom: 0,
    position: "absolute",
    color: "white",
    flexGrow: 1
  }
}));

export default Infowindow;

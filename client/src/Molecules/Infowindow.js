import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import countdown from "countdown";

import { displayDate } from "src/Services/transform-services";

function Infowindow(props) {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const classes = useStyles();


  let Pic = props.location.imagesArr[0];
  let Author = props.location.author;


  console.log("Pic: ", Pic)


  const openModalEvent = () => {

    setOpenBackdrop(true)
    var string = "/event/" + props.location._id;
    window.AppHistory.push(string, {
      //tady: napsatStateKdyžtak 
    });
  };

  const handleClose = () => {
    setOpenBackdrop(true)
  }

  return (
    <>
      <CssBaseline />
      <Grid container justify="center" className={classes.topbar}>
        <Grid>
          <h3 className={classes.h3Name}>{props.location.name}</h3>
        </Grid>
      </Grid>
      {/* <img src={Pic.src} alt={Pic.capture} className={classes.img} /> */}
      <div className={classes.img} style={{backgroundImage: `url('${Pic.thumbnail}')`}}> </div>
      <Grid container justify="center" className={classes.authorGrid}>
        <Avatar
          alt="Author picture"
          src={Author.picture}
          className={classes.avatar}
        />
      </Grid>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
        className={classes.infoWindBody}
      >
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.countdown}>
            {countdown(
              new Date(props.location.dateStart),
              new Date(),
              "X",
              1
            ).toString()}{" "}
            ago
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
          className={classes.buttonOpen}
          onClick={e => {
            e.preventDefault();
            if (props.user.success) {
              openModalEvent();
            } else {
              props.redirectLogin();
            }
          }}
        >
          OPEN {!props.user.success && "(LOGIN)"}
        </Button>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  img: {
    height: 100,
    width: 200,
    backgroundSize: "cover"
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
    height: 0,
    position: "relative"
  },
  avatar: {
    border: "2px solid #FFFFFF",
    width: 60,
    height: 60
  },
  infoWindBody: {
    position: "relative",
    padding: 5,
    width: "100%",
    height: 84,
  },
  countdown: {
    position: "relative",
    width: "100%",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 600,
    color: "grey",
    textAlign: "center"
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

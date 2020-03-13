import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { Animated } from "react-animated-css";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FilterListIcon from '@material-ui/icons/FilterList';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import { makeStyles } from "@material-ui/core/styles";
import CharlieHalf from "../../Images/charlie_half.png";
import CharBckg from "../../Images/charbckg.png";

import "../../Pages/Menu.css";


// import FlippingLogo from "../../Atoms/Flipping-logo/logo";
// import EmpireOriginal from "../../Images/empire.jpg";
// import CharlieHalf from "../../Images/charlie_half.png";
// import Skyline from "../../Images/skyline.png";

export default function Screen1() {
  const classes = useStyles();
  let history = useHistory();
  const [windowHeight, setWindowHeight] = useState(0);


  useEffect(() => {
      setWindowHeight(window.innerHeight)
  }, []);


  const redirectPlay = () => {
    history.push("/play")
  }

  const redirectCreate = () => {
    history.push("/create")
  }

  return (
    <div
      className="section s1"
      // style={{ backgroundImage: xs_size_memo ? `url(${CharlieHalf})` : `url(${EmpireOriginal})`}} 
    >
      <Container maxWidth="md" className={classes.container_1} style={{ height: windowHeight}}>
        {
          //MainScreenMemo
        }
        <Grid container>
          <Grid item xs={12} 
                className={classes.top_half} 
                style={{ height: 0.7 * windowHeight, 
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundImage: `url(${CharBckg})`}}>
            {/* <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.menuGrid_1XX}
            >
              <Grid item xs={12}>
                <p className={classes.ch}>CH</p>
              </Grid>
              <Grid item xs={12}>
              <p className={classes.ar}>AR</p>
              </Grid>
              <Grid item xs={12}>
              <p className={classes.lie}>LIE</p>
              </Grid>
            </Grid> */}
          </Grid>
            <Grid item className={classes.side_logo}>
              <img src={CharlieHalf} className={classes.side_logo_img} />
            </Grid>
          {/* <Grid item xs={12} sm={6} className={classes.quarter_grid}>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
              className={classes.landingTextContainer}
            >
              <Grid item className={classes.landingTextItem}>
                <Animated
                  animationIn="fadeIn"
                  animationOut="fadeOut"
                  animationInDelay={200}
                  animationInDuration={1000}
                  isVisible={true}
                >
                  <Typography
                    variant="subtitle1"
                    component="h6"
                    className={classes.text}
                  >
                    “Have you ever seen house on the beach or flat in a
                    skyscraper and wonder how would it be to enjoy a drink in
                    there?”
                  </Typography>
                </Animated>
              </Grid>
            </Grid>
          </Grid> */}

          <Grid item xs={12} sm={6} className={classes.quarter_grid_dark } style={{ height: 0.3 * windowHeight}}>
            
              <Grid
                container
                justify="left"
                direction="row"
                style={{ height: "100%"}}
              >
                <Grid item xs={8}>
                  <Grid container className={classes.main_buttons_container}>
                    <Grid item xs={12} className={classes.link_main_play}>
                      <Grid container style={{ height: "100%"}} alignItems="center">
                        <Grid item xs={12}>
                      <Fab variant="extended" className={classes.fab_pink} onClick={redirectPlay}>
                        PLAY
                        <PlayArrowIcon className={classes.extendedIcon} />
                      </Fab>
                      </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.link_main_play}>
                      <Grid container style={{ height: "100%"}} alignItems="center">
                        <Grid item xs={12}>
                            <Fab variant="extended" className={classes.fab_grey} onClick={redirectCreate}>
                              CREATE
                            <AddIcon className={classes.extendedIcon} />
                          </Fab>
                        </Grid>
                      </Grid>
                    </Grid>
                    
                  </Grid>
                </Grid>

                <Grid item xs={4} className={classes.arrowWrapItem}>
                  <Grid container justify="flex-end" alignItems='flex-end' className={classes.arrowContainer}>
                    <Grid item>
                      {/* <ArrowDownwardIcon color='secondary' className={classes.arrowIcon}/> */}
                      <FilterListIcon color='secondary' className={classes.arrowIcon} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container_1: {
    backgroundColor: "#F7F7F7", // '#D9D8D8',
    padding: 0,
    overflow: 'hidden',
    width: '100vw'
  },
  top_half: {
    // height: 443, // `45vh` `${0.5*window.innerHeight}px`
    color: '#C6C5C5', //'#696868'
    position: "relative",
    left: -21,
    paddingTop: 37,
    paddingLeft: 0,
    paddingRight: 20,
    fontSize: 180,
    fontWeight: 800,
    letterSpacing: 9,
    lineHeight: '75%',
  },
  ch: {
    // fontSize: 222,
    // fontWeight: 800,
    margin: 0,
    // letterSpacing: "-2px",
    //lineHeight: '70%',
  },
  ar: {
    // fontSize: 222,
    // fontWeight: 800,
    position: "relative",
    margin: 0,
    letterSpacing: -5,
    left: -20,
    // lineHeight: '80%',
  },
  lie: {
    // fontSize: 222,
    // fontWeight: 800,
    margin: 0,
    // letterSpacing: -2,
    // lineHeight: '80%',
  },
  side_logo: {
    height: 0,
    position: "relative",
    top: -370,
    left: "100vw"
  },
  side_logo_img: {
    height: 300,
    position: "relative",
    left: -149
  },
  // quarter_grid: {
  //   // height: 140, //  20vh'`${0.25*window.innerHeight}px`
  //   color: 'black',
  //   // paddingTop: '5vh',
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   fontSize: 16
  // },
  landingTextContainer: {
    height: '100%'
  },
  landingTextItem: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  quarter_grid_dark: {
    // height: 150, // "35vh" `${0.25*window.innerHeight}px`
    color: 'black',
    fontSize: 16,
    backgroundColor: '#242323'
  },
  main_buttons_container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    height: "100%"
  },
  link_main_play: {
    marginBottom: 10,
  },
  fab_pink: {
    backgroundColor: '#E8045D',
    color: 'white',
    fontWeight: 700,
    fontSize: 20,
    letterSpacing: 8,
    width: '100%'
  },
  fab_grey: {
    backgroundColor: '#C4C3C3',
    fontSize: 20,
    width: '100%'
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
    color: "white"
  },
  arrowWrapItem: {
    paddingRight: 20,
  },
  arrowContainer: {
    height: '100%'
  },
  arrowIcon: {
    height: 50,
    width: 50,
    color: 'grey'
  }
}));


import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import {Animated} from "react-animated-css";


import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import "../../Pages/Menu.css";

import FlippingLogo from "../../Atoms/Flipping-logo/logo";
import EmpireOriginal from "../../Images/empire.jpg";
import Skyline from "../../Images/skyline.png";

export default function Screen1(){
    const classes = useStyles();

    return (
        <div
                    className="section s1"
                    style={{ backgroundImage: `url(${EmpireOriginal})` }}
                >
                    <Container maxWidth="md" className={classes.container_1}>
                    {
                        //MainScreenMemo
                    }
                    <Grid container>
                        <Grid item xs={6} sm={6} className={classes.quarter_grid}>
                          
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            className={classes.menuGrid_1}
                        >
                           
                            <Grid item className={classes.main_nadpis_row}>
                              <Animated animationIn="bounceInLeft" animationOut="fadeOut" animationInDelay={500} animationInDuration={1000} isVisible={true}>
                            <Typography variant="h5" className={classes.charlie}>
                                CHARLIE
                            </Typography></Animated>
                            </Grid>
                            <Grid item className={classes.main_nadpis_row}>
                            <Animated animationIn="bounceInLeft" animationOut="fadeOut" animationInDelay={500} animationInDuration={1000} isVisible={true}>
                            <Typography variant="h5" className={classes.party}>
                                PARTY
                            </Typography>
                            </Animated>
                            </Grid>
                            
                        </Grid>
                        
                        </Grid>

                        <Grid item xs={6} sm={6} className={classes.quarter_grid}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            className={classes.menuGrid_2}
                        >
                            <Grid item className={classes.menuGrid_2_item}>
                            <Animated animationIn="bounceInRight" animationOut="fadeOut" animationInDelay={700} animationInDuration={1000} isVisible={true}>
                            <FlippingLogo height={100} width={100} />
                            </Animated>
                            </Grid>
                            
                        </Grid>
                        </Grid>

                        <Grid item xs={12} sm={0} className={classes.quarter_grid_empty}>

                        </Grid>

                        <Grid item xs={12} sm={6} className={classes.quarter_grid}> 
                        <Animated animationIn="bounceInLeft" animationOut="fadeOut" animationInDelay={2000} animationInDuration={1000} isVisible={true}>
                        <Grid
                            container
                            justify="center"
                            direction="row"
                            className={classes.menuGrid_3}
                        >
                          
                            <NavLink to={`/map`}  className={classes.link_main_pink}>
                            <Grid item>
                                <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                >
                                MAP
                                </Button>
                            </Grid>
                            </NavLink >
                            <NavLink to={`/create`} className={classes.link_main_pink}>
                            <Grid item>
                                <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                >
                                CREATE
                                </Button>
                            </Grid>
                            </NavLink>
                        </Grid>
                        </Animated>
                        </Grid>

                        <Grid item xs={12} sm={6} className={classes.quarter_grid}>
                        <Grid
                            container
                            justify="center"
                            direction="row"
                            className={classes.menuGrid_4}
                        >
                            <Grid item>
                            <Animated animationIn="bounceInRight" animationOut="fadeOut" animationInDelay={1800} animationInDuration={1000} isVisible={true}>
                            <Typography
                                variant="subtitle1"
                                component="h6"
                                className={classes.text}
                            >
                                “Have you ever seen house on the beach or flat in a
                                skyscraper and wonder how would it be to enjoy a
                                drink in there?”
                            </Typography>
                            </ Animated>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    </Container>
                </div>
    )

}

const useStyles = makeStyles(theme => ({
    container_1: {
      height: "100vh",
      color: "black",
      //background: "rgba(25,25,25,0.3)"
      backgroundImage: `url(${Skyline})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center bottom",
      [theme.breakpoints.up("sm")]: {
        background: "none"
      },
      [theme.breakpoints.down("xs")]: {
        paddingTop: "12vh",
      }
    },
    quarter_grid: {
      height: "50vh",
      [theme.breakpoints.down("xs")]: {
        height: "22vh",
      }
    },
    quarter_grid_empty: {
        height: 0,
        [theme.breakpoints.down("xs")]: {
          height: "20vh",
        }
      },
    menuGrid_1: {
      height: "100%",
    },
    menuGrid_2: {
        height: "100%",
    },
    menuGrid_3: {
        [theme.breakpoints.down("xs")]: {
            paddingTop: "0vh"
          }
    },
    menuGrid_4: {
      [theme.breakpoints.down("xs")]: {
        position: "relative",
        top: -30
      }
    },
    main_nadpis_row: {
        marginRight: "30%",
        [theme.breakpoints.down("xs")]: {
            //marginRight: "50%",
          }
    },
    party: {
      textAlign: "center",
      fontWeight: 300,
      letterSpacing: 8,
      color: "black",
      padding: "10px"
    },
    charlie: {
      textAlign: "center",
      fontWeight: 800,
      padding: "10px",
      color: "black"
    },
    link_main_pink: {
        width: "100%",
        marginRight: "30%",
        [theme.breakpoints.down("xs")]: {
            width: "30%",
            margin: 10,
          }
    },
    menuGrid_2_item: {
        marginLeft: "30%",
        [theme.breakpoints.down("xs")]: {
            marginLeft: 0,
          }
    },
    button: {
      width: "100%",
      marginTop: 10,
      fontWeight: "700 !important"
    },
    text: {
      color: "black",
      fontWeight: 400,
      marginLeft: "30%",
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
      }
    },



  }));
import React, { useState, useReducer, useEffect, useContext } from "react";

import clsx from "clsx";

import { withRouter, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Backdrop from '@material-ui/core/Backdrop';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AllOutIcon from '@material-ui/icons/AllOut';
import DateRangeIcon from '@material-ui/icons/DateRange';

import CloseIcon from "@material-ui/icons/Close";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CircularProgress from '@material-ui/core/CircularProgress';

import { UserContext } from "../../userContext";

import SliderCustom from "../../Atoms/SliderCustom";
import { useBackdrop } from "../../Hooks/useBackdrop";

const SettingsPanel = ({getPlayEventsMutation, numItems, playFilter, setPlayFilter, loading}) => {
  const classes = useStyles();
  let history = useHistory();
  const { context, setContext } = useContext(UserContext);
  const [workingValue, setWorkingValue] = useState({radius: context.radius, days: context.days});
  const [close, setClose] = useState(false);
  const [checked, setChecked] = useState(false);
  const [filterOn, setFilterOn] = useState(true);
  // const [playFilter, setPlayFilter] = useState({
  //   days: 2,
  //   radius: 20,
  // });

  useEffect(() => {
    !filterOn && getPlayEventsMutation({variables:{
        plusDays: 1000,
        lng: context.geolocationObj ? context.geolocationObj.lng : null,
        lat: context.geolocationObj ? context.geolocationObj.lat : null,
        radius: 99999, // playFilter.radius,
        shownEvents: []
    }})

    filterOn && getPlayEventsMutation({variables:{
        plusDays: context.days,
        lng: context.geolocationObj ? context.geolocationObj.lng : null,
        lat: context.geolocationObj ? context.geolocationObj.lat : null,
        radius: context.radius, // playFilter.radius,
        shownEvents: context.shownEvents
    }})
  }, [filterOn]);

  const handleChange = (e) => {
    e.stopPropagation();
    setChecked(prev => !prev);
  };

  const handleFilterOn = (e) => {
    e.stopPropagation();
    setFilterOn(prev => !prev);
  };

  const handleChangeRadius = (e, newValue) => {
    console.log("Handle Change rad", newValue )
    e.preventDefault()
    setContext(prev => {return {...prev,shownEvents: [], playEventsCount: null, radius: newValue}});
    // setPlayFilter(prev => {return {...prev,radius: newValue}});
  };

  const handleChangeDays = (e, newValue) => {
    console.log("Handle Change Days", newValue)
    e.preventDefault()
    setContext(prev => {return {...prev,shownEvents: [], playEventsCount: null, days: newValue}});
    // setPlayFilter(prev => {return {...prev,days: newValue}});
  };

  const handleChangeWorkingValue = (e, target, newValue) => {
    e.preventDefault()
    setWorkingValue(prev => {return {...prev, [target]: newValue}});
  };

  const closeBackdrop = () => {
    setChecked(false)
  };

  return (
    <div className={classes.eggContainerWrap}>

      <Backdrop className={classes.backdrop} 
                open={checked} 
                onClick={closeBackdrop} 
                className={classes.backdropMain}>
        <FiberManualRecordIcon color="inherit" style={{height: 60, width: 60}} />
      </Backdrop>

      <Container
          maxWidth="xs"
          className={classes.playContainer}
          style={{padding: 0}}
          onClick={(e) => {e.preventDefault()}}
        >
      <Grid container className={clsx(classes.eggContainerTop, checked && classes.solidColor)}>
        <Grid item xs={10}>
            <Grid container onClick={handleChange}>

                <Grid item xs={5} >
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <Chip icon={<AllOutIcon style={{height: 20, width: 20,}} />} 
                            label={`+ ${context.radius} km`} 
                            variant="outlined" 
                            color="secondary" 
                            onClick={() => console.log("Yess")}
                            className={clsx(classes.anyChip, !filterOn && classes.lightGrey)} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                        <Chip icon={<DateRangeIcon style={{height: 20, width: 20, color: !filterOn ? '#D1D0D0' : "#59F0EA"}} />} // '#D1D0D0'
                              label={`+ ${context.days} days`} 
                              variant="outlined" 
                              
                              className={clsx(classes.anyChip, classes.lightBlue, !filterOn && classes.lightGrey)} />
                    </Grid>
                  </Grid>
                </Grid>            
                <Grid item xs={2}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                        <Chip label={!loading ? `${context.shownEvents.length + 1}/${numItems}` : null} 
                              icon={loading && <CircularProgress style={{height: 20, width: 20, color: 'white', left: 6, position: "relative"}} />}
                              variant="default" 
                              color="secondary"
                              className={classes.anyChip} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item  xs={12}>
                
                <Collapse in={checked}>
                  <Grid container alignItems="center" className={classes.collapseGrid}>
                      <Grid item xs={2}>
                          <Typography id="range-slider" color="secondary" gutterBottom className={clsx(classes.textSize, !filterOn && classes.lightGrey)}>
                              0 km
                          </Typography>
                      </Grid>
                      <Grid item xs={8}>
                          
                          <Slider
                              // defaultValue={playFilter.radius}
                              value={workingValue.radius}
                              onChange={(e, value) => handleChangeWorkingValue(e, "radius", value)}
                              step={5}
                              min={5}
                              max={50}
                              onChangeCommitted={(e_, value) => {
                                handleChangeRadius(e_ , value)
                              } 
                            }
                            style={{color: filterOn ? '#E8045D' : '#D1D0D0'}}
                              // valueLabelDisplay="auto"
                              // aria-labelledby="range-slider"
                              // getAriaValueText={valuetext}
                          /> 
                      </Grid>
                      <Grid item xs={2}>
                          <Typography id="range-slider" color="secondary" gutterBottom className={clsx(classes.textSize, !filterOn && classes.lightGrey)}>
                              {50} km
                          </Typography>
                      </Grid>

                      <Grid item xs={2} className={classes.lightBlue}>
                          <Typography id="range-slider" gutterBottom className={classes.textSize, !filterOn && classes.lightGrey}>
                              Today
                          </Typography>
                      </Grid>
                      <Grid item xs={8}>
                          
                            <Slider valueLabelDisplay="auto" 
                                  aria-label="none" 
                                  value={workingValue.days} 
                                  onChange={(e, value) => handleChangeWorkingValue(e, "days", value)}
                                  step={1}
                                  min={0}
                                  max={7}
                                  onChangeCommitted={(e_, value) => {
                                    console.log("Commited Days")
                                    handleChangeDays(e_ , value)
                                  } 
                                }
                                  style={{color: filterOn ? "#59F0EA" : '#D1D0D0'}}
                            /> 
                      </Grid>
                      <Grid item xs={2} className={classes.lightBlue}>
                          <Typography id="range-slider" gutterBottom className={classes.textSize, !filterOn && classes.lightGrey}>
                            + {context.days} days
                          </Typography>
                      </Grid>


                  </Grid>
                </Collapse>  
                <Grid item xs={12} className={classes.turnOffItem}>
                      <FormControlLabel control={<Switch  checked={filterOn} 
                                              onChange={handleFilterOn}
                                              onClick={(e) => {e.stopPropagation()}}
                                              value="checkedA"
                                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                                      />} 
                            label={`filter ${filterOn ? "ON" : "OFF"}`} />
                      </Grid>   
                
                </Grid>
                {/* <Grid item xs={2} className={classes.arrowGrid} style={{display: "none"}} >
                    <KeyboardArrowDownIcon 
                            color="secondary" 
                            fontSize="large" 
                            className={clsx(classes.arrowOpener, checked && classes.arrowUp)} 
                            onClick={handleChange} />
                </Grid> */}
            </Grid>

            </Grid>
        <Grid item 
                xs={2} 
                id="play_close"
                className={classes.closeCrossGrid}
                >
          <Grid container justify="center">
              <Grid item>
                <CloseIcon 
                    className={clsx(classes.closeCross, close && classes.whiteBordered)} 
                    onClick={() => {
                    setClose(true)
                    setContext(prev => {return {...prev, shownEvents: []}});
                    setTimeout(() => {
                      history.goBack()
                    }, 100)
                    }}
                    />
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Container>
    </div>
  );
};


const useStyles = makeStyles(theme => ({
  eggContainerWrap: {
    position: "fixed",
    width: '100%',
    height: "0px", 
    top: 0,
    zIndex: 100,
    touchAction: "none"
  },
  eggContainerTop: {
    // height: "36px", //"16"
    width: '100%',
    zIndex: 100,
    paddingTop: "12px",
    paddingBottom: "4px",
    paddingLeft: "5px",
    //top: '30px',
    position: "relative",
    backgroundColor: "rgba(0,0,0,1)",
  },
  backdropMain: {
    zIndex: 10
  },
  solidColor:{
    backgroundColor: "rgba(0,0,0,1)",
  },
  itm:{
    padding: 0,
    height: '100%', 
    width: '100%', 
  },
  egg:{
    width: '90%',
    height: '8px',
    backgroundColor: "grey",
    margin: '5%',
    marginTop: '4px',
    marginBottom: '4px',
    borderRadius: "4px"
  },
  closeCrossGrid: {
    color: "white",
  },
  closeCross: {
    fontSize: 30,
  },
  whiteBordered: {
    border: "1px solid white",
    borderRadius: 10
  },
  collapseGrid:{
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  arrowGrid: {
    height: 0,
  },
  arrowOpener: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    position: "relative",
    top: -5
  },
  arrowUp: {
    transform: "rotate(0.5turn)",
  },
  anyChip: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    fontWeight: 400,
    fontSize: 16
  },
  textSize: {
    fontWeight: 400,
    fontSize: 16
  },
  lightBlue: {
    borderColor: '#59F0EA', 
    color: '#59F0EA'
  },
  lightGrey: {
    color: '#D1D0D0',
    borderColor: '#D1D0D0',
  },

  turnOffItem: {
    // backgroundColor: "lightGrey"
    height: 0
  }
}));

export default withRouter(SettingsPanel)

import React, { useState, useReducer, useEffect } from "react";

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

import CloseIcon from "@material-ui/icons/Close";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CircularProgress from '@material-ui/core/CircularProgress';

import SliderCustom from "../../Atoms/SliderCustom";
import { useBackdrop } from "../../Hooks/useBackdrop";

const SettingsPanel = ({state, getPlayEventsMutation, numItems}) => {
  const classes = useStyles();
  let history = useHistory();
  const [close, setClose] = useState(false);
  const [checked, setChecked] = useState(false);
  const [radius, setRadius] = useState(20);
  const [days, setDays] = useState(2);


  const handleChange = (e) => {
    e.stopPropagation();
    setChecked(prev => !prev);
  };

  const handleChangeRadius = (event, newValue) => {
    setRadius(newValue);
  };

  const handleChangeDays = (event, newValue) => {
    setDays(newValue);
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
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container
          maxWidth="xs"
          className={classes.playContainer}
          style={{padding: 0}}
        >
      <Grid container className={clsx(classes.eggContainerTop, checked && classes.solidColor)}>
        <Grid item xs={10}>
            <Grid container onClick={handleChange}>

                <Grid item xs={5} >
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <Chip label={`Radius: ${radius} km`} variant="outlined" color="secondary" className={classes.anyChip} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                        <Chip label={`+ ${days} days`} variant="outlined" color="primary" className={classes.anyChip} />
                    </Grid>
                  </Grid>
                </Grid>            
                <Grid item xs={2}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                        <Chip label={`${ 1}/${numItems}`} variant="outlined" color="secondary" className={classes.anyChip} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item  xs={12}>
                
                <Collapse in={checked}>
                  <Grid container alignItems="center" className={classes.collapseGrid}>
                      <Grid item xs={2}>
                          <Typography id="range-slider" variant="subtitle2" color="secondary" gutterBottom>
                              0 km
                          </Typography>
                      </Grid>
                      <Grid item xs={8}>
                          
                          <SliderCustom
                              value={radius}
                              onChange={handleChangeRadius}
                              step={5}
                              min={5}
                              max={50}
                              color={"secondary"}
                              onChangeCommitted={getPlayEventsMutation}
                              // valueLabelDisplay="auto"
                              // aria-labelledby="range-slider"
                              // getAriaValueText={valuetext}
                          /> 
                      </Grid>
                      <Grid item xs={2}>
                          <Typography id="range-slider" variant="subtitle2" color="secondary" gutterBottom>
                              {radius} km
                          </Typography>
                      </Grid>

                      <Grid item xs={2}>
                          <Typography id="range-slider" variant="subtitle2" color="secondary" gutterBottom>
                              Today
                          </Typography>
                      </Grid>
                      <Grid item xs={8}>
                          
                          <SliderCustom
                                  value={days}
                                  onChange={handleChangeDays}
                                  step={1}
                                  min={0}
                                  max={7}
                                  color={"primary"}
                                  onChangeCommitted={() => {console.log("getPlayEventsMutation")}}
                              // valueLabelDisplay="auto"
                              // aria-labelledby="range-slider"
                              // getAriaValueText={valuetext}
                          />  
                      </Grid>
                      <Grid item xs={2}>
                          <Typography id="range-slider" variant="subtitle2" color="secondary" gutterBottom>
                            + {days} days
                          </Typography>
                      </Grid>
                  </Grid>
                </Collapse>     
                
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
  }
}));

export default withRouter(SettingsPanel)

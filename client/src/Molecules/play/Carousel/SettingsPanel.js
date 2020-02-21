import React, { useState, useReducer } from "react";

import clsx from "clsx";

import { withRouter, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import CloseIcon from "@material-ui/icons/Close";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import SliderCustom from "../../../Atoms/SliderCustom";

const SettingsPanel = ({state, getPlayEventsMutation}) => {
  const classes = useStyles();
  let history = useHistory();
  const [close, setClose] = useState(false);
  const [checked, setChecked] = useState(false);
  const [radius, setRadius] = useState(20);
  const [days, setDays] = useState(2);


  const handleChange = () => {
    setChecked(prev => !prev);
  };

  const handleChangeRadius = (event, newValue) => {
    setRadius(newValue);
  };

  const handleChangeDays = (event, newValue) => {
    setDays(newValue);
  };

  return (
    <div className={classes.eggContainerWrap}>
      <Grid container className={clsx(classes.eggContainerTop, checked && classes.solidColor)}>
        <Grid item xs={10}>
            <Grid container>
                <Grid item 
                    xs={4} 
                    className={classes.itm}
                    >
                <div className={clsx(classes.egg, state.pos === 0 && classes.white)}></div>
                </Grid>
                <Grid item 
                    xs={4} 
                    className={classes.itm}
                    >
                <div className={clsx(classes.egg, state.pos === 1 && classes.white)}></div>
                </Grid>
                <Grid item 
                    xs={4} 
                    className={classes.itm}
                    >
                <div className={clsx(classes.egg, state.pos === 2 && classes.white)}></div>
                </Grid>
                <Grid item 
                    xs={2} 
                    >
                    {/* <FormControlLabel
                        control={<Switch 
                            checked={checked} onChange={handleChange} 
                            />}
                        label=""
                    /> */}
                </Grid>
                <Grid item 
                    xs={4} 
                    >
                    <Chip label={`Radius: ${radius} km`} variant="outlined" color="secondary" />
                </Grid>
                <Grid item xs={4}  >
                     <Chip label={`+ ${days} days`} variant="outlined" color="primary" />
                </Grid>            
                <Grid item xs={2}>
                    <Chip label={`1/7 or O`} variant="outlined" color="secondary" />
                </Grid>
                <Grid item  xs={12}>
                
                <Collapse in={checked}>
                <Grid container alignItems="center">
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
                <Grid item xs={2} className={classes.arrowGrid} >
                    <KeyboardArrowDownIcon 
                            color="secondary" 
                            fontSize="large" 
                            className={clsx(classes.arrowOpener, checked && classes.arrowUp)} 
                            onClick={handleChange} />
                </Grid>
            </Grid>

            </Grid>
        <Grid item 
                xs={2} 
                id="play_close"
                className={classes.closeCross}
                >
                <CloseIcon 
                    fontSize="large" 
                    className={clsx(close && classes.whiteBordered)} 
                    onClick={() => {
                    setClose(true)
                    history.goBack()
                    }}
                    />
        </Grid>
      </Grid>
    </div>
  );
};


const useStyles = makeStyles(theme => ({
  eggContainerWrap: {
    width: '100%',
    height: "0px", 
    zIndex: 100,
    touchAction: "none"
  },
  eggContainerTop: {
    // height: "36px", //"16"
    width: '100%',
    zIndex: 100,
    paddingTop: "2px",
    paddingBottom: "2px",
    //top: '30px',
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.7)",
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
  white:{
    backgroundColor: "white",
  },
  red:{
    backgroundColor: "red",
  },
  blue:{
    backgroundColor: "blue",

  },
  closeCross: {
    color: "white",
  },
  whiteBordered: {
    border: "1px solid white",
    borderRadius: 10
  },

  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  arrowGrid: {
    height: 0,
  },
  arrowOpener: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    position: "relative",
    top: -10
  },
  arrowUp: {
    transform: "rotate(0.5turn)",
  }
}));

export default withRouter(SettingsPanel)
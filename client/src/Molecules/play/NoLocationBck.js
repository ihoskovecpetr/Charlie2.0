import React, {useContext} from "react"
import Grid from "@material-ui/core/Grid";
import Backdrop from '@material-ui/core/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import VpnLockIcon from '@material-ui/icons/VpnLock';

import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "../../userContext";

const NoLocationBck = ({event}) => {
    const classes = useStyles();
    const { context, setContext } = useContext(UserContext);

    const setCityLocation = (value) => {
      var geolocationOfCity = {}
      switch(value) {
        case 'Praha':
          geolocationOfCity = {lng: 14.42076 , lat: 50.08804}
          break;
        case 'Brno':
          geolocationOfCity = {lng: 14.42076 , lat: 50.08804}
          break;
        case 'Ostrava':
          geolocationOfCity = {lng: 14.42076 , lat: 50.08804}
          break;
        default:
          // code block
      }
        setContext(prev => {
            return { ...prev, geolocationObj: geolocationOfCity};
          });
    }  

    return(
        <Backdrop
                open={true} 
                onClick={() => {}} 
                className={classes.backdropMain}>
          <Grid container justify='center' spacing={5} className={classes.noLocCont}>
            <Grid item xs={12} >
              <Grid container justify='center' spacing={5} className={classes.noLocGrid}>
                <Grid item >
                  <VpnLockIcon color="inherit" fontSize="large" />
                </Grid>
              </Grid>
            </Grid>
           
            <Grid item  xs={12}> 
              <Grid container justify='center' spacing={5} className={classes.noLocGrid}>
                <Grid item>
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Choose location</InputLabel>
                  <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      // open={open}
                      // onClose={handleClose}
                      // onOpen={handleOpen}
                      // value={age}
                      onChange={setCityLocation}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='Praha'>Praha</MenuItem>
                      <MenuItem value='Brno'>Brno</MenuItem>
                      <MenuItem value='Ostrava'>Ostrava</MenuItem>
                    </Select>
                    </FormControl>
                  </Grid>
                </Grid>
            </Grid>
        </Grid>
      </Backdrop>
    )
}


const useStyles = makeStyles(theme => ({
    backdropMain: {
        zIndex: 100
      },
      noLocGrid: {
        backgroundColor: "lightgrey",
      },
      noLocCont: {
        width: '80%'
      },
      formControl: {
        minWidth: 200,
      },
  }));

export default NoLocationBck
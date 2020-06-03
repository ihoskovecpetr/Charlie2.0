import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Spinner from "../Atoms/Spinner";

export default function MapSettingsPanel(props) {
  const classes = useStyles();
  let den = new Date(props.dateState);

  const plusDay = () => {
    den.setDate(den.getDate() + 1);
    let isoDen = den.toISOString().split("T")[0];
    props.clearMarkers();
    props.handleScrollLocTime(isoDen);

  };

  const minusDay = () => {
    den.setDate(den.getDate() - 1);
    let isoDen = den.toISOString().split("T")[0];
    console.log("Min: ", isoDen)
    props.clearMarkers();
    props.handleScrollLocTime(isoDen);
  };

  const handleChangeDate = (e) => {
    console.log("To", e.target.value)
    props.handleScrollLocTime(e.target.value);


  }

  return (
    <>
      <Grid
        container
        alignItems="flex-end"
        alignContent="flex-end"
        justify="flex-end"
        className={classes.settingsPanel}
      >
        <Grid item>
          <Grid
            container
            alignItems="center"
            alignContent="flex-end"
            justify="flex-end"
          >
            <Grid item>
              {props.loading && <Spinner height={40} width={40} />}
            </Grid>
            <Grid item>
              <IconButton 
                disabled={props.loading ? true : false} 
                onClick={() => {
                  minusDay();
                }}>
                  <ArrowBackIosIcon 
                    fontSize="large"
                    color={props.loading ? '' : "secondary"} />
              </IconButton>
            </Grid>

            <Grid item>
              <TextField
                id="datetime-local"
                //label="Choose day"
                variant="outlined"
                type="date"
                color="secondary"
                margin="dense"
                value={props.dateState}
                onChange={handleChangeDate}
                className={classes.textField}
                InputProps={{
                  className: classes.inputTexFld
                }}
                InputLabelProps={{
                  shrink: true,
                  color: "white"
                }}
              />
            </Grid>
            <Grid item>
              <IconButton
                disabled={props.loading ? true : false}
                // color="secondary"
                onClick={() => {
                  plusDay();
                }}
              >
                <ArrowForwardIosIcon
                  fontSize="large"
                  color={props.loading ? '' : "secondary"}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  settingsPanel: {
    position: "absolute",
    top: 0,
    height: 120,
    width: "100%",
    background: "rgba(0,0,0,0.2)",
    zIndex: 10
  },
  textField: {
    margin: 0,
    color: 'white',
    backgroundColor: 'white',
    borderRadius: 5
  },
  dateInput: {},
  inputTexFld: {
    color: "black",
    border: "1px solid white",
    fontWeight: 600
  }
}));

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import Spinner from "../Atoms/Spinner";

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
    margin: 0
  },
  dateInput: {},
  inputTexFld: {
    color: "white",
    border: "1px solid white",
    fontWeight: 600
  }
}));

export default function MapSettingsPanel(props) {
  const classes = useStyles();
  console.log("props.dateState: ", props.dateState);
  let den = new Date(props.dateState);

  const plusDay = () => {
    den.setDate(den.getDate() + 1);
    console.log("++ den : ", den);
    let isoDen = den.toISOString().split("T")[0];
    props.clearMarkers();
    props.handleScrollLocTime(isoDen);
    // props.setWorkDate(prev => {
    //   return { ...prev, date: isoDen };
    // });
  };

  const minusDay = () => {
    den.setDate(den.getDate() - 1);
    console.log("-- den : ", den);
    let isoDen = den.toISOString().split("T")[0];
    props.clearMarkers();
    props.handleScrollLocTime(isoDen);
  };

  //console.log("Loading...", props.loading);

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
              <IconButton disabled={props.loading ? true : false}>
                <RemoveIcon
                  fontSize="large"
                  color={props.loading ? "disabled" : "secondary"}
                  onClick={() => {
                    console.log("MINUS day");
                    minusDay();
                  }}
                />
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
                onClick={() => {
                  plusDay();
                }}
              >
                <AddIcon
                  fontSize="large"
                  color={props.loading ? "disabled" : "secondary"}
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

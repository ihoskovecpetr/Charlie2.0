import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { displayDate } from "../Services/transform-services";

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
  let den = new Date(props.dateState);

  const plusDay = () => {
    den.setDate(den.getDate() + 1);
    let isoDen = den.toISOString().split("T")[0];
    props.setWorkingPose({ date: isoDen });
  };

  const minusDay = () => {
    den.setDate(den.getDate() - 1);
    let isoDen = den.toISOString().split("T")[0];
    props.setWorkingPose({ date: isoDen });
  };

  console.log("Loading...", props.loading);

  return (
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
          <Grid item>{props.loading && <Spinner height={40} width={40} />}</Grid>
          <Grid item>
            <IconButton disabled={props.loading ? true : false} onClick={() => {
              minusDay();
            }}>
              <RemoveIcon
                fontSize="large"
                color={props.loading ? "disabled" : "secondary"}

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
            <IconButton disabled={props.loading ? true : false} onClick={() => {
              plusDay();
            }}>
              <AddIcon
                fontSize="large"
                color={props.loading ? "disabled" : "secondary"}

              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

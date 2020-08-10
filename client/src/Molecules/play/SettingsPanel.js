import React, { useState, useReducer, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Backdrop from "@material-ui/core/Backdrop";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AllOutIcon from "@material-ui/icons/AllOut";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

import clsx from "clsx";
import { withRouter, useHistory } from "react-router-dom";

import { UserContext } from "src/Contexts/userContext";
import { IconButton } from "@material-ui/core";

const SettingsPanel = ({ loading }) => {
  const classes = useStyles();
  let history = useHistory();
  const { context, setContext } = useContext(UserContext);
  const [workingValue, setWorkingValue] = useState({
    radius: context.playFilterObj.radius,
    days: context.playFilterObj.plusDays,
  });
  // const [close, setClose] = useState(false);
  const [checked, setChecked] = useState(context._id ? true : false); // openning of settings panel

  useEffect(() => {
    console.log("Setitngs panel context: ", context);
  });

  const handleChange = (e) => {
    e.stopPropagation();
    setChecked((prev) => !prev);
  };

  const handleFilterOnOff = (e) => {
    e.stopPropagation();
    console.log("Filter ON,Off: ", e.target.checked);
    setContext((prev) => {
      return {
        ...prev,
        playFilterObj: {
          ...prev.playFilterObj,
          filterOn: !context.playFilterObj.filterOn,
          shownEvents: [],
        },
      };
    });
  };

  const handleChangeRadius = (e, newValue) => {
    e.preventDefault();
    setContext((prev) => {
      return {
        ...prev,
        playFilterObj: {
          ...prev.playFilterObj,
          shownEvents: [],
          playEventsCount: null,
          radius: newValue,
        },
      };
    });
    // setPlayFilter(prev => {return {...prev,radius: newValue}});
  };

  const handleChangeDays = (e, newValue) => {
    e.preventDefault();
    setContext((prev) => {
      return {
        ...prev,
        playFilterObj: {
          ...prev.playFilterObj,
          shownEvents: [],
          playEventsCount: null,
          plusDays: newValue,
        },
      };
    });
    // setPlayFilter(prev => {return {...prev,days: newValue}});
  };

  const handleChangeWorkingValue = (e, target, newValue) => {
    e.preventDefault();
    setWorkingValue((prev) => {
      return { ...prev, [target]: newValue };
    });
  };

  const closeBackdrop = () => {
    setChecked(false);
  };

  const setCityLocation = (value) => {
    switch (value.target.value) {
      case "Praha":
        setContextPlayLocation({ lng: 14.40076, lat: 50.08804 });

        break;
      case "Brno":
        setContextPlayLocation({
          lng: 16.608045854922107,
          lat: 49.17725732578309,
        });

        break;
      case "Ostrava":
        setContextPlayLocation({ lng: 18.27117, lat: 49.822941 });

        break;
      case "Current":
        setContextPlayLocation(context.geolocationObj);
        break;
      default:
    }
  };

  const setContextPlayLocation = (geolocObj) => {
    setContext((prev) => {
      return {
        ...prev,
        playFilterObj: {
          ...prev.playFilterObj,
          geolocationPlay: geolocObj,
          shownEvents: [],
        },
      };
    });
  };

  return (
    <div className={classes.eggContainerWrap}>
      <Backdrop
        open={checked}
        onClick={closeBackdrop}
        className={classes.backdropMain}
      >
        <FiberManualRecordIcon
          color="inherit"
          style={{ height: 60, width: 60 }}
        />
      </Backdrop>

      <Container
        maxWidth="sm"
        className={classes.playContainer}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <Grid container className={clsx(classes.eggContainerTop)}>
          <Grid item xs={10}>
            <Grid container onClick={handleChange}>
              <Grid item xs={5}>
                <Grid container justify="center">
                  <Grid item xs={12}>
                    <Chip
                      icon={
                        <AllOutIcon
                          className={classes.allOutIcon}
                          style={{
                            color: !context.playFilterObj.filterOn
                              ? "#D1D0D0"
                              : "#E8045D",
                          }}
                        />
                      }
                      label={`+ ${context.playFilterObj.radius} km`}
                      variant="outlined"
                      // color="secondary"
                      style={{
                        color: !context.playFilterObj.filterOn
                          ? "#D1D0D0"
                          : "#E8045D",
                      }}
                      onClick={() => console.log("Yess")}
                      className={clsx(
                        classes.anyChip,
                        !context.playFilterObj.filterOn && classes.lightGrey
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container justify="center">
                  <Grid item xs={12}>
                    <Chip
                      icon={
                        <DateRangeIcon
                          style={{
                            height: 20,
                            width: 20,
                            color: !context.playFilterObj.filterOn
                              ? "#D1D0D0"
                              : "#59F0EA",
                          }}
                        />
                      } // '#D1D0D0'
                      label={`+ ${context.playFilterObj.plusDays} days`}
                      variant="outlined"
                      className={clsx(
                        classes.anyChip,
                        classes.lightBlue,
                        !context.playFilterObj.filterOn && classes.lightGrey
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="flex-end">
                  <Grid item>
                    {/* <Chip label={!loading ? `${context.playFilterObj.shownEvents.length + 1}/${context.playFilterObj.playEventsCount}` : null} 
                              icon={loading && <CircularProgress style={{height: 20, width: 20, color: 'white', left: 0, position: "relative"}} />}
                              variant="default" 
                              color="secondary"
                              className={classes.anyChip} /> */}
                    {loading ? (
                      <CircularProgress
                        style={{
                          height: 20,
                          width: 20,
                          color: "white",
                          left: 0,
                          position: "relative",
                        }}
                      />
                    ) : (
                      <Typography variant="h6">{`${context.playFilterObj
                        .shownEvents.length + 1}/${
                        context.playFilterObj.playEventsCount
                      }`}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  defaultValue={"Current"}
                  classes={{
                    root: classes.select, // class name, e.g. `classes-nesting-root-x`
                    select:
                      !context.playFilterObj.filterOn && classes.selectText,
                    icon: classes.selectIcon, // class name, e.g. `classes-nesting-label-x`
                  }}
                  onChange={setCityLocation}
                >
                  <MenuItem value={"Current"}>
                    <em>
                      {context.curPositionAddress
                        ? context.curPositionAddress
                        : !context.declinedGeolocation
                        ? "Praha, loading..."
                        : ""}
                      {!context.curPositionAddress &&
                        context.declinedGeolocation &&
                        "No GPS info, default - Prague"}
                    </em>
                  </MenuItem>
                  <MenuItem value={"Praha"}>Prague</MenuItem>
                  <MenuItem value={"Brno"}>Brno</MenuItem>
                  <MenuItem value={"Ostrava"}>Ostrava</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Grid container justify="flex-end">
                  <Grid item>
                    {checked ? (
                      <VerticalAlignTopIcon
                        fontSize="large"
                        color="secondary"
                      />
                    ) : (
                      <VerticalAlignBottomIcon
                        fontSize="large"
                        color="secondary"
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Collapse in={checked}>
                  <Grid
                    container
                    alignItems="center"
                    className={classes.collapseGrid}
                  >
                    <Grid item xs={2}>
                      <Typography
                        id="range-slider"
                        color="secondary"
                        gutterBottom
                        className={clsx(
                          classes.textSize,
                          !context.playFilterObj.filterOn && classes.lightGrey
                        )}
                      >
                        0 km
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Slider
                        // defaultValue={playFilter.radius}
                        value={workingValue.radius}
                        onChange={(e, value) =>
                          handleChangeWorkingValue(e, "radius", value)
                        }
                        step={5}
                        min={5}
                        max={50}
                        disabled={!context.playFilterObj.filterOn}
                        onChangeCommitted={(e_, value) => {
                          handleChangeRadius(e_, value);
                        }}
                        style={{
                          color: context.playFilterObj.filterOn
                            ? "#E8045D"
                            : "#D1D0D0",
                        }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        id="range-slider"
                        color="secondary"
                        gutterBottom
                        className={clsx(
                          classes.textSize,
                          !context.playFilterObj.filterOn && classes.lightGrey
                        )}
                      >
                        {50} km
                      </Typography>
                    </Grid>

                    <Grid item xs={2} className={classes.lightBlue}>
                      <Typography
                        id="range-slider"
                        gutterBottom
                        className={
                          (classes.textSize,
                          !context.playFilterObj.filterOn && classes.lightGrey)
                        }
                      >
                        Today
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Slider
                        valueLabelDisplay="auto"
                        aria-label="none"
                        value={workingValue.days}
                        onChange={(e, value) =>
                          handleChangeWorkingValue(e, "days", value)
                        }
                        step={1}
                        min={0}
                        max={7}
                        disabled={!context.playFilterObj.filterOn}
                        onChangeCommitted={handleChangeDays}
                        style={{
                          color: context.playFilterObj.filterOn
                            ? "#59F0EA"
                            : "#D1D0D0",
                        }}
                      />
                    </Grid>
                    <Grid item xs={2} className={classes.lightBlue}>
                      <Typography
                        id="range-slider"
                        gutterBottom
                        className={
                          (classes.textSize,
                          !context.playFilterObj.filterOn && classes.lightGrey)
                        }
                      >
                        + {context.playFilterObj.plusDays} days
                      </Typography>
                    </Grid>
                  </Grid>
                </Collapse>
              </Grid>
              <Grid item xs={6} className={classes.turnOffItem}>
                <Grid container justify="flex-start">
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={context.playFilterObj.filterOn}
                          onChange={handleFilterOnOff}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          classes={{
                            track: classes.switchTrack,
                          }}
                          value="checkedA"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      }
                      label={`filter ${
                        context.playFilterObj.filterOn ? "ON" : "OFF"
                      }`}
                    />
                  </Grid>
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
          <Grid item xs={2} id="play_close" className={classes.closeCrossGrid}>
            <Grid container justify="center">
              <Grid item>
                <IconButton color="secondary">
                  <CloseIcon
                    className={clsx(
                      classes.closeCross
                      // close && classes.whiteBordered
                    )}
                    onClick={() => {
                      // setClose(true);
                      history.goBack();
                      setContext((prev) => {
                        return {
                          ...prev,
                          playFilterObj: {
                            ...prev.playFilterObj,
                            shownEvents: [],
                          },
                        };
                      });
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  eggContainerWrap: {
    position: "fixed",
    width: "100%",
    height: "0px",
    top: 0,
    left: 0,
    zIndex: 100,
    touchAction: "none",
  },
  playContainer: {
    padding: 0,
  },
  eggContainerTop: {
    // height: "36px", //"16"
    width: "100%",
    zIndex: 100,
    paddingTop: "12px",
    paddingBottom: "4px",
    paddingLeft: "5px",
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  backdropMain: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  switchTrack: {
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  // solidColor:{
  //   backgroundColor: "rgba(0,0,0,1)",
  // },
  itm: {
    padding: 0,
    height: "100%",
    width: "100%",
  },
  egg: {
    width: "90%",
    height: "8px",
    backgroundColor: "grey",
    margin: "5%",
    marginTop: "4px",
    marginBottom: "4px",
    borderRadius: "4px",
  },
  closeCrossGrid: {
    color: "white",
  },
  closeCross: {
    fontSize: 30,
  },
  whiteBordered: {
    border: "1px solid white",
    borderRadius: 10,
  },
  select: {
    color: "rgb(232, 4, 93)",
    borderColor: "white",
    borderRadius: 5,
    // backgroundColor: "white",
  },
  selectText: {
    color: "white",
  },
  selectIcon: {
    color: "white",
  },
  collapseGrid: {
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    display: "flex",
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
    top: -5,
  },
  arrowUp: {
    transform: "rotate(0.5turn)",
  },
  anyChip: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    fontWeight: 400,
    fontSize: 16,
  },
  textSize: {
    fontWeight: 400,
    fontSize: 16,
  },
  lightBlue: {
    // borderColor: '#59F0EA',
    color: "#59F0EA",
  },
  lightGrey: {
    color: "#D1D0D0",
    // borderColor: '#D1D0D0',
  },
  allOutIcon: {
    height: 20,
    width: 20,
    color: "#E8045D",
  },
  turnOffItem: {
    // backgroundColor: "lightGrey"
    height: 0,
  },
}));

export default withRouter(SettingsPanel);

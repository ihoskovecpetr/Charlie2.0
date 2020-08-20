import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import LinearProgress from "@material-ui/core/LinearProgress";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";

import clsx from "clsx";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

import { findEmpty } from "../Services/functions";
import { UserContext } from "../Contexts/userContext";

import Copyright from "../Atoms/copyright";
import Dropzone from "../Molecules/Dropzone";
import Spinner from "src/Atoms/Spinner";
import MapCreate from "../Molecules/MapCreate";
import LoginFirstButton from "../Atoms/LoginFirstButton";

import { useLogicPlusMinusValue } from "./Logic/Create/useLogicPlusMinusValue";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "CZK",
    label: "Kč",
  },
];

function CreateView({
  formValue,
  setFormValue,
  handleChangeBYO,
  handleChangeCurrency,
  handleDateChange,
  onSubmit,
  minusHour,
  plusHour,
  minusDay,
  plusDay,
  inputName,
  inputTime,
  inputBYO,
  inputDescription,
  inputMarker,
  dataOut,
  errorOut,
  customMapParam,
  setCustomMapParam,
  plusClickCapacity,
  setNewValueCapacity,
  minusClickDuration,
  setNewValueDuration,
  plusClickDuration,
  minusClickPrice,
  setNewValuePrice,
  plusClickPrice,
  minusClickCapacity,
  loading,
  FeErrors,
  capacity,
  duration,
  price,
  countOfFiles,
  setCountOfFiles,
  dialogOpen,
  handleDialogClose,
}) {
  const classes = useStyles();
  let history = useHistory();
  const { context } = useContext(UserContext);

  return (
    <div
      component="main"
      id="mainCreate"
      className={classes.profileWrap}
      // style={{ position: "absolute" }}
    >
      <CssBaseline />
      {dialogOpen && (
        <Dialog
          onClose={handleDialogClose}
          aria-labelledby="simple-dialog-title"
          open={true}
        >
          <DialogTitle id="simple-dialog-title">
            Party "{dataOut ? dataOut.name : "_"}" created successfully
          </DialogTitle>
          <Grid container spacing={1} className={classes.btnsDialogGridCont}>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      handleDialogClose();
                      history.push({
                        pathname: history.location.pathname,
                        search: `?event=${dataOut._id}`,
                      });
                    }}
                  >
                    OPEN "{dataOut ? dataOut.name : "_"}"
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      history.push(`/`);
                    }}
                  >
                    Go to main Page
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      )}
      <Container maxWidth="sm" className={classes.paper1}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.pinkBack}
        >
          <Grid item>
            <Typography variant="h5" className={classes.justDoIt}>
              JUST DO IT
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.now}>
              <b>NOW</b>
            </Typography>
          </Grid>

          <Grid container className={clsx(classes.formRow)}>
            <Grid item xs={12}>
              {context.success ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  inputRef={inputName}
                  placeholder="My Home Event"
                  name="name"
                  autoFocus
                  className={classes.inputName}
                />
              ) : (
                <LoginFirstButton />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm" className={classes.paper}>
        <form className={classes.form} noValidate>
          <InputLabel htmlFor="standard-adornment-amount">ADDRESS</InputLabel>
          <MapCreate
            customMapParam={customMapParam}
            setCustomMapParam={setCustomMapParam}
            inputMarker={inputMarker}
          />

          <InputLabel htmlFor="standard-adornment-amount">DATE</InputLabel>
          <Grid
            container
            alignItems="center"
            alignContent="flex-start"
            justify="flex-start"
            className={clsx(classes.settingsPanel, classes.formRow)}
          >
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <IconButton
                  color="secondary"
                  aria-label="open drawer"
                  edge="start"
                  onClick={minusDay}
                >
                  <ArrowBackIosIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container justify="center">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    format="dd/MM/yyyy"
                    value={formValue.startDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-start">
                <IconButton
                  color="secondary"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => {
                    plusDay();
                  }}
                >
                  <ArrowForwardIosIcon
                    //fontSize="large"
                    color="secondary"
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          {/*  +- Hours */}

          <InputLabel htmlFor="standard-adornment-amount">TIME</InputLabel>
          <Grid
            container
            alignItems="center"
            alignContent="flex-start"
            justify="flex-start"
            className={clsx(classes.settingsPanel, classes.formRow)}
          >
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <IconButton
                  color="secondary"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => {
                    minusHour();
                  }}
                >
                  <ArrowBackIosIcon
                    //fontSize="large"
                    color="secondary"
                  />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container justify="center">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    inputRef={inputTime}
                    //label="Time picker"
                    className={classes.dateField}
                    value={formValue.startDate}
                    onChange={e => {
                      handleDateChange(e);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </MuiPickersUtilsProvider>
                {/* <TextField
                  id="time"
                  // label="Alarm clock"
                  type="time"
                  // defaultValue="07:30"
                  value={`${new Date(
                    formValue.startDate
                  ).getHours()}:${new Date(formValue.startDate).getMinutes()}`}
                  className={classes.dateField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  // onChange={(e) => {
                  //   console.log("Time Changes: ", e, e.value, e.target.value);
                  // }}
                /> */}
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-start">
                <IconButton
                  color="secondary"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => {
                    plusHour();
                  }}
                >
                  <ArrowForwardIosIcon
                    //fontSize="large"
                    color="secondary"
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <InputLabel htmlFor="standard-adornment-amount">DURATION</InputLabel>
          <Grid
            container
            className={clsx(classes.settingsPanel, classes.formRow)}
          >
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <IconButton
                  color="secondary"
                  aria-label="open drawer"
                  edge="start"
                  id="minus_btn_duration"
                  onClick={() => minusClickDuration}
                >
                  <ArrowBackIosIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container justify="center">
                <Input
                  type="number"
                  value={duration}
                  //onChange={handleChange("amount")}
                  classes={{
                    input: classes.inputDurationRoot,
                  }}
                  onChange={value => {
                    setNewValueDuration(value.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="start">hours</InputAdornment>
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-start">
                <IconButton
                  color="secondary"
                  aria-label="open drawer"
                  edge="start"
                  id="plus_btn_duration"
                  onClick={() => plusClickDuration}
                >
                  <ArrowForwardIosIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <InputLabel htmlFor="standard-adornment-amount">PRICE</InputLabel>
          <Grid
            container
            className={clsx(classes.settingsPanel, classes.formRow)}
          >
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <IconButton
                  color="secondary"
                  aria-label="open drawer"
                  edge="start"
                  id="minus_btn"
                  onClick={() => minusClickPrice}
                >
                  <ArrowBackIosIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container justify="center">
                <Input
                  type="number"
                  value={price}
                  //onChange={handleChange("amount")}
                  classes={{
                    input: classes.inputPriceRoot,
                  }}
                  onChange={value => {
                    console.log("CHange Price: ", value);
                    setNewValuePrice(value.target.value);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      {formValue.currency}
                    </InputAdornment>
                  }
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  //label="Select"
                  value={formValue.currency}
                  onChange={handleChangeCurrency}
                  //helperText="Please select your currency"
                  //variant="outlined"
                >
                  {currencies.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-start">
                <IconButton
                  color="secondary"
                  aria-label="open drawer"
                  edge="start"
                  id="plus_btn"
                  onClick={() => plusClickPrice}
                >
                  <ArrowForwardIosIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <InputLabel htmlFor="standard-adornment-amount">CAPACITY</InputLabel>
          <Grid container className={classes.formRow}>
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <IconButton
                  color="secondary"
                  edge="start"
                  id="minus_btn_capacity"
                  onClick={() => minusClickCapacity}
                >
                  <ArrowBackIosIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container justify="center">
                <TextField
                  value={capacity}
                  type="number"
                  onChange={value => {
                    setNewValueCapacity(value.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-start">
                <IconButton
                  color="secondary"
                  aria-label="open drawer"
                  edge="start"
                  id="plus_btn_capacity"
                  onClick={() => plusClickCapacity}
                >
                  <ArrowForwardIosIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <InputLabel htmlFor="standard-adornment-amount">
            BYO Event (guest can bring his own dring/snack)
          </InputLabel>
          <FormControlLabel
            className={classes.switchBYO}
            control={
              <Switch
                //checked={formValue.checkedA}
                onChange={handleChangeBYO}
                checked={formValue.BYO}
                inputRef={inputBYO}
              />
            }
          />
          <InputLabel htmlFor="standard-adornment-amount">IMAGES</InputLabel>
          <Grid
            container
            justify="center"
            alignContent="center"
            className={clsx(classes.formRow, classes.dropContainer)}
          >
            <Grid item xs={12}>
              <Dropzone
                setFormValue={setFormValue}
                setCountOfFiles={setCountOfFiles}
              />
            </Grid>
            <Grid item xs={12}>
              {countOfFiles > formValue.ImagesArr.length ? (
                <Spinner height={40} width={40} />
              ) : (
                <div className={classes.fourtyBox}></div>
              )}
              <LinearProgress
                variant="determinate"
                value={
                  formValue.ImagesArr.length
                    ? (formValue.ImagesArr.length / countOfFiles) * 100
                    : 0
                }
              />
            </Grid>
          </Grid>

          <InputLabel htmlFor="standard-adornment-amount">
            DESCRIPTION
          </InputLabel>
          <Grid
            container
            className={clsx(classes.formRow, classes.descriptionContainer)}
          >
            <Grid item className={classes.descriptionItem}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="decsription"
                placeholder="Example: Upon arrival, you will get welcome drink and some snacks will be ready on the balcony. Grill be ready too."
                multiline
                rows="4"
                inputRef={inputDescription}
                //label="Description"
                name="decsription"
                autoComplete="false" //improvisation, should be "off", or random "string"
              />
            </Grid>
          </Grid>

          {errorOut &&
            errorOut.map(item => (
              <Alert severity="error" key={item.message}>
                {item.message}
              </Alert>
            ))}

          {FeErrors &&
            FeErrors.map(item => (
              <Alert severity="error" key={item}>
                {item} is empty
              </Alert>
            ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => onSubmit(e)}
            // disabled={
            //   formValue.ImagesArr && formValue.ImagesArr.length ? false : true
            // }
            disabled={loading}
          >
            {dataOut && <CloudDoneIcon />}
            {loading && <Spinner hieght={20} width={20} />}
            Create Party
          </Button>
        </form>
      </Container>
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  profileWrap: {
    top: 0,
    height: "100%",
    width: "100%",
    // position: "absolute",
    // background:
    //   "linear-gradient(180deg, rgba(0,0,255,0.5) 30%, rgba(255,0,100,0.5) 100%)"
  },
  paper1: {
    marginTop: 66,
    padding: 10,
    paddingTop: 50,
    paddingBottom: 0,

    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    background: "#E8045D",
    [theme.breakpoints.down("xs")]: {
      marginTop: "56px !important",
    },
  },
  paper: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(255,255,255,0.7)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  dateField: {
    wdith: 200,
  },
  justDoIt: {
    fontWeight: 200,
    fontSize: 25,
    letterSpacing: 12,
    position: "relative",
    top: 5,
    marginBottom: 0,
  },
  now: {
    fontWeight: 700,
    fontSize: 38,
    letterSpacing: 3,
  },
  inputName: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: 5,
    boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.75)",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  pinkBack: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  fourtyBox: {
    height: 40,
    width: 40,
  },
  formRow: {
    marginTop: 10,
    marginBottom: 40,
    // color: "red",
    // backgroundColor: "red",
  },
  inputDurationRoot: {
    maxWidth: 140,
  },
  inputPriceRoot: {
    maxWidth: 100,
  },
  switchBYO: {
    marginBottom: "20px",
    marginLeft: "10px",
  },
  descriptionContainer: {
    width: "100%",
  },
  descriptionItem: {
    width: "100%",
  },
  dropContainer: {
    background: "rgba(0,0,0,0.1)",
  },
  dropContainerBottom: {
    background: "rgba(0,0,0,0.1)",
  },
  btnsDialogGridCont: {
    padding: 5,
  },
}));

export default CreateView;

import React, { useContext, useState, useRef, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

import Alert from "@material-ui/lab/Alert";
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
  KeyboardDatePicker
} from "@material-ui/pickers";

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
import { UserContext } from "../userContext";
import ModalLayout from "../Layouts/ModalLayout";
import Copyright from "../Atoms/copyright";
import Dropzone from "../Molecules/dropzone";
import Spinner from "../Atoms/Spinner";
import MapCreate from "../Molecules/map-create";

const NEW_EVENT = gql`
  mutation createEvent(
    $name: String!
    $lng: Float
    $lat: Float
    $address: String
    $author: String!
    $dateStart: String
    $price: Float
    $currency: String
    $capacityMax: Int
    $BYO: Boolean
    $description: String
    $imagesArr: [ImageInput]
  ) {
    createEvent(
      eventInput: {
        name: $name
        lng: $lng
        lat: $lat
        address: $address
        author: $author
        dateStart: $dateStart
        price: $price
        currency: $currency
        capacityMax: $capacityMax
        BYO: $BYO
        description: $description
        imagesArr: $imagesArr
      }
    ) {
      dataOut {
        _id
        name
        success
      }
      errorOut {
        name
        message
      }
    }
  }
`;

const currencies = [
  {
    value: "USD",
    label: "$"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "CZK",
    label: "Kč"
  }
];

function Create(props) {
  const classes = useStyles();
  let history = useHistory();

  const { user, setUser } = useContext(UserContext);
  const [customMapParam, setCustomMapParam] = useState();
  const [formValue, setFormValue] = useState({
    startDate: new Date(),
    price: 100,
    capacity: 15,
    currency: "CZK",
    BYO: false
  });
  const [FEerrors, setFEerrors] = useState([]);
  const [createEvent, { loading, error, data }] = useMutation(NEW_EVENT, {
    onCompleted: () => {
      setFEerrors([]);
    }
  });
  //console.log("formValue: ", formValue);
  const { dataOut } = data ? data.createEvent : { dataOut: undefined };
  console.log("DATA LOGIN: ", dataOut);
  const { errorOut } = data ? data.createEvent : { errorOut: undefined };
  console.log("ERROR LOGIN: ", errorOut);

  let den = new Date(formValue.startDate);
  //Day +- one day
  const plusDay = () => {
    den.setDate(den.getDate() + 1);
    setFormValue(prev => {
      return { ...prev, startDate: den };
    });
  };

  const minusDay = () => {
    den.setDate(den.getDate() - 1);
    setFormValue(prev => {
      return { ...prev, startDate: den };
    });
  };

  //Hours +- one hour
  const plusHour = () => {
    den.setHours(den.getHours() + 1);
    let isoDen = den.toISOString().split(":")[0];
    setFormValue(prev => {
      return { ...prev, startDate: `${isoDen}:00:00.000Z` };
    });
  };

  const minusHour = () => {
    den.setHours(den.getHours() - 1);
    let isoDen = den.toISOString().split(":")[0];
    setFormValue(prev => {
      return { ...prev, startDate: `${isoDen}:00:00.000Z` };
    });
  };

  const plusPrice = () => {
    setFormValue(prev => {
      return { ...prev, price: prev.price + 1 };
    });
  };
  const minusPrice = () => {
    setFormValue(prev => {
      return { ...prev, price: prev.price - 1 };
    });
  };

  const plusCapacity = () => {
    setFormValue(prev => {
      return { ...prev, capacity: prev.capacity + 1 };
    });
  };
  const minusCapacity = () => {
    setFormValue(prev => {
      return { ...prev, capacity: prev.capacity - 1 };
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const inputName = useRef(null);
  const inputDate = useRef(null);
  const inputTime = useRef(null);
  const inputBYO = useRef(null);
  const inputDescription = useRef(null);
  const inputMarker = useRef(null);

  const onSubmit = e => {
    e.preventDefault();

    console.log("inputName: ", inputName);

    let load = {
      name: inputName.current.value ? inputName.current.value : null,
      lng: customMapParam.lng,
      lat: customMapParam.lat,
      address: customMapParam.address,
      author: user._id,
      eventType: 1,
      dateStart: formValue.startDate, //inputDate.current.value,
      price: formValue.price,
      currency: formValue.currency,
      capacityMax: formValue.capacity,
      BYO: inputBYO.current.checked,
      description: inputDescription.current.value
        ? inputDescription.current.value
        : null,
      imagesArr: formValue.ImagesArr
    };

    const empty = findEmpty(load);
    console.log("Empty result> ", empty);

    if (empty.length == 0) {
      console.log("Sending this LOAD>> ", load);
      createEvent({
        variables: load
      });
    } else {
      setFEerrors(empty);
    }
  };

  const handleDateChange = date => {
    setFormValue(prev => {
      return { ...prev, startDate: date };
    });
  };

  const handleChangeCurrency = event => {
    //setCurrency(event.target.value);
    setFormValue(prev => {
      return { ...prev, currency: event.target.value };
    });
  };

  if (dataOut) {
    setTimeout(() => {
      history.push(`/event/${dataOut._id}`);
    }, 500);
  }

  return (
    <div component="main" className={classes.profileWrap}>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.paper1}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.pinkBack}
        >
          {/* <Avatar className={classes.avatar}>
            <AddCircleOutlineIcon />
          </Avatar> */}
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
            <Grid item style={{ width: "100%" }}>
              {user.success ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  inputRef={inputName}
                  label="My First Party"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: 5,
                    boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.75)"
                  }}
                />
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 30 }}
                  onClick={() => {
                    setTimeout(() => {
                      history.push(`/signin`);
                    }, 200);
                  }}
                >
                  LOGIN FIRST
                </Button>
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
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => {
                  minusDay();
                }}
              >
                <ArrowBackIosIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  inputRef={inputDate}
                  //label="Choose date"
                  format="dd/MM/yyyy"
                  value={formValue.startDate}
                  onChange={e => {
                    handleDateChange(e);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => {
                  plusDay();
                }}
              >
                <ArrowForwardIosIcon
                  //fontSize="large"
                  color="primary"
                />
              </IconButton>
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
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => {
                  minusHour();
                }}
              >
                <ArrowBackIosIcon
                  //fontSize="large"
                  color="primary"
                />
              </IconButton>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  inputRef={inputTime}
                  //label="Time picker"
                  value={formValue.startDate}
                  onChange={e => {
                    handleDateChange(e);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => {
                  plusHour();
                }}
              >
                <ArrowForwardIosIcon
                  //fontSize="large"
                  color="primary"
                />
              </IconButton>
            </Grid>
          </Grid>

          <InputLabel htmlFor="standard-adornment-amount">PRICE</InputLabel>
          <Grid
            container
            className={clsx(classes.settingsPanel, classes.formRow)}
          >
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => {
                  minusPrice();
                }}
              >
                <ArrowBackIosIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <Input
                type="number"
                value={formValue.price}
                //onChange={handleChange("amount")}
                startAdornment={
                  <InputAdornment position="start">
                    {formValue.currency}
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item>
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

            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => {
                  plusPrice();
                }}
              >
                <ArrowForwardIosIcon color="primary" />
              </IconButton>
            </Grid>
          </Grid>

          <InputLabel htmlFor="standard-adornment-amount">CAPACITY</InputLabel>
          <Grid container className={classes.formRow}>
            <Grid item>
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => {
                  minusCapacity();
                }}
              >
                <ArrowBackIosIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid>
              <TextField
                value={formValue.capacity}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => {
                  plusCapacity();
                }}
              >
                <ArrowForwardIosIcon color="primary" />
              </IconButton>
            </Grid>
          </Grid>
          <InputLabel htmlFor="standard-adornment-amount">BYO Event</InputLabel>
          <FormControlLabel
            control={
              <Switch
                //checked={formValue.checkedA}
                //onChange={handleChange("checkedA")}
                //value="checkedA"
                inputRef={inputBYO}
              />
            }
            //label="BYO Event"
          />
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
                defaultValue="Example: Upon arrival, you will get welcome drink and some snacks will be ready on the balcony. Grill be ready too."
                multiline
                rows="4"
                inputRef={inputDescription}
                //label="Description"
                name="decsription"
                autoComplete="false" //imporvizace
                autoFocus
              />
            </Grid>
          </Grid>
          <InputLabel htmlFor="standard-adornment-amount">IMAGES</InputLabel>
          <Grid
            container
            justify="center"
            alignContent="center"
            className={classes.formRow}
          >
            <Grid
              item
              className={clsx(classes.dropItem, classes.dropContainer)}
            >
              <Dropzone setFormValue={setFormValue} />
            </Grid>
          </Grid>

          {errorOut &&
            errorOut.map(item => (
              <Alert severity="error" key={item.message}>
                {item.message}
              </Alert>
            ))}

          {FEerrors &&
            FEerrors.map(item => (
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
    position: "absolute",
    top: 0,
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(180deg, rgba(0,0,255,0.5) 30%, rgba(255,0,100,0.5) 100%)"
  },
  paper1: {
    marginTop: 66,
    padding: 10,
    paddingTop: 50,
    paddingBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#E8045D",
    [theme.breakpoints.down("xs")]: {
      marginTop: "56px !important"
    }
  },
  paper: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(255,255,255,0.7)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },

  justDoIt: {
    fontWeight: 200,
    fontSize: 25,
    letterSpacing: 12,
    position: "relative",
    top: 5,
    marginBottom: 0
  },
  now: {
    fontWeight: 700,
    fontSize: 38,
    letterSpacing: 3
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  pinkBack: {
    //background: "red",

    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },

  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 200
  },
  formRow: {
    marginTop: 10,
    marginBottom: 40
  },
  descriptionContainer: {
    width: "100%"
  },
  descriptionItem: {
    width: "100%"
  },
  dropContainer: {
    width: "100%",
    background: "rgba(0,0,0,0.1)",
    minHeight: 150
  },
  dropItem: {
    //width: "100%",
    //background: "rgba(0,0,0,0.1)"
  }
}));

export default Create;

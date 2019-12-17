import React, { useContext, useState, useRef, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import Link from "@material-ui/core/Link";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
//import AddIcon from "@material-ui/icons/Add";
//import RemoveIcon from "@material-ui/icons/Remove";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";

import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

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
        capacityMax: $capacityMax
        BYO: $BYO
        description: $description
        imagesArr: $imagesArr
      }
    ) {
      _id
      name
      success
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

  const { user, setUser } = useContext(UserContext);
  const [customMapParam, setCustomMapParam] = useState();
  const [currency, setCurrency] = React.useState("CZK");
  //const [selectedDate, setSelectedDate] = useState(new Date());
  const [formValue, setFormValue] = useState({
    startDate: new Date(),
    price: 22,
    capacity: 13
  });

  const [createEvent, { loading, error, data }] = useMutation(NEW_EVENT);
  console.log("formValue: ", formValue);
  let history = useHistory();
  let den = new Date(formValue.startDate);
  //Day +- one day
  const plusDay = () => {
    den.setDate(den.getDate() + 1);
    //let isoDen = den.toISOString();
    //setFormValue(den);
    console.log("SETTING: ", den);
    setFormValue(prev => {
      return { ...prev, startDate: den };
    });
  };

  const minusDay = () => {
    den.setDate(den.getDate() - 1);
    //let isoDen = den.toISOString();
    setFormValue(prev => {
      return { ...prev, startDate: den };
    });
  };

  //Hours +- one hour
  const plusHour = () => {
    den.setHours(den.getHours() + 1);
    let isoDen = den.toISOString().split(":")[0];
    console.log("Split 0,1: ", isoDen);
    //setSelectedDate(`${isoDen}:00:00.000Z`);

    setFormValue(prev => {
      return { ...prev, startDate: `${isoDen}:00:00.000Z` };
    });
  };

  const minusHour = () => {
    den.setHours(den.getHours() - 1);
    //let isoDen = den.toISOString();
    let isoDen = den.toISOString().split(":")[0];
    console.log("Split 0,1: ", isoDen);
    //setSelectedDate(`${isoDen}:00:00.000Z`);

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
    console.log("Only first mount OF CREATE");
    window.scrollTo(0, 0);
  }, []);

  const inputName = useRef(null);
  const inputDate = useRef(null);
  const inputTime = useRef(null);
  const inputCapacityMax = useRef(null);
  const inputCurrency = useRef(null);
  const inputBYO = useRef(null);
  const inputDescription = useRef(null);

  const onSubmit = e => {
    e.preventDefault();

    createEvent({
      variables: {
        name: inputName.current.value,
        lng: customMapParam.lng,
        lat: customMapParam.lat,
        address: customMapParam.address,
        author: user._id,
        eventType: 1,
        dateStart: formValue.startDate, //inputDate.current.value,
        price: formValue.price,
        currency: inputCurrency.current.value,
        capacityMax: formValue.capacity,
        BYO: inputBYO.current.checked,
        description: inputDescription.current.value,
        imagesArr: formValue.ImagesArr
      }
    });
  };

  const handleDateChange = date => {
    setFormValue(prev => {
      return { ...prev, startDate: date };
    });
  };

  const handleChange = event => {
    setCurrency(event.target.value);
  };

  if (loading) {
    return (
      <ModalLayout>
        <Spinner height={50} width={50} />
      </ModalLayout>
    );
  }

  if (data && data.createEvent.success) {
    console.log("SUCCESS and redirect");
    setTimeout(() => {
      history.push(`/event/${data.createEvent._id}`);
    }, 3000);
    return (
      <ModalLayout>
        <Typography> SUCCESS </Typography>
      </ModalLayout>
    );
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                inputRef={inputName}
                //label="Event Name"
                defaultValue="My First Party"
                name="name"
                autoComplete="name"
                autoFocus
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: 5,
                  boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.75)"
                }}
              />
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
                onClick={props.handleDrawerToggle}
              >
                <ArrowBackIosIcon
                  color="primary"
                  onClick={() => {
                    minusDay();
                  }}
                />
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
                onClick={props.handleDrawerToggle}
              >
                <ArrowForwardIosIcon
                  //fontSize="large"
                  color="primary"
                  onClick={() => {
                    plusDay();
                  }}
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
                onClick={props.handleDrawerToggle}
              >
                <ArrowBackIosIcon
                  //fontSize="large"
                  color="primary"
                  onClick={() => {
                    minusHour();
                  }}
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
                onClick={props.handleDrawerToggle}
              >
                <ArrowForwardIosIcon
                  //fontSize="large"
                  color="primary"
                  onClick={() => {
                    plusHour();
                  }}
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
              <TextField
                id="outlined-select-currency"
                select
                //label="Select"
                value={currency}
                onChange={handleChange}
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
                onClick={props.handleDrawerToggle}
              >
                <ArrowBackIosIcon
                  color="primary"
                  onClick={() => {
                    minusPrice();
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <Input
                id="standard-number"
                //inputRef={inputPrice}
                type="number"
                value={formValue.price}
                defaultValue={10}
                //onChange={handleChange("amount")}
                // startAdornment={
                //   <InputAdornment position="start">$</InputAdornment>
                // }
              />
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={props.handleDrawerToggle}
              >
                <ArrowForwardIosIcon
                  color="primary"
                  onClick={() => {
                    plusPrice();
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>

          <InputLabel htmlFor="standard-adornment-amount">CAPACITY</InputLabel>
          <Grid container className={classes.formRow}>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={props.handleDrawerToggle}
              >
                <ArrowBackIosIcon
                  color="primary"
                  onClick={() => {
                    minusCapacity();
                  }}
                />
              </IconButton>
            </Grid>
            <Grid>
              <TextField
                id="standard-number"
                //inputRef={inputCapacityMax}
                //defaultValue={20}
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
                onClick={props.handleDrawerToggle}
              >
                <ArrowForwardIosIcon
                  color="primary"
                  onClick={() => {
                    plusCapacity();
                  }}
                />
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => onSubmit(e)}
            disabled={
              formValue.ImagesArr && formValue.ImagesArr.length ? false : true
            }
          >
            {formValue.ImagesArr && formValue.ImagesArr.length
              ? "Create Party"
              : "Add images first"}
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
    marginTop: theme.spacing(7),
    padding: 10,
    paddingTop: 50,
    paddingBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#E8045D"
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

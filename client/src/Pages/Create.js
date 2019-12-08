import React, { useContext, useState, useRef, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
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
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

import { UserContext } from "../userContext";
import ModalLayout from "../Layouts/ModalLayout";
import Copyright from "../Atoms/copyright";
import Dropzone from "../Molecules/dropzone";
import Spinner from "../Atoms/Spinner";
import Map from "../Atoms/Hook-map";
import MapMolecule from "../Molecules/create-map";

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

function Create(props) {
  const classes = useStyles();
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [customMapParam, setCustomMapParam] = useState();
  const [createEvent, { loading, error, data }] = useMutation(NEW_EVENT);
  console.log("Data from Create Event: ", data);
  const [selectedDate, setSelectedDate] = useState(new Date());
  //const [capacityMax, setCapacityMax] = useState(10);
  const [formValue, setFormValue] = useState({
    startDate: "1990",
    description: "Yatim nic",
    price: 22
  });

  useEffect(() => {
    console.log("Only first mount OF CREATE");
    window.scrollTo(0, 0);
  }, []);

  const inputName = useRef(null);
  const inputDate = useRef(null);
  const inputTime = useRef(null);
  const inputCapacityMax = useRef(null);
  const inputPrice = useRef(null);
  const inputBYO = useRef(null);
  const inputDescription = useRef(null);

  const onSubmit = e => {
    e.preventDefault();

    // console.log("Posilam do GraphQl: ", inputName.current.value);
    // console.log("Posilam do GraphQl: ", inputDate.current.value);
    // console.log("Posilam do GraphQl: ", inputTime.current.value);
    // console.log("Posilam do GraphQl: ", inputCapacityMax.current.value);
    // console.log("Posilam do GraphQl: ", inputPrice.current.value);
    // console.log("Posilam do GraphQl: BYO ", inputBYO.current.checked);
    // console.log("Posilam do GraphQl: ", inputDescription.current.value);

    createEvent({
      variables: {
        name: inputName.current.value,
        lng: customMapParam.lng,
        lat: customMapParam.lat,
        address: customMapParam.address,
        author: user._id,
        eventType: 1,
        dateStart: selectedDate, //inputDate.current.value,
        dateEnd: "1999-11-10",
        price: parseInt(inputPrice.current.value),
        capacityMax: parseInt(inputCapacityMax.current.value),
        BYO: inputBYO.current.checked,
        description: inputDescription.current.value,
        imagesArr: formValue.ImagesArr
        // imagesArr: [
        //   {
        //     caption: "No more pictures for this Event",
        //     isSelected: false,
        //     src:
        //       "https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2017/12/surf-beaches-in-Australia-@hana_seas.jpg",
        //     thumbnail:
        //       "https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2017/12/surf-beaches-in-Australia-@hana_seas.jpg",
        //     thumbnailHeight: 10,
        //     thumbnailWidth: 10,
        //     scaletwidth: 100,
        //     marginLeft: 0,
        //     vwidth: 100
        //   }
        // ]
      }
    });
  };

  const handleDateChange = date => {
    console.log("CHange of DAte: ", date);
    setSelectedDate(date);
  };

  if (loading) {
    return (
      <ModalLayout>
        <Spinner />
      </ModalLayout>
    );
  }

  if (data && data.createEvent.success) {
    console.log("SUCCESS and redirect");
    setTimeout(() => {
      history.push("/map");
    }, 1000);
    return (
      <ModalLayout>
        <Typography> SUCCESS </Typography>
      </ModalLayout>
    );
  }

  return (
    <Container component="main" className={classes.profileContainer}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Party
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            inputRef={inputName}
            label="Event Name"
            name="name"
            autoComplete="name"
            autoFocus
          />

          <MapMolecule
            customMapParam={customMapParam}
            setCustomMapParam={setCustomMapParam}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              inputRef={inputDate}
              label="Choose date"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={e => {
                handleDateChange(e);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              inputRef={inputTime}
              label="Time picker"
              value={selectedDate}
              onChange={e => {
                handleDateChange(e);
              }}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            fullWidth
            id="standard-number"
            inputRef={inputPrice}
            label="Price"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            id="standard-number"
            inputRef={inputCapacityMax}
            label="Capacity Max"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Switch
                //checked={formValue.checkedA}
                //onChange={handleChange("checkedA")}
                //value="checkedA"
                inputRef={inputBYO}
              />
            }
            label="BYO Event"
          />

          <TextField
            //variant="outlined"
            margin="normal"
            required
            fullWidth
            id="decsription"
            inputRef={inputDescription}
            label="Description"
            name="decsription"
            autoComplete="false" //imporvizace
            autoFocus
          />
          <Dropzone setFormValue={setFormValue} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => onSubmit(e)}
          >
            Create Party
          </Button>
        </form>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  profileContainer: {
    position: "absolute",
    top: 0,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(180deg, rgba(0,0,255,0.5) 30%, rgba(255,0,100,0.5) 100%)"
  },
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center"
  // },
  paper: {
    marginTop: theme.spacing(8),
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 500,
    background: "rgba(255,255,255,0.5)"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default Create;

import React, { useContext, useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
import Dropzone from "../Molecules/Dropzone";
import Spinner from "../Atoms/Spinner";
import Map from "../Atoms/Hook-map";
import MapMolecule from "../Molecules/Create-map-hooks";

const NEW_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      name
      email
      picture
      token
    }
  }
`;

function Create(props) {
  const classes = useStyles();
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [customMapParam, setCustomMapParam] = useState();

  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  //const [capacityMax, setCapacityMax] = useState(10);
  const [formValue, setFormValue] = useState({
    startDate: "1990",
    description: "Yatim nic",
    price: 22
  });

  const inputName = useRef(null);
  const inputLng = useRef(null);
  const inputLat = useRef(null);
  const inputDate = useRef(null);
  const inputTime = useRef(null);
  const inputCapacityMax = useRef(null);
  const inputDescription = useRef(null);

  const onSubmit = e => {
    e.preventDefault();

    console.log("Posilam do GraphQl: ", inputName.current.value);
    console.log("Posilam do GraphQl: ", inputLng.current.value);
    console.log("Posilam do GraphQl: ", inputLat.current.value);
    console.log("Posilam do GraphQl: ", inputDate.current.value);
    console.log("Posilam do GraphQl: ", inputTime.current.value);
    console.log("Posilam do GraphQl: ", inputCapacityMax.current.value);
    console.log("Posilam do GraphQl: ", inputDescription.current.value);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
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

          <MapMolecule customMapParam={customMapParam} setCustomMapParam={setCustomMapParam} />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lng"
            inputRef={inputLng}
            label="Lng"
            name="lng"
            autoComplete="number"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lat"
            inputRef={inputLat}
            label="Lat"
            name="lat"
            autoComplete="number"
            autoFocus
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              inputRef={inputDate}
              label="Date picker dialog"
              format="MM/dd/yyyy"
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
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>
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
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Charlie Party
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Create;

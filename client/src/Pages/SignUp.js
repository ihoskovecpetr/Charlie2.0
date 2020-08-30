import React, { useContext, useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import { useMutation } from "@apollo/react-hooks";
import { useHistory, NavLink } from "react-router-dom";
import { useWindowSize } from "../Hooks/useWindowSize";
// import { useScrollDisable } from "../Hooks/useScrollDisable";
import { findEmpty } from "../Services/functions";
import { UserContext } from "src/Contexts/userContext";

import ModalLayout from "../Layouts/ModalLayout";
import Copyright from "../Atoms/copyright";
import DropzoneSignup from "../Molecules/DropzoneSignup";
import { NEW_USER } from "src/Services/GQL/NEW_USER";

// function tryLogin() {
//   console.log("Mutation data: ", data);
// }

function SignUp() {
  const classes = useStyles();
  let history = useHistory();
  const windowSize = useWindowSize();
  const { context, setContext } = useContext(UserContext);

  const [formValue, setFormValue] = useState({ picture: null });
  const [feErrors, setFEerrors] = useState([]);
  const [newUser, { loading, error, data }] = useMutation(NEW_USER);

  const { dataOut } = data ? data.newUser : { dataOut: undefined };
  const { errorOut } = data ? data.newUser : { errorOut: undefined };

  // useScrollDisable();
  const inputDescRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmitHandler = e => {
    e.preventDefault();
    let load = {
      name:
        document.getElementById("name").value == ""
          ? null
          : document.getElementById("name").value,
      email:
        document.getElementById("emailSignUp").value == ""
          ? null
          : document.getElementById("emailSignUp").value,
      telephone:
        document.getElementById("telephoneSignUp").value == ""
          ? null
          : document.getElementById("telephoneSignUp").value,
      password:
        document.getElementById("password").value == ""
          ? null
          : document.getElementById("password").value,
      password2:
        document.getElementById("password2").value == ""
          ? null
          : document.getElementById("password2").value,
      picture: formValue.picture,
      description: inputDescRef.current.value
        ? inputDescRef.current.value
        : null,
      typeDirect: true,
      typeSocial: false,
    };
    let empty = findEmpty(load);
    empty = empty.map(item => `${item} is Empty`);
    if (load.password != load.password2) empty.push("Not matching passwords");

    console.log("Empty ones: ", empty);

    if (empty.length == 0) {
      setFEerrors([]); // reset fe errors
      console.log("SUBMIT: ", load);
      newUser({
        variables: load,
      });
    } else {
      setFEerrors(empty);
    }
  };

  if (dataOut && dataOut.success) {
    console.log("Success signUp data: ", dataOut);
    // window.localStorage.setItem("token", dataOut.token);
    setTimeout(() => {
      // window.localStorage.setItem("token", dataOut.token);
      setContext(prev => {
        return {
          ...prev,
          showAlertAdviseEmail: true,
        };
      });
      history.push("/");
    }, 200);
    return (
      <ModalLayout>
        <Paper className={classes.paper}>
          <p>Succes redirecting to main page</p>
        </Paper>
      </ModalLayout>
    );
  }

  if (error) {
    return (
      <ModalLayout>
        <Paper className={classes.paper}>
          <Typography variant="h4">Error, something went wrong</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/");
            }}
          >
            MENU
          </Button>
        </Paper>
      </ModalLayout>
    );
  }

  if (data && data.newUser.success == true) {
    setTimeout(() => {
      history.push("/");
    }, 1000);
    return (
      <ModalLayout>
        <Paper className={classes.paper}>
          <p>Success! Redirecting..</p>
        </Paper>
      </ModalLayout>
    );
  }

  return (
    <ModalLayout>
      <Paper
        className={classes.paper}
        style={{
          marginTop: 0.1 * windowSize.height,
          maxHeight: 0.88 * windowSize.height,
          overflow: "scroll",
        }}
      >
        <CssBaseline />
        <Grid container justify="flex-end">
          <Grid item>
            <CloseIcon
              onClick={() => {
                history.goBack();
              }}
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Typography
              component="h1"
              variant="h5"
              className={classes.mainHeading}
            >
              {loading ? "Loading" : "Sign UP"}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.gridDropzone}
        >
          <Grid item>
            <DropzoneSignup setFormValue={setFormValue} formValue={formValue} />
          </Grid>
        </Grid>

        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="User name"
          name="name"
          variant="outlined"
          // autoFocus
          // autocomplete="off"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="emailSignUp"
          label="Email Address"
          name="email"
          variant="outlined"
          //autoComplete="email"
        />
        <TextField
          margin="normal"
          fullWidth
          id="telephoneSignUp"
          label="Telephone Nr."
          name="telephone"
          variant="outlined"
          defaultValue={"+420"}
          //autoComplete="email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password2"
          label="Password"
          type="password"
          id="password2"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Confirm password"
          type="password"
          id="password"
        />
        <InputLabel htmlFor="standard-adornment-amount">
          DESCRIBE YOURSELF
        </InputLabel>
        <Grid container className={classes.descriptionContainer}>
          <Grid item className={classes.descriptionItem} xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="decsription"
              placeholder="Hi there, I am an upcomming enterpreneur commig to the sceen, join and witness my rise."
              multiline
              rows="4"
              inputRef={inputDescRef}
              //label="Description"
              name="decsription"
              // autoComplete="false" //imporvizace
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          {feErrors &&
            feErrors.map(item => (
              <Alert severity="error" key={item}>
                {item}
              </Alert>
            ))}
          {errorOut &&
            errorOut.map(item => (
              <Alert severity="error" key={item.message}>
                {item.message}
              </Alert>
            ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading || (data && data.newUser && data.newUser.success)}
          className={classes.submit}
          onClick={onSubmitHandler}
        >
          {loading ? "sending..." : "Sign Up"}
        </Button>
        <Grid container>
          <Grid item>
            <Typography className={classes.linkClass}></Typography>
          </Grid>
          <Grid
            item
            onClick={() => {
              history.push({
                pathname: history.location.pathname,
                search: `?signin=true`,
              });
            }}
          >
            <Typography className={classes.linkClass}>
              Already Signed up?
            </Typography>
          </Grid>
        </Grid>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Paper>
    </ModalLayout>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    // marginTop: "10vh",
    // paddingTop: 40,
    // // height: "88vh",
    // overflow: "scroll",
    // paddingBottom: 40,

    padding: theme.spacing(3, 2),
    width: "100%",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
    height: 100,
    width: 100,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  standardHeading: {
    //borderBottom: "solid 1px grey",
    //fontWeight: 600,
  },
  gridDropzone: {
    width: "100%",
    margin: theme.spacing(3, 0, 2),
  },
  mainHeading: {
    marginTop: 10,
  },
  linkClass: {
    paddingBottom: 10,
    color: "blue",
    textDecoration: "underline",
  },
}));

export default SignUp;

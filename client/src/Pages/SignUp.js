import React, { useContext, useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { UserContext } from "../userContext";
import { useScrollDisable } from "../Hooks/useScrollDisable";
import { findEmpty } from "../Services/functions";

import ModalLayout from "../Layouts/ModalLayout";
import Copyright from "../Atoms/copyright";
import Spinner from "../Atoms/Spinner";
import Dropzone from "../Molecules/dropzone-signup";

const NEW_USER = gql`
  mutation newUser(
    $name: String!
    $email: String!
    $password: String!
    $description: String!
    $picture: String
  ) {
    newUser(
      name: $name
      email: $email
      password: $password
      description: $description
      picture: $picture
    ) {
      dataOut{
      success
      name
      _id
      token
      password
      email
      }
      errorOut{
        name
        message
      }

    }
  }
`;

// function tryLogin() {
//   console.log("Mutation data: ", data);
// }


function SignUp() {
  const classes = useStyles();
  let history = useHistory();

  const [formValue, setFormValue] = useState({ picture: null });
  const [feErrors, setFEerrors] = useState([]);
  const [newUser, { loading, error, data }] = useMutation(NEW_USER);

  const { dataOut } = data ? data.newUser : { dataOut: undefined };
  const { errorOut } = data ? data.newUser : { errorOut: undefined };
  
  useScrollDisable();
  const inputDescRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const onSubmitHandler = (e) => {
    e.preventDefault();
    let load = {
      name: document.getElementById("name").value == "" ? null : document.getElementById("name").value,
      email: document.getElementById("emailSignUp").value == "" ? null : document.getElementById("emailSignUp").value,
      password: document.getElementById("password").value == "" ? null : document.getElementById("password").value,
      password2: document.getElementById("password2").value == "" ? null : document.getElementById("password2").value,
      picture: formValue.picture,
      description: inputDescRef.current.value
          ? inputDescRef.current.value
          : null,
      };
    let empty = findEmpty(load);
    empty = empty.map(item => `${item} is Empty`)
    if(load.password != load.password2) empty.push("Not matching passwords")

    console.log("Empty ones: ", empty);

  if (empty.length == 0) {
      console.log("SUBMIT: ", load);
      newUser({
        variables: load
      });
  } else {
      setFEerrors(empty);
    }
    
}

if (dataOut && dataOut.success) {
  return (
    <ModalLayout>
      <Paper className={classes.paper}>
        <p>Sukces, redirecting</p>
      </Paper>
    </ModalLayout>
  );
}

  
  if (loading) {
    return (
      <ModalLayout>
        <Paper className={classes.paper}>
        <Spinner height={40} width={40} />
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
              history.push("/")
            }}
          >
            MENU
          </Button>
        </Paper>
      </ModalLayout>
    );
  }


  if(data && data.newUser.success == true ){
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
      <Paper className={classes.paper}>
        <CssBaseline />
      <Grid container justify="center">
        <Grid item>
          <Typography variant="h6" className={classes.mainHeading}>
            Sign UP
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
              <Dropzone setFormValue={setFormValue} formValue={formValue} />
            </Grid>
          </Grid>
          <form className={classes.form} noValidate autocomplete="off">

          {errorOut &&
            errorOut.map(item => (
              <Alert severity="error" key={item.message}>
                {item.message}
              </Alert>
            ))}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="User name"
            name="name"
            autoFocus
            autocomplete="off"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="emailSignUp"
            label="Email Address"
            name="email"
            //autoComplete="email"
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm password"
            type="password"
            id="password2"
          />
           <InputLabel htmlFor="standard-adornment-amount">
            DESCRIBE YOURSELF
          </InputLabel>
          <Grid
            container
            className={classes.descriptionContainer}
            xs={12}
          >
            <Grid item className={classes.descriptionItem}  xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="decsription"
                defaultValue="Hi there, I am an upcomming enterpreneur commig to the sceen, join and witness my rise."
                multiline
                rows="4"
                inputRef={inputDescRef}
                //label="Description"
                name="decsription"
                autoComplete="false" //imporvizace
              />
            </Grid>
          </Grid>

          {feErrors &&
            feErrors.map(item => (
              <Alert severity="error" key={item}>
                {item}
              </Alert>
            ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              onSubmitHandler(e)
            }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signin" variant="body2">
                Have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Paper>
    </ModalLayout>
  );
}

// SignIn.getInitialProps = async context => {
//   console.log("Sign IN INIT PROPS: CONTEXT ", context);
//   // if (!loggedInUser.user) {
//   //   // If not signed in, send them somewhere more useful
//   //   redirect(context, "/signin");
//   // }
//   const { loggedInUser } = await checkLoggedIn(context.apolloClient);

//   if (loggedInUser.user) {
//     // Already signed in? No need to continue.
//     // Throw them back to the main page
//     //redirect(context, '/')
//     console.log("We have User!!", loggedInUser.user);
//     redirect(context, "/");
//   } else {
//     console.log("No User :[ ");
//   }

//   return {};
// };

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: "10vh",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "75vh",
    overflow: "scroll"
  },
  avatar: {
    margin: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
    height: 100,
    width: 100
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  standardHeading: {
    //borderBottom: "solid 1px grey",
    //fontWeight: 600,
  },
  gridDropzone: {
    width: "100%",
    margin: theme.spacing(3, 0, 2)
  },
  mainHeading: {
    marginTop: 10
  }
}));

export default SignUp;

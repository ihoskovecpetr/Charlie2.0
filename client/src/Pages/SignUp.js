import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { UserContext } from "../userContext";

import ModalLayout from "../Layouts/ModalLayout";
import Copyright from "../Atoms/copyright";
import Dropzone from "../Molecules/dropzone-signup";

const NEW_USER = gql`
  mutation newUser(
    $name: String!
    $email: String!
    $password: String!
    $picture: String
  ) {
    newUser(
      name: $name
      email: $email
      password: $password
      picture: $picture
    ) {
      success
      name
      _id
      token
      password
      email
    }
  }
`;

// function tryLogin() {
//   console.log("Mutation data: ", data);
// }

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(180deg, rgba(200,100,155,0.5) 30%, rgba(255,0,100,0.5) 100%)"
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
    width: "100%"
  },
  mainHeading: {
    marginTop: 10
  }
}));

function SignUp() {
  const classes = useStyles();
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [newUser, { loading, error, data }] = useMutation(NEW_USER);
  const [formValue, setFormValue] = useState({
    picture: null //"https://res.cloudinary.com/party-images-app/image/upload/v1575981578/wc9pd4wxm3cgor6v2yls.jpg",
  });

  useEffect(() => {
    console.log("Only first mount OF CREATE");
    window.scrollTo(0, 0);
  }, []);

  console.log("Context: ", user);

  if (loading) {
    return (
      <ModalLayout>
        <Paper className={classes.paper}>
          <p>Loading...</p>
        </Paper>
      </ModalLayout>
    );
  }

  if (error) {
    return (
      <ModalLayout>
        <Paper className={classes.paper}>
          <p>Error</p>
        </Paper>
      </ModalLayout>
    );
  }

  if (data) {
    if (data.newUser.success == true) {
      setTimeout(() => {
        history.push("/");
      }, 1000);
      return (
        <ModalLayout>
          <Paper className={classes.paper}>
            <p>successfull signup! redirecting to Login</p>
          </Paper>
        </ModalLayout>
      );
    }
  }
  return (
    <ModalLayout>
      <Paper className={classes.paper}>
        <CssBaseline />
        {data && !data.newUser.success && (
          <h1>Error, this email is already taken!!</h1>
        )}
        <Typography variant="h6" className={classes.mainHeading}>
          Sign UP
        </Typography>

        <form className={classes.form} noValidate>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="User name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              e.preventDefault();
              console.log("sumbitHandler: ", e);
              console.log(
                "email: ",
                document.getElementById("email").value,
                document.getElementById("password").value
              );
              let name = document.getElementById("name").value;
              let email = document.getElementById("email").value;
              let password = document.getElementById("password").value;
              console.log("email: ", document.getElementById("password").value);

              newUser({
                variables: {
                  name: name,
                  email: email,
                  password: password,
                  picture: formValue.picture
                }
              });
            }}
          >
            Sign Up
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

export default SignUp;

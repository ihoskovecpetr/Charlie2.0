import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
import ModalLayout from "../Layouts/ModalLayout";
import Spinner from "../Atoms/Spinner";
import Copyright from "../Atoms/copyright";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      success
      name
      email
      picture
      token
    }
  }
`;

function SignIn(props) {
  const classes = useStyles();
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [login, { loading, error, data }] = useMutation(LOGIN);
  console.log("useMutation(LOGIN: ", loading, error, data);

  if (user.success) {
    setTimeout(() => {
      history.goBack();
    }, 100);
    return (
      <ModalLayout>
        <Paper className={classes.paper}>
          <p>Ahoj {user.name}</p>
        </Paper>
      </ModalLayout>
    );
  }

  if (loading)
    return (
      <ModalLayout>
        <Paper className={classes.paper}>
          <Spinner height={50} width={50} />
        </Paper>
      </ModalLayout>
    );

  if (data) {
    console.log("DATA LOGIN: ", data);
    if (data.login.success == false) {
      return (
        <ModalLayout>
          <Paper className={classes.paper}>
            <p>Wrong combination Email and password</p>
          </Paper>
        </ModalLayout>
      );
    } else {
      if (data.login.success) {
        window.localStorage.setItem("token", data.login.token);
        //console.log("LocalStorage: ", window.localStorage.getItem("token"));
        setUser({
          _id: data.login._id,
          success: data.login.success,
          name: data.login.name,
          email: data.login.email,
          picture: data.login.picture,
          token: data.login.token
        });
      }
      console.log("seTTTING USER: ", user);

      return <p>Success, welcone {user.name}</p>;
    }
  }

  return (
    <ModalLayout>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
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
              let email = document.getElementById("email").value;
              let password = document.getElementById("password").value;
              login({
                variables: {
                  email: email,
                  password: password
                }
              });
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <NavLink to={`/signup`} variant="body2">
                {"Don't have an account? Sign Up"}
              </NavLink>
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

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 400
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

export default SignIn;

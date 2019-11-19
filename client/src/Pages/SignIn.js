import React, { useContext } from "react";
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
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

import { UserContext } from "../userContext";
import Spinner from "../Atoms/Spinner";

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

function SignIn(props) {
  const classes = useStyles();
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [signIn, { loading, error, data }] = useMutation(NEW_USER);

  if (loading) return <Spinner />;

  if (data) {
    //console.log("GraphQl data: ", data);
    if (data.login.success == false) {
      return <p>Wrong combination Email and password</p>;
    } else {
      setTimeout(() => {
        history.push("/");
      }, 1000);
      if (!user.success) {
        window.localStorage.setItem("token", data.login.token);
        //console.log("LocalStorage: ", window.localStorage.getItem("token"));
        setUser({
          success: data.login.success,
          name: data.login.name,
          email: data.login.email,
          picture: data.login.picture,
          token: data.login.token
        });
      }
      console.log("seTTTING USER");

      return <p>Success, welcone {user.name}</p>;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
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
              console.log("sumbitHandler: ", e);
              console.log(
                "email: ",
                document.getElementById("email").value,
                document.getElementById("password").value
              );
              let email = document.getElementById("email").value;
              let password = document.getElementById("password").value;
              console.log("email: ", document.getElementById("password").value);

              //login({ variables: { email: email, password: password } });
              signIn({
                variables: {
                  name: "Petr Browser",
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

export default SignIn;
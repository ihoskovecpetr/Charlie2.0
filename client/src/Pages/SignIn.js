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
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import { Animated } from "react-animated-css";

import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
import { useScrollDisable } from "../Hooks/useScrollDisable";

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
  useScrollDisable();
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

  // if (loading)
  //   return (
  //     <ModalLayout>
  //       <Paper className={classes.paper}>
  //         <Spinner height={50} width={50} />
  //       </Paper>
  //     </ModalLayout>
  //   );

  console.log("DATA LOGIN: ", data);

  if (data && data.login.success && !user.name) {
    console.log("XXman user: ", user);
    window.localStorage.setItem("token", data.login.token);
    setUser({
      _id: data.login._id,
      success: data.login.success,
      name: data.login.name,
      email: data.login.email,
      picture: data.login.picture,
      token: data.login.token
    });
  }

  return (
    <ModalLayout>
      <Paper className={classes.paper}>
        {!loading && (
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        )}

        {loading && (
          <div className={classes.spinner}>
            <Spinner height={40} width={40} />
          </div>
        )}

        <Typography component="h1" variant="h5">
          {loading ? "Loading.." : "Sign in"}
        </Typography>

        <form className={classes.form} noValidate>
          {!data && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              defaultValue="test@gmail.com"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
          )}
          {data && !data.success && (
            <Animated
              animationIn="shake"
              animationOut="fadeOut"
              animationInDelay={0}
              animationInDuration={800}
              isVisible={true}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                defaultValue="test@gmail.com"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={data ? data && !data.success : false}
              />
            </Animated>
          )}
          {data && !data.success && (
            <Animated
              animationIn="shake"
              animationOut="fadeOut"
              animationInDelay={0}
              animationInDuration={1000}
              isVisible={true}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                defaultValue="heslo"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={data ? data && !data.success : false}
              />
            </Animated>
          )}

          {!data && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              defaultValue="heslo"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={data ? data && !data.success : false}
            />
          )}

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
              console.log("pass + email: ", password, email);
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
              <Badge
                color="secondary"
                badgeContent={
                  <p style={{ margin: 0 }}>
                    <b>OR SIGN UP</b>
                  </p>
                }
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
              >
                <Link href="/signup" className={classes.linkClass}>
                  Don't have an account? Sign In
                </Link>
              </Badge>
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
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  spinner: {
    margin: theme.spacing(1)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  blueUnderline: {
    margin: 20,
    color: "blue",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  linkClass: {
    paddingBottom: 10
  }
}));

export default SignIn;

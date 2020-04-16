import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import Avatar from "@material-ui/core/Avatar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import { Animated } from "react-animated-css";

import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
import { useScrollDisable } from "../Hooks/useScrollDisable";
import { useWindowSize } from "../Hooks/useWindowSize";

import ModalLayout from "../Layouts/ModalLayout";
import Spinner from "../Atoms/Spinner";
import Copyright from "../Atoms/copyright";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      dataOut {
        _id
        success
        name
        email
        picture
        description
        token
      }
      errorOut {
        name
        message
      }
    }
  }
`;

function SignIn(props) {
  const classes = useStyles();
  let history = useHistory();

  const { context, setContext } = useContext(UserContext);
  const [input, setInput] = useState({email: "ihoskovecpetr@gmail.com", password: "heslo"});
  const windowSize = useWindowSize();

  const [login, { loading, error, data }] = useMutation(LOGIN);
  
  //useScrollDisable();

  const { dataOut } = data ? data.login : { dataOut: undefined };
  const { errorOut } = data ? data.login : { errorOut: undefined };

  if (context.success) {
    setTimeout(() => {
      console.log("SignIn: EVENT", window.eventId)
      if(window.eventId){
        history.push(`/event/${window.eventId}`);
      }else{
        history.goBack();
      }
    }, 100);
  }

  if (dataOut && dataOut.success && !context.name) {
    window.localStorage.setItem("token", dataOut.token);
    setContext(prev => { return {
      ...prev,
      _id: dataOut._id,
      success: dataOut.success,
      name: dataOut.name,
      email: dataOut.email,
      picture: dataOut.picture,
      description: dataOut.description,
      token: dataOut.token
    }});
  }

  const onSignIn = (e) => {
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
  }

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  // const Email = ({ cy, disabled }) => {
  //   // let Err = false
  //   // if(dataOut) Err = !dataOut.success
  //   // console.log("Pass data: ", dataOut);
  //   // console.log("Pass Err: ", Err);
  //   return (
  //     <TextField
  //       margin="normal"
  //       required
  //       // disabled={disabled}
  //       // defaultValue="test@gmail.com"
  //       value={email}
  //       fullWidth
  //       // data-cy={cy}
  //       onChange={handleUsernameChange}
  //       label="Email Address"
  //       name="email"
  //       id="email"
  //       // autoComplete="email"
  //       //autoFocus
  //       error={errorOut}
  //       // error={data ? data && !data.success : false}
  //     />
  //   );
  // };

  const Pass = ({ disabled }) => {

    return (
      <TextField
        margin="normal"
        required
        fullWidth
        disabled={disabled}
        // defaultValue="heslo"
        name="password"
        label="Password"
        type="password"
        id="password"
        // autoComplete="current-password"
        error={errorOut}
      />
    );
  };

  return (
    <ModalLayout>
      <Paper 
        className={classes.paper}
        style={{
          marginTop: 0.12 * windowSize.height,
          maxHeight: 0.86 * windowSize.height
        }}>
        {dataOut && dataOut.success && (
          <Avatar className={classes.avatarSuccess}>
            <CheckCircleOutlineIcon />
          </Avatar>
        )}
        {!loading && !dataOut && (
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
          {errorOut &&
            errorOut.map(item => (
              <Alert severity="error" key={item.message}>
                {item.message}
              </Alert>
            ))}


          {!data && 
                <TextField
                margin="normal"
                required
                value={input.email}
                fullWidth
                onChange={handleInputChange}
                label="Email Address"
                name="email"
                id="email"
                error={errorOut}
              />
           }
          {!dataOut || dataOut.success && (
                  <TextField
                  margin="normal"
                  required
                  disabled={true}
                  value={input.email}
                  fullWidth
                  label="Email Address"
                  name="email"
                  id="email"
                  error={errorOut}
                />
          )}
          {errorOut && (
            <Animated
              animationIn="shake"
              animationOut="fadeOut"
              animationInDelay={0}
              animationInDuration={800}
              isVisible={true}
            >
              <TextField
                margin="normal"
                required
                value={input.email}
                fullWidth
                onChange={handleInputChange}
                label="Email Address"
                name="email"
                id="email"
                error={errorOut}
              />
            </Animated>
          )}

          {!data && <TextField
                margin="normal"
                required
                fullWidth
                value={input.password}
                onChange={handleInputChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                error={errorOut}
              />}
          {dataOut && dataOut.success && <TextField
                margin="normal"
                required
                fullWidth
                value={input.password}
                onChange={handleInputChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                error={errorOut}
              />}
          {errorOut && (
            <Animated
              animationIn="shake"
              animationOut="fadeOut"
              animationInDelay={0}
              animationInDuration={1000}
              isVisible={true}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                value={input.password}
                onChange={handleInputChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                error={errorOut}
              />
            </Animated>
          )}

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            id="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              onSignIn(e)
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
                    <b>HERE</b>
                  </p>
                }
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
              >
                <Link href="/signup" className={classes.linkClass}>
                  Sign Up here! OR FB
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
    alignItems: "center",
    color: "white",
    //overflowY: "scroll",
    //backgroundColor: theme.palette.darkGrey
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.charliePink
  },
  avatarSuccess: {
    margin: theme.spacing(1),
    backgroundColor: "green"
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

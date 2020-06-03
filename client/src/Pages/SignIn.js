import React, { useState, useEffect, useContext } from "react";
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
import CloseIcon from '@material-ui/icons/Close';
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles";

import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import { Animated } from "react-animated-css";

import { UserContext } from "../userContext";
import { useScrollDisable } from "../Hooks/useScrollDisable";
import { useWindowSize } from "../Hooks/useWindowSize";

import ModalLayout from "../Layouts/ModalLayout";
import Spinner from "../Atoms/Spinner";
import Copyright from "../Atoms/copyright";
import SocialLogins from "../Atoms/SignIn/SocialLogins";

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

function SignIn({propContext}) {
  const classes = useStyles();
  let history = useHistory();

  const { context, setContext } = useContext(UserContext);
  const [localContext, setLocalContext] = useState({});
  const [input, setInput] = useState({email: "ihoskovecpetr@gmail.com", password: "heslo"});
  const windowSize = useWindowSize();

  const [login, { loading, error, data }] = useMutation(LOGIN);
  
  const { dataOut } = data ? data.login : { dataOut: undefined };
  const { errorOut } = data ? data.login : { errorOut: undefined };

  if (localContext.success) {
    setTimeout(() => {
      if(window.eventId){
        console.log("After Sign In goEvent")
        history.push(`/event/${window.eventId}`);
      }else{
        console.log("After Sign In Goback")
        // history.goBack();
      }
    }, 100);
  }

  useEffect(() => {
    if(propContext){
      setLocalContext(propContext)
    }else{
      setLocalContext(context)
    }
  },[context, propContext])

  if (dataOut && dataOut.success && !localContext.name) {
    window.localStorage.setItem("token", dataOut.token);
    console.log("document.getElementById(rememberMe).checked: ", document.getElementById("rememberMe").checked)
    setContext(prev => { return {
      ...prev,
      _id: dataOut._id,
      success: dataOut.success,
      name: dataOut.name,
      email: dataOut.email,
      picture: dataOut.picture,
      description: dataOut.description,
      token: dataOut.token,
      rememberSignIn: document.getElementById("rememberMe").checked,
    }});
  }

  const onSignIn = (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
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

  return (
    <ModalLayout>
      <Paper 
        className={classes.paper}
        style={{
          marginTop: 0.10 * windowSize.height,
          maxHeight: 0.88 * windowSize.height,
          overflow: 'scroll'
        }}>
          <Grid container justify='flex-end'>
            <Grid item>
              <CloseIcon onClick={() => {history.goBack()}} />
            </Grid>
          </Grid>
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
        {loading ? <Typography component="h1" variant="h5">
          Loading...
        </Typography>
        : <>
        <Typography component="h1" variant="h5" className={classes.signInLine} >
          Sign in
        </Typography> 
        </>}
        <Typography className={classes.signInText}>
          with your social network
        </Typography>

        <SocialLogins />

        <Grid container alignItems='center' justify='center'>
          <Grid item xs={5}>
            <div className={classes.greyLine} ></div>
          </Grid>
          <Grid item xs={1}>
            <Grid container justify='center'>
              <Grid item>
                or
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <div className={classes.greyLine} ></div>
          </Grid>
          </Grid>

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
            control={<Checkbox id="rememberMe" color="primary" />}
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
              <Link variant="body2">
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
                  horizontal: "left"
                }}
              >
                <Link href="/signup" className={classes.linkClass}>
                  Sign Up here!
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
    // marginTop: theme.spacing(10),
    padding: theme.spacing(3, 2),
    width: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.charliePink
  },
  avatarSuccess: {
    backgroundColor: "green"
  },
  spinner: {
  },
  signInLine:{
    margin: 5
  },
  signInText: {
    margin: 5,
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'grey'
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  greyLine: {
    height: 2,
    width: '100%',
    backgroundColor: "lightGrey"
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

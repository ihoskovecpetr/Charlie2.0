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

  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const windowSize = useWindowSize();

  const [login, { loading, error, data }] = useMutation(LOGIN);
  
  useScrollDisable();

  const { dataOut } = data ? data.login : { dataOut: undefined };
  const { errorOut } = data ? data.login : { errorOut: undefined };
  console.log("DataOut: ", dataOut);
  if (user.success) {
    setTimeout(() => {
      history.goBack();
    }, 100);
  }

  if (dataOut && dataOut.success && !user.name) {
    console.log("XXman user: ", user);
    window.localStorage.setItem("token", dataOut.token);
    setUser({
      _id: dataOut._id,
      success: dataOut.success,
      name: dataOut.name,
      email: dataOut.email,
      picture: dataOut.picture,
      description: dataOut.description,
      token: dataOut.token
    });
  }

  const Email = ({ data, cy, disabled }) => {
    return (
      <TextField
        margin="normal"
        required
        disabled={disabled}
        defaultValue="test@gmail.com"
        fullWidth
        data-cy={cy}
        onChange={e => {
          console.log("E? ", e.target.value);
          setEmail(e.target.value);
        }}
        value={email}
        label="Email Address"
        name="email"
        autoComplete="email"
        //autoFocus
        error={data ? data && !data.success : false}
      />
    );
  };

  const Pass = ({ data, disabled }) => {
    return (
      <TextField
        margin="normal"
        required
        fullWidth
        disabled={disabled}
        defaultValue="heslo"
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        error={data ? data && !data.success : false}
      />
    );
  };

  return (
    <ModalLayout>
      <Paper 
        className={classes.paper}
        style={{
          marginTop: 0.12 * windowSize.height,
          height: 0.86 * windowSize.height
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

          {!data && <Email data={data} cy={"emailSignIn"} />}
          {dataOut && dataOut.success && (
            <Email data={data} cy={"emailSignIn"} disabled={true} />
          )}
          {errorOut && (
            <Animated
              animationIn="shake"
              animationOut="fadeOut"
              animationInDelay={0}
              animationInDuration={800}
              isVisible={true}
            >
              <Email data={data} />
            </Animated>
          )}

          {!data && <Pass data={data} />}
          {dataOut && dataOut.success && <Pass data={data} disabled={true} />}
          {errorOut && (
            <Animated
              animationIn="shake"
              animationOut="fadeOut"
              animationInDelay={0}
              animationInDuration={1000}
              isVisible={true}
            >
              <Pass data={data} />
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
              e.preventDefault();
              //let email = document.getElementById("email").value;
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
                    <b>HERE</b>
                  </p>
                }
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
              >
                <Link href="/signup" className={classes.linkClass}>
                  Sign In here!
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
    overflowY: "scroll",
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

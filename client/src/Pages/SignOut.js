import React, { useContext, useEffect } from "react";
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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import gql from "graphql-tag";
import { Redirect, useHistory } from "react-router-dom";

import { UserContext } from "../userContext";
import { useScrollDisable } from "../Hooks/useScrollDisable";

import ModalLayout from "../Layouts/ModalLayout";
import Spinner from "../Atoms/Spinner";
import Copyright from "../Atoms/copyright";
import { f } from "@fullpage/react-fullpage";

function SignIn(props) {
  const classes = useStyles();
  useScrollDisable();
  const { context } = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    console.log("Only first mount OF CREATE");
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if(context.success === false){
      setTimeout(() => {
      history.push("/");
    }, 100);
    }
 }, [context]);

  const Out = () => {
    context.deleteToken()
    context.getLoggedInUser()
  };

  return (
    //<Container component="main" maxWidth="xs" className={classes.container}>
    <ModalLayout>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ExitToAppIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Out
        </Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={e => {
            e.preventDefault();
            Out();
          }}
        >
          Sing Out
        </Button>
      </Paper>
      <Box mt={8} className={classes.copyRight}>
        <Copyright />
      </Box>
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
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "50%"
  },
  copyRight:{
    color: "white"
  },
}));

export default SignIn;

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
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

import { UserContext } from "../userContext";
import Spinner from "../Atoms/Spinner";

const USER_EVENTS = gql`
  query userEvents($user_id: ID!) {
    userEvents(user_id: $user_id) {
      success
      name
      _id
      dateStart
    }
  }
`;

// function tryLogin() {
//   console.log("Mutation data: ", data);
// }

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
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

function Profile() {
  const classes = useStyles();
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { loading, error, data } = useQuery(USER_EVENTS, {
    variables: { user_id: user._id }
  });
  //const [newUser, { loading, error, data }] = useMutation(NEW_USER);

  console.log("user Events: ", data);
  //   if (data && data.userEvents) {
  //     return (
  //       <Container>
  //         <Paper className={classes.paper}>
  //           {data.userEvents.map(event => (
  //             <p>{event.name}</p>
  //           ))}
  //         </Paper>
  //       </Container>
  //     );
  //   }
  return (
    <Container>
      <Paper className={classes.paper}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={user.picture}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
        </div>
        {loading && <Spinner />}
        {data &&
          data.userEvents &&
          data.userEvents.map(event => <p>{event.name}</p>)}
        <Box mt={8}>
          <Copyright />
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;

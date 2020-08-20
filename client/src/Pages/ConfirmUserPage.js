import React, { useState, useContext, useEffect } from "react";

import { withRouter, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { UserContext } from "src/Contexts/userContext";

import ModalLayout from "src/Layouts/ModalLayout";
import Spinner from "src/Atoms/Spinner";

const CONFIRM_QUERY = gql`
  mutation confirmUser($user_id: ID!) {
    confirmUser(user_id: $user_id) {
      dataOut {
        success
      }
      errorOut {
        message
      }
    }
  }
`;

function ConfirmUserPage(props) {
  const classes = useStyles();
  let history = useHistory();
  let query = new URLSearchParams(history.location.search);
  const { context, setContext } = useContext(UserContext);
  const [confirmUser, confirmUserStates] = useMutation(CONFIRM_QUERY);

  const { dataOut } = confirmUserStates.data
    ? confirmUserStates.data.confirmUser
    : { dataOut: undefined };

  useEffect(() => {
    confirmUser({
      variables: {
        user_id: query.get("confirm"),
      },
    });
  }, []);

  const handleGoMenu = () => {
    history.push("/");
  };

  console.log("confirmUserStates: ", confirmUserStates);
  console.log("dataOut: ", dataOut);

  return (
    <ModalLayout>
      <Container maxWidth="sm" className={classes.mainContainer}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.containerGrid}
        >
          {confirmUserStates && confirmUserStates.loading && (
            <>
              <Grid item alignContent="center">
                <Typography variant="h6">LOADING..</Typography>
              </Grid>
              <Grid item>
                <Spinner height={50} width={50} />
              </Grid>
            </>
          )}

          {dataOut && dataOut.success && (
            <>
              <Grid item>
                <Typography variant="h6">Email Confirmed</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGoMenu}
                >
                  Go to APP
                </Button>
              </Grid>
            </>
          )}
          {dataOut && !dataOut.success && (
            <Grid item>
              <Typography variant="h6">confirmation FAILED</Typography>
            </Grid>
          )}
          {!dataOut && confirmUserStates && !confirmUserStates.loading && (
            <Grid item>
              <Typography variant="h6">NO DATA</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </ModalLayout>
  );
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: 80,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "white",
  },
  containerGrid: {
    padding: 10,
    border: "1px solid black",
    borderRadius: 5,
  },
}));

export default withRouter(ConfirmUserPage);

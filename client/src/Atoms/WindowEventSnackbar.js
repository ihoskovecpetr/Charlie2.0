import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  spinnerWrap: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

export default function WindowEventSnackbar(props) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <>
    {window.eventId && <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={window.eventId ? true : false}
              autoHideDuration={6000}
              message={`Event: ${window.eventId}`}
              action={
                <>
                  <Button color="secondary" size="small" onClick={() => {history.replace(`/event/${window.eventId}`)}}>
                    OPEN
                  </Button>
                  <IconButton size="small" 
                            aria-label="close" 
                            color="inherit" 
                            onClick={() => {
                            window.eventId = null
                            }} >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
            />}
    </>
  );
}

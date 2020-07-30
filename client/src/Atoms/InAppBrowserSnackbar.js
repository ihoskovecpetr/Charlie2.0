import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  spinnerWrap: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function WindowEventSnackbar(props) {
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = useState(true);
  const [userAgent, setUserAgent] = useState([]);
  const [inAppBrowser, setInAppBrowser] = useState(false);

  useEffect(() => {
    const openInBrowser = (target, browserScheme) => {
      var ifc = document.createElement("div");
      ifc.innerHTML = `<iframe src='${browserScheme}${target}' style='width:0;height:0;border:0; border:none;visibility: hidden;'></iframe>`;
      document.body.appendChild(ifc);
    };

    const isInApp = (appSpecificUserAgents) => {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      console.log("What navigator.userAgent ", userAgent);
      setUserAgent(userAgent);
      for (var i = 0; i <= appSpecificUserAgents.length; i++) {
        if (userAgent.indexOf(appSpecificUserAgents[i]) > -1) return true;
      }
    };

    const tryOpenBrowser = () => {
      if (document.body) {
        console.log(
          "window.location.href: ",
          window.location.href,
          window.location.href.split("//")[1]
        );
        // window.open(window.location.href, "_blank");
        // openInBrowser(
        //   "www.charliehouseparty.club",
        //   "googlechrome://navigate?url="
        // );
        if (isInApp(["FBAN", "FBAV"])) {
          console.log("SettingInAppBrowser: ");
          setInAppBrowser(true);
          setOpen(true);
          openInBrowser(window.location.href.split("//")[1], "googlechrome://"); //x-web-search://
          // openInBrowser(window.location.href, "googlechrome://navigate?url=");
        }
      } else {
        window.requestAnimationFrame(tryOpenBrowser);
      }
    };

    tryOpenBrowser();
  }, []);

  return (
    <>
      {open && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={open ? true : false}
          autoHideDuration={6000}
          message={`You are inside of app browser: ${userAgent}`}
          action={
            <>
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  history.replace(`/event/${window.eventId}`);
                }}
              >
                OPEN
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                  window.eventId = null;
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      )}
    </>
  );
}

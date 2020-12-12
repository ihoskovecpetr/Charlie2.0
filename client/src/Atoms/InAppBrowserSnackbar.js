import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import LinkIcon from "@material-ui/icons/Link";

import { NavLink } from "react-router-dom";

export default function WindowEventSnackbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [inAppBrowser, setInAppBrowser] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  useEffect(() => {
    const openInBrowser = (target, browserScheme) => {
      var ifc = document.createElement("div");
      ifc.innerHTML = `<iframe src='${browserScheme}${target}' style='width:0;height:0;border:0; border:none;visibility: hidden;'></iframe>`;
      document.body.appendChild(ifc);
    };

    const isInApp = appSpecificUserAgents => {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      console.log("What navigator.userAgent ", userAgent);
      for (var i = 0; i <= appSpecificUserAgents.length; i++) {
        if (userAgent.indexOf(appSpecificUserAgents[i]) > -1)
          return appSpecificUserAgents[i];
      }
      return false;
    };

    const tryOpenBrowser = () => {
      if (document.body) {
        console.log(
          "window.location.href: ",
          window.location.href,
          window.location.href.split("//")[1]
        );
        let isInAppBrowser = isInApp(["FBAN", "FBAV"]);

        if (isInAppBrowser) {
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

  const handleCopyLink = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 1000);
  };

  const handleOpenCloseTooltip = () => {
    setOpenTooltip(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={open ? true : false}
        autoHideDuration={6000}
        message={[
          <b style={{ fontSize: "1.5em" }}>Please OPEN in Safari or Chrome</b>,
          " or any other browser.",
          "You are inside of an APP browser! ",
          <NavLink to={`/about`}>
            <i style={{ textDecoration: "underline" }}>Want to know why?</i>
          </NavLink>,
          <input
            id="myInput"
            style={{ width: "100%", marginTop: "10px", fontSize: "1.5em" }}
            value={window.location.href}
          />,
        ]}
        action={
          <>
            <Tooltip
              title="link copied"
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleOpenCloseTooltip}
              open={openTooltip}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="top"
            >
              <Button
                variand="outlined"
                color="secondary"
                fullWidth
                onClick={handleCopyLink}
              >
                <LinkIcon /> copy current URL
              </Button>
            </Tooltip>
          </>
        }
      />
    </>
  );
}

const useStyles = makeStyles(theme => ({}));

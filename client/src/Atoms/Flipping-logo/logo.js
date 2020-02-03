import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./logo.css";

import charlie from "./charlie.png";

function Logo(props) {
  let count = 0;
  let interV;

  useEffect(() => {
    interV = setInterval(() => {
      rotate();
      setTimeout(() => {
        rotate();
      }, 600);
    }, 3000);

    return () => {
      clearInterval(interV);
    };
  }, []);

  function rotate() {
    if (count < 4 && document.getElementById("main_logo")) {
      if (
        document.getElementById("main_logo").classList.value.includes("flipped")
      ) {
        document.getElementById("main_logo").classList.remove("flipped");
      } else {
        document.getElementById("main_logo").classList.add("flipped");
      }
    } else {
      clearInterval(interV);
    }
    count++;
  }

  return (
    <>
      <div
        className="flip-card"
        data-testid="logo"
        style={{ height: props.height, width: props.width }}
      >
        <div className="flip-card-inner" id="main_logo">
          <div className="flip-card-front">
            <img src={charlie} />
          </div>
          <div className="flip-card-back">
            <img src={charlie} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Logo;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  }
}));

import React from "react";
import ReactDOM from "react-dom";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

//import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import ReactFullpage from "@fullpage/react-fullpage";

import { useXsSize } from "../Hooks/useXsSize";

import AboutScreen1 from "../Molecules/about/about_screen_1";
import AboutScreen2 from "../Molecules/about/about_screen_2";
import Screen6 from "../Molecules/menu/screen_6";

import "./index.css";

const fullpageOptions = {
  anchors: ["firstPage", "secondPage", "thirdPage"],
  sectionsColor: ["#282c34", "#ff5f45", "#0798ec"],
  callbacks: ["onLeave"],
  scrollOverflow: true
};

const useStyles = makeStyles(theme => ({
  aboutContainer: {
    flexGrow: 1,
    paddingTop: 20
  },
  basicPaper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    backgroundColor: "lightGrey"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  cardMediaBottom: {
    width: "100%",
    height: 200,
    paddingTop: "56.25%" // 16:9
  },

  text: {
    height: 0,
    top: 30,
    position: "relative",
    color: "white",
    textAlign: "center"
  },
  blackContainer: {
    background: theme.palette.darkGrey,
    color: "white"
  },
  pinkContainer: {
    //ackground: theme.palette.charliePink,
    //color: "white",
  },
  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(5)
  }
}));




const FullpageWrapper = fullpageProps => {
  const classes = useStyles();
  const { xs_size_memo } = useXsSize();


  if(!xs_size_memo){ 
    return (
    <ReactFullpage
      {...fullpageProps}
      render={({ state, fullpageApi }) => {
        console.log("render prop change", state); // eslint-disable-line no-console
        
          return (
            <div>
              <div id="fullpage-wrapper">
                <div className="section">
                  <AboutScreen1 />
                </div>
                <div className="section">
                  <AboutScreen2 />
                </div>
                <Screen6 />
              </div>
            </div>
          );
      }}
    />
  )}else {
    return (
      <>
     <AboutScreen1 />
     <AboutScreen2 />
     <Screen6 />
      </>
    )
  }
};

export default FullpageWrapper;

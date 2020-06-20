import React, { useState, useEffect, useContext, useMemo } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core/styles";


// import "./Menu.css";

// import { useMutation, useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";
import { NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
import { useXsSize } from "../Hooks/useXsSize";

import Carousel from "../Atoms/carousel";
import Screen1 from "../Molecules/menu/screen_1";
import Screen1Mobile from "../Molecules/menu/Screen1Mobile";
import ScreenHowItWorks from "../Molecules/menu/Screen_2_HowItWorks";
import Screen2 from "../Molecules/menu/screen_2";
import Screen3 from "../Molecules/menu/screen_3";
import Screen4 from "../Molecules/menu/screen_4";
import Posts from "../Molecules/menu/posts";
import Screen6 from "../Molecules/menu/screen_6";
import BlogPost1 from "../Molecules/menu/blog/BlogPost1";
import BlogPost2 from "../Molecules/menu/blog/BlogPost2";
import BlogPost3 from "../Molecules/menu/blog/BlogPost3";


export default function Menu(props) {
  const classes = useStyles();

  const { context, setContext } = useContext(UserContext);
  const { xs_size_memo } = useXsSize();
  const [windowHeight, setWindowHeight] = useState(0);

  // const [newBookingsArr, { loading, error, data }] = useMutation(
  //   USER_NEW_BOOKINGS,
  //   {
  //     variables: { user_id: context._id }
  //   }
  // );

  useEffect(() => {
    console.log("Scroll TOP")
    window.scrollTo(0, 0);
  }, []);



  useEffect(() => {
    console.log(
      "UseEffect Find out if document has property onclick ",
      "onclick" in document.createElement("div") ? "Joo" : "Noo"
    );

      setWindowHeight(window.innerHeight)

  }, []);

  useEffect(() => {

    function handleToken(ev){
      console.log("BEFORE UNLOAD: ", context.rememberSignIn)
      ev.preventDefault();
      if(!context.rememberSignIn){
        console.log("DELETING TOKEN: ")
        window.localStorage.setItem("token", `_deleted_COZ_notrembr${context.rememberSignIn}`)
      }
    }

    console.log("Setting beforeunload listener", context.rememberSignIn)
    window.addEventListener("beforeunload", handleToken);

    return(() => {
      console.log("Removing beforeunload listener")
      window.removeEventListener("beforeunload", handleToken);
    })
  },[context.rememberSignIn]);


  const handleCloseAlert = () => {
    setContext(prev => { return {
      ...prev,
      showAlertAdviseEmail: false,
    }});
  }

  // if (context.success) {
  //   {
  //     !loading && !data && newBookingsArr();
  //   }
  // }

  const fullpageOptions = {
    anchors: ["firstPage", "secondPage", "thirdPage"],
    sectionsColor: ["#282c34", "#ff5f45", "#0798ec"],
    callbacks: ["onLeave"],
    scrollOverflow: true
  };

  return (
      <div id="menu_wrap" className={classes.menuWrap} style={{position: "absolute", top: 0, overflow: "hidden"}}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        severity="info"
        open={context.showAlertAdviseEmail}
        classes={{
          root: classes.rootSnackbar
        }}
        // autoHideDuration={6000}
        onClose={handleCloseAlert}
        message="Successfully signed up! Go to email and cofirm your identity by clicking on link"
        action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseAlert}>
              <CloseIcon fontSize="small" />
            </IconButton>
        }
      />
        {xs_size_memo ? <Screen1Mobile /> : <Screen1 />}
        <ScreenHowItWorks />
        <Screen2 />
        <Screen3 //loading={loading} data={data} 
        />
        <Screen4 props={props} />
        <BlogPost1 />
        <BlogPost2 />
        <BlogPost3 />
        <Screen6 />
      </div>
  )

}

const useStyles = makeStyles(theme => ({
  menuWrap: {
    top: 0,
    width: "100%",
  },
  cardMediaBottom: {
    width: "100%",
    height: 200,
    paddingTop: "56.25%" // 16:9
  },
  menuButton: {
    background: "white"
  },
  avatar: {
    width: 100,
    height: 100
  },
  gridLogo: {
    textAlign: "center"
  },
  button: {
    width: 100,
    margin: 10,
    fontWeight: "700 !important"
  },
  text: {
    color: "black",
    fontWeight: 400
  },
  blackContainer: {
    background: theme.palette.darkGrey,
    color: "white",
    padding: 10,
    marginBottom: 20
  },
  pinkContainer: {
    //ackground: theme.palette.charliePink,
    //color: "white",
  },
  rootSnackbar: {
    backgroundColor: 'skyblue'
  },
  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    paddingTop: 20,
    fontSize: 20,
    margin: 10
  },
  defaultContent: {
    margin: 20,
    fontWeight: 500
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(5)
  }
}));

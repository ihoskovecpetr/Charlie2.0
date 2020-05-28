import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  gql
} from "apollo-boost";
import { BatchHttpLink } from "apollo-link-batch-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";

import countdown from "countdown";
import { useCountdown } from "src/Hooks/useCountdown";
import { UserContext } from "src/userContext";
import { displayDate } from "src/Services/transform-services";
import DrawerWrap from 'src/Molecules/map/DrawerWrap';


var GQL_ENDPOINT = `http://localhost:4005/graphql`;
if (process.env.NODE_ENV == "production") {
  GQL_ENDPOINT = `https://${window.location.host}/graphql`;
}
const httpLink = new BatchHttpLink({
  uri: GQL_ENDPOINT,
  headers: {
    authorization: window.localStorage.getItem("token")
  }
});

var WS_ENDPOINT = `ws://localhost:4005/subs`;
if (process.env.NODE_ENV == "production") {
  WS_ENDPOINT = `wss://${window.location.host}/subs`;
}

const wsLink = new WebSocketLink({
  uri: WS_ENDPOINT,
  options: {
    reconnect: true
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all"
    }
  }
});

function Infowindow(props) {
  const classes = useStyles();
  const { counteddownDate } = useCountdown(props.location.dateStart, 1)
  // const { context, setContext } = useContext(UserContext);
  let Pic = props.location.imagesArr[0];
  let Author = props.location.author;

  useEffect(() => {
    return(() => {
      console.log("INfowindw unmounting")
    })
  },[])

  const handleClickOpen = (e) => {
      console.log("handleClickOpen EE")
      e.preventDefault();
      e.stopPropagation();
      if (props.context.success) {
        console.log("openModalEvent EE")
        props.setOpenDrawer(true)
      } else {
        props.redirectLogin();
      }
  }

  // const openModalEvent = () => {
  //   console.log("openModalEvent EE")
  //   // return(
  //   //               <ApolloProvider client={client}>
  //   //                 <UserContext.Provider value={() => {}} >
  //   //                   <Router>
  //   //                     <DrawerWrap open={true} event={props.location} context={props.context} setContext={props.setContext} />
  //   //                   </Router>
  //   //                 </UserContext.Provider>
  //   //               </ApolloProvider>
  //   // ) 

  //   // var string = "/event/" + props.location._id;
  //   // window.AppHistory.push(string, {
  //   //   //tady: napsatStateKdyžtak 
  //   // });
  // };

  return (
    <>
      <CssBaseline />
      <Grid container justify="center" className={classes.topbar}>
        <Grid>
          <h3 className={classes.h3Name}>{props.location.name}</h3>
        </Grid>
      </Grid>
      {/* <img src={Pic.src} alt={Pic.capture} className={classes.img} /> */}
      <div className={classes.img} style={{backgroundImage: `url('${Pic.thumbnail}')`}}> </div>
      <Grid container justify="center" className={classes.authorGrid}>
        <Avatar
          alt="Author picture"
          src={Author.picture}
          className={classes.avatar}
        />
      </Grid>

      <Grid
        container
        justify="center"
        alignItems="flex-end"
        className={classes.infoWindBody}
      >
        <Grid item xs={12}>
            <Typography variant="body1" className={classes.countdown}>
              {/* {countdown(
                new Date(props.location.dateStart),
                new Date(),
                "X",
                1
              ).toString()}{" "}
              ago */}
              start {counteddownDate}
            </Typography>
          </Grid>
      </Grid>

      {/* <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.gridButton}
      >
        <Button
          variant="contained"
          className={classes.buttonOpen}
          onClick={handleClickOpen}
        >
          OPEN {!props.context.success && "(LOGIN)"}
        </Button>
      </Grid> */}
    </>
  );
}

const useStyles = makeStyles(theme => ({
  img: {
    height: 100,
    width: 200,
    backgroundSize: "cover"
  },
  topbar: {
    position: "absolute",
    //height: 35,
    width: "100%",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.3) 100%)",
    color: "white",
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center"
  },
  buttonOpen: {
    width: "100%",
    background: "#E8045D",
    color: "white",
    borderRadius: 0
  },
  h3Name: {
    display: "inline-block",
    margin: "0.5em",
    fontSize: 18
  },

  authorGrid: {
    top: -30,
    height: 0,
    position: "relative"
  },
  avatar: {
    border: "2px solid #FFFFFF",
    width: 60,
    height: 60
  },
  infoWindBody: {
    position: "relative",
    height: 60,
  },
  countdown: {
    position: "relative",
    width: "100%",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 600,
    color: "grey",
    textAlign: "center"
  },
  gridButton: {
    width: "100%",
    bottom: 0,
    position: "absolute",
    color: "white",
    flexGrow: 1
  }
}));

export default Infowindow;

import React, { useState, useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

// import { withRouter, useHistory, NavLink } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
// import Gallery from "react-grid-gallery";
// import { displayDate } from "src/Services/transform-services";

import { useXsSize } from "src/Hooks/useXsSize";

import PlayPageList from "src/Molecules/play/PlayPageList";
import PlayPageGallery from "src/Molecules/play/PlayPageGallery";
import PlayPageMap from "src/Molecules/play/PlayPageMap";

import { GET_ONE_EVENT } from "src/Services/GQL/GET_ONE_EVENT";
import { EVENT_RATINGS } from "src/Services/GQL/EVENT_RATINGS";
import EventButtons from "src/Molecules/event/EventButtons";
import RatingCard from "src/Molecules/RatingCard";
import Spinner from "src/Atoms/Spinner";

let dataMock;

function DrawerWrap(props) {
  console.log("DrawerWrap props: ", props);
  const classes = useStyles();
  // let history = useHistory();
  const { xs_size_memo } = useXsSize();
  const [windowHeight, setWindowHeight] = useState(0);
  const [openState, setOpenState] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_ONE_EVENT, {
    variables: { event_id: props.event._id },
  });
  const ratings = useQuery(EVENT_RATINGS, {
    variables: { event_id: props.event._id },
  });

  useEffect(() => {
    if (props.open) {
      setOpenState(true);
    } else {
      setOpenState(false);
    }
  }, [props.open]);

  console.log("DrawerWrap print context:", props.context);
  useEffect(() => {
    window.scrollTo(0, 0);
    setWindowHeight(window.innerHeight);
  }, []);

  let dataDB;

  const PaperEvent = props => {
    return (
      <Paper
        className={classes.paper}
        style={{ height: 1 * windowHeight, width: 400, maxWidth: "86vw" }}
      >
        {props.children}
      </Paper>
    );
  };

  if (dataMock) {
    dataDB = dataMock;
  } else if (data) {
    dataDB = data;
  }

  if (dataDB && dataDB.getOneEvent.success) {
    return (
      <Drawer
        anchor={"left"}
        open={openState}
        onClose={() => setOpenState(!openState)}
      >
        <div id="paper_scrollable">
          <PaperEvent>
            <Grid container justify="center">
              <Grid item className={classes.nameGrid}>
                {dataDB.getOneEvent.hide && (
                  <Typography
                    component="h3"
                    variant="h3"
                    className={classes.name}
                  >
                    CANCELLED
                  </Typography>
                )}
              </Grid>
              <PlayPageGallery event={dataDB.getOneEvent} />
              <EventButtons
                event={dataDB && dataDB.getOneEvent}
                propContext={props.context}
                name="DrawerWrap"
              />
              <PlayPageList
                event={dataDB.getOneEvent}
                propContext={props.context}
                bookings={dataDB.getOneEvent.bookings}
                GQL_refetch={GET_ONE_EVENT}
                refetchVariables={{ id: props.event._id }}
                paddingSides={xs_size_memo ? "0px" : "20px"}
              />

              <Grid
                container
                justify="center"
                alignItems="center"
                alignContent="center"
                direction="column"
                className={classes.ratingContainer}
              >
                {ratings.data &&
                  ratings.data.showRatings.map((rating, index) => (
                    <Grid item>
                      <RatingCard rating={rating} key={index} />
                    </Grid>
                  ))}
              </Grid>
              <EventButtons
                event={dataDB && dataDB.getOneEvent}
                propContext={props.context}
                name="DrawerWrap"
              />
            </Grid>
          </PaperEvent>
        </div>
      </Drawer>
    );
  }
  if (dataDB && dataDB.getOneEvent.success == false) {
    return (
      <Drawer
        anchor={"left"}
        open={openState}
        onClose={() => setOpenState(!openState)}
      >
        <PaperEvent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // history.goBack();
            }}
          >
            Back
          </Button>
          <Paper>
            <Typography component="div">
              {dataDB.getOneEvent.message}
            </Typography>
          </Paper>
        </PaperEvent>
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor={"left"}
      open={openState}
      onClose={() => setOpenState(!openState)}
    >
      <PaperEvent>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ width: "100%", height: 300 }}
        >
          <Grid item>
            <Spinner height={100} width={100} />
          </Grid>
        </Grid>
      </PaperEvent>
    </Drawer>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    background: "#242323",
    color: "white",
    overflow: "scroll",
    borderRadius: 0,
    paddingBottom: 50,
    // borderBottomRightRadius: 0,
    // borderBottomLeftRadius: 0
  },
  gridButtons: {
    background: "black",
    color: "white",
    marginTop: "0 !important",
    //padding: theme.spacing(3, 2),
    display: "flex",
    //width: 300,
    overflow: "scroll",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    boxShadow: "0px -2px 5px 0px rgba(200,200,200,0.3)",
  },
  closeButton: {
    background: theme.palette.violetova,
    color: "white",
  },
  nameGrid: {
    margin: 15,
  },
  name: {
    textAlign: "center",
  },
  ratingContainer: {
    width: "100%",
    overflow: "scroll",
  },
}));

export default DrawerWrap;

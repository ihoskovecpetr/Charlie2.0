import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExploreIcon from "@material-ui/icons/Explore";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { withTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import ReactFullpage from "@fullpage/react-fullpage";
import clsx from "clsx";

import "./Menu.css";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
import Spinner from "../Atoms/Spinner";
import EventCard from "../Molecules/event-card";
import Carousel from "../Atoms/carousel";
import Copyright from "../Atoms/copyright";
import SocialLine from "../Atoms/social-line";
import FlippingLogo from "../Atoms/Flipping-logo/logo";
import MainScreen from "../Molecules/MainScreen";

import SurfImage from "../Images/srf.jpg";
//import SunsetBig from "../Images/Sunset_big.jpg";
import Empire from "../Images/empire-wide.png";
import EmpireOriginal from "../Images/empire.jpg";
//import SunsetSmall from "../Images/Sunset_small.jpg";
//import SunsetSmall from "../Images/sunset_sml.png";
//import Empire from "../Images/empire_mobile.png";
//import BackgroundSmall from "../Images/empire_mobile.png";

const USER_NEW_BOOKINGS = gql`
  mutation newestUserBookings($user_id: ID!) {
    newestUserBookings(user_id: $user_id) {
      event {
        _id
        name
        description
        dateStart
        imagesArr {
          caption
          src
          thumbnail
          thumbnailHeight
          thumbnailWidth
          scaletwidth
          marginLeft
          vwidth
        }
        author {
          _id
          name
          picture
        }
      }
    }
  }
`;

export default function Menu(props) {
  const classes = useStyles();

  const { user, setUser } = useContext(UserContext);

  const [newBookingsArr, { loading, error, data }] = useMutation(
    USER_NEW_BOOKINGS,
    {
      variables: { user_id: user._id }
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("rerender Menu");
  });

  if (user.success) {
    {
      !loading && !data && newBookingsArr();
    }
  } else {
    //console.log("NO USR: ", user);
  }

  const MainScreenMemo = useMemo(
    () => (
      <MainScreen
        finishedAnimation={props.finishedAnimation}
        setFinishedAnimation={props.setFinishedAnimation}
      />
    ),
    [props.finishedAnimation, props.setFinishedAnimation]
  );

  console.log("ToBeSroted PRE: ", data);
  let Sorted = [];
  if (data) {
    Sorted = data.newestUserBookings.sort(function(a, b) {
      let aDate = new Date(a.event.dateStart);
      let bDate = new Date(b.event.dateStart);
      if (aDate > bDate) {
        return 1;
      }
      if (aDate < bDate) {
        return -1;
      }
    });
  }

  console.log("ToBeSroted: AFTER", Sorted);
  //console.log("Menu props: ", props);

  const fullpageOptions = {
    anchors: ["firstPage", "secondPage", "thirdPage"],
    sectionsColor: ["#282c34", "#ff5f45", "#0798ec"],
    callbacks: ["onLeave"],
    scrollOverflow: true
  };

  return (
    <ReactFullpage
      {...props}
      render={({ state, fullpageApi }) => {
        console.log("render prop change", state); // eslint-disable-line no-console

        return (
          <div>
            <div id="fullpage-wrapper">
              <div
                className="section s1"
                style={{ backgroundImage: `url(${EmpireOriginal})` }}
              >
                <Container maxWidth="md" className={classes.container_1}>
                  {
                    //MainScreenMemo
                  }
                  <Grid container>
                    <Grid item xs={12} sm={6} className={classes.quarter_grid}>
                      <Grid
                        container
                        justify="center"
                        direction="row"
                        alignItems="flex-end"
                        className={classes.menuGrid_1}
                      >
                        <Grid item xs={6}>
                          <Typography variant="h5" className={classes.charlie}>
                            CHARLIE
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h5" className={classes.party}>
                            PARTY
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} className={classes.quarter_grid}>
                      <Grid
                        container
                        justify="center"
                        alignItems="flex-end"
                        className={classes.menuGrid_2}
                      >
                        <Grid item>
                          {/* <Grid container justify="center">
                        <Avatar
                          className={classes.avatar}
                          alt="Remy Sharp"
                          src="https://res.cloudinary.com/party-images-app/image/upload/v1557794256/ojkgl1hkiljwij69njbb.png"
                        />
                      </Grid> */}
                          <FlippingLogo height={100} width={100} />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} className={classes.quarter_grid}>
                      <Grid
                        container
                        justify="center"
                        direction="row"
                        className={classes.menuGrid_3}
                      >
                        <NavLink to={`/map`}>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                            >
                              MAP
                            </Button>
                          </Grid>
                        </NavLink>
                        <NavLink to={`/create`}>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                            >
                              CREATE
                            </Button>
                          </Grid>
                        </NavLink>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} className={classes.quarter_grid}>
                      <Grid
                        container
                        justify="center"
                        direction="row"
                        className={classes.menuGrid_3}
                      >
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            component="h6"
                            className={classes.text}
                          >
                            “Have you ever seen house on the beach or flat in a
                            skyscraper and wonder how would it be to enjoy a
                            drink in there?”
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              </div>
              <div className="section s2">
                <Container maxWidth="xl" className={classes.contentWrap}>
                  <Grid container>
                    <Grid item>
                      <Typography className={classes.defaultHeader}>
                        CHARLIE <b>INTRO</b>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.containerIframe}>
                    <Grid item className={classes.iFrame}>
                      <iframe
                        src="https://www.youtube.com/embed/PogfNxsugF0"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={classes.iFrame}
                      ></iframe>
                    </Grid>
                  </Grid>
                </Container>
              </div>

              <div className="section s3">
                <Container maxWidth="xl" className={classes.contentWrap}>
                  <Grid item>
                    <Typography className={classes.defaultHeader}>
                      YOUR <b>NEXT</b> EVENTS
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Grid justify="center" container style={{ width: "100%" }}>
                      <Grid item style={{ width: "90%" }}>
                        {!loading && !data && <p>No data</p>}
                        {loading && <Spinner height={100} width={100} />}
                        {Sorted.map((event, index) => {
                          if (new Date(event.event.dateStart) >= new Date()) {
                            return (
                              <EventCard event={event.event} key={index} />
                            );
                          } else {
                            //console.log("PAST EVENT: ", event.event.dateStart);
                            return null;
                          }
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item>
                      <Typography className={classes.defaultHeader}>
                        MAIN <b>MISSION</b>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        className={classes.defaultContent}
                      >
                        Charlie is here to connect owners or renters of
                        miscelanous places with guest for a joyfull evening
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item>
                      <Typography className={classes.defaultHeader}>
                        SUMMMARY OF <b>KEY FEATURES</b>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                    className={classes.blackContainer}
                  >
                    <Grid item>
                      <Typography variant="h5" gutterBottom>
                        DISCOVER
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.handleDrawerToggle}
                        className={classes.menuButton}
                      >
                        <ExploreIcon fontSize="large" color="secondary" />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" gutterBottom>
                        Find your favourite event and enjoy evening
                      </Typography>
                      <ul>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            JOIN event
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Bring your own drinks
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            ENJOY evening
                          </Typography>
                        </li>
                      </ul>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                    className={classes.blackContainer}
                  >
                    <Grid item>
                      <Typography variant="h5" gutterBottom>
                        CREATE
                      </Typography>
                    </Grid>

                    <Grid item>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.handleDrawerToggle}
                        className={classes.menuButton}
                      >
                        <AccessibilityNewIcon
                          fontSize="large"
                          color="secondary"
                        />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" gutterBottom>
                        Create your first CHARLIE event and start earning
                      </Typography>

                      <ul>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            CREATE event
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            Welcomme guests
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" gutterBottom>
                            EARN entry fee
                          </Typography>
                        </li>
                      </ul>
                    </Grid>
                  </Grid>
                </Container>
              </div>

              <div className="section s4">
                <Container maxWidth="xl" className={classes.container_4}>
                  <Grid item>
                    <Typography className={classes.defaultHeader}>
                      CHARLIE <b>BLOG</b>
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                  >
                    <Grid item></Grid>
                    <Grid item>
                      <Avatar
                        alt="Author"
                        sizes="large"
                        src="https://res.cloudinary.com/party-images-app/image/upload/v1553553202/eredff7zmlr65fm3bbue.png"
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">
                        ‘Its all about the view from my balcony’
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.defaultContent}
                      >
                        I do have nice flat in the Sydney and I love to share
                        this place with other people via Charlie. I do offer bbq
                        nights twice a week and it alone can pay my rent in this
                        beautiful place
                      </Typography>
                    </Grid>
                  </Grid>
                  <Carousel
                    images={[
                      "https://res.cloudinary.com/party-images-app/image/upload/v1553554542/ixgdwwuaasm5f49cfhpb.png",
                      "https://res.cloudinary.com/party-images-app/image/upload/v1553554542/ukwkr5wraaezjeipbrgr.png",
                      "https://res.cloudinary.com/party-images-app/image/upload/v1553559427/xbugpqhcehvfatnpdrxi.png"
                    ]}
                  />
                  <Grid item>
                    <Typography className={classes.defaultHeader}>
                      CHARLIE <b>BLOG</b>
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                  >
                    <Grid item></Grid>
                    <Grid item>
                      <Avatar
                        alt="Author"
                        sizes="large"
                        src="https://res.cloudinary.com/party-images-app/image/upload/v1553557168/cgnjfgxcbegttvftwbox.png"
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">
                        ‘People like my food’
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.defaultContent}
                      >
                        I do not have the best flat with view on the bay, but I
                        know how to make delicious food which make all the
                        guests happy and they love to come again and again.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Carousel
                    images={[
                      "https://res.cloudinary.com/party-images-app/image/upload/v1553558709/hdyqsmvfmye0abxbmo6v.png",

                      "https://res.cloudinary.com/party-images-app/image/upload/v1553558710/kuh7whsezyjnbbtlphg2.png",

                      "https://res.cloudinary.com/party-images-app/image/upload/v1553558710/fh4mqii1zzgtd2sircza.png"
                    ]}
                  />
                  <Grid item>
                    <Typography className={classes.defaultHeader}>
                      CHARLIE <b>BLOG</b>
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                  >
                    <Grid item></Grid>
                    <Grid item>
                      <Avatar
                        alt="Author"
                        sizes="large"
                        src="https://res.cloudinary.com/party-images-app/image/upload/v1555136792/qcb1xwjgfb1ozhhgmajg.jpg"
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">
                        ‘I love to share my great flat with others’
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.defaultContent}
                      >
                        Come to hang out in my flat, it is pretty neat place. I
                        do love this energy from young people. I use it as a
                        motivation in my life and my business.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Carousel
                    images={[
                      "https://res.cloudinary.com/party-images-app/image/upload/v1555137923/hp9x1b6w6hxx7ipk9nyw.png",
                      "https://res.cloudinary.com/party-images-app/image/upload/v1555137919/k74xwqzb3ssmh0mezqg5.png",
                      "https://res.cloudinary.com/party-images-app/image/upload/v1555137918/ozocoqfkuouyaomybh4u.png"
                    ]}
                  />
                </Container>
              </div>

              <div className="section s5">
                <Container maxWidth="md" className={classes.contentWrap}>
                  <Grid item>
                    <Typography className={classes.defaultHeader}>
                      <b>CONTACT</b> US
                    </Typography>
                  </Grid>
                  <Grid container className={classes.pinkContainer}>
                    <form className={classes.form} noValidate>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        //color="secondary"

                        //inputRef={inputName}
                        label="Your Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows="5"
                        //color="secondary"
                        id="question"
                        //inputRef={inputName}
                        label="Your Question"
                        name="question"
                        autoComplete="text"
                        autoFocus
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        //onClick={e => onSubmit(e)}
                      >
                        Send
                      </Button>
                    </form>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      direction="column"
                    >
                      <Grid item>
                        <Typography variant="body2">GET IN TOUCH</Typography>
                      </Grid>

                      <Grid item>
                        <Typography variant="body2">
                          Sydney NSW, Australia
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          charliepartyapp@gmail.com
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">0435-388-698</Typography>
                      </Grid>
                      <SocialLine color="secondary" />

                      <CardMedia
                        className={classes.cardMediaBottom}
                        image="https://res.cloudinary.com/party-images-app/image/upload/v1559960064/uvic6vretl0zabrk570z.png"
                        title="Paella dish"
                      />
                      <SocialLine color="secondary" />
                      <Grid item>
                        <NavLink to={`/privacy-policy`}>
                          <Grid item>
                            <Typography variant="subtitle2">
                              PRIVACY POLICY
                            </Typography>
                          </Grid>
                        </NavLink>
                      </Grid>
                      <Grid item>
                        <NavLink to={`/faq`}>
                          <Grid item>
                            <Typography variant="subtitle2">F.A.Q.</Typography>
                          </Grid>
                        </NavLink>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box mt={8}>
                    <Copyright />
                  </Box>
                </Container>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

const useStyles = makeStyles(theme => ({
  container_1: {
    height: "100vh",
    color: "black"
    //background: "rgba(25,25,25,0.3)"
  },
  container_2: {
    height: "90vh",
    color: "black",
    background: "black"
  },
  quarter_grid: {
    height: "40vh"
  },
  menuGrid_1: {
    height: "20vh",
    [theme.breakpoints.down("sm")]: {
      //
    }
  },
  menuGrid_2: {
    [theme.breakpoints.down("sm")]: {
      //
    }
  },
  menuGrid_3: {
    padding: 20,
    marginTop: "20px"
  },
  cardMediaBottom: {
    width: "100%",
    height: 200,
    paddingTop: "56.25%" // 16:9
  },
  menuButton: {
    background: "white"
  },
  party: {
    textAlign: "center",
    fontWeight: 300,
    letterSpacing: 8,
    color: "black",
    padding: "10px"
  },
  charlie: {
    textAlign: "center",
    fontWeight: 800,
    padding: "10px",
    color: "black"
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
  containerIframe: {
    width: "100%"
  },
  iFrame: {
    width: "100%",
    height: 250
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(5)
  }
}));

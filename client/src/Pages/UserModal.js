import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Rating from "@material-ui/lab/Rating";

import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { USER_RATINGS } from "src/Services/GQL/USER_RATINGS";

import ModalLayout from "src/Layouts/ModalLayout";
import RatingCard from "src/Molecules/RatingCard";
import ReceivedRatingsCard from "src/Atoms/Profile/ReceivedRatingsCard";
import Spinner from "../Atoms/Spinner";
import Copyright from "../Atoms/copyright";
import AverageRatingStars from "src/Atoms/AverageRatingStars";

const GET_USER = gql`
  query getOneUser($user_id: ID!) {
    getOneUser(user_id: $user_id) {
      success
      _id
      name
      picture
      email
      telephone
      description
      createdEvents {
        _id
        name
      }
    }
  }
`;

function UserModal() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  let query = new URLSearchParams(history.location.search);

  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: {
      user_id: query.get("user"),
      // limit: 2
    },
    //skip: !id,
    //pollInterval: 500
  });

  const ratingStates = useQuery(USER_RATINGS, {
    variables: { host_id: query.get("user") },
  });

  console.log("RENDERING USER MODAL: ", data);

  let dataDB;

  const PaperUser = props => {
    return (
      <Grid container justify="center" className={classes.paperUser}>
        {props.children}
      </Grid>
    );
  };

  if (data) {
    dataDB = data;
  }

  if (loading) {
    return (
      <ModalLayout>
        <PaperUser>
          <Spinner height={50} width={50} />
        </PaperUser>
      </ModalLayout>
    );
  }
  // if (error) {
  //   return (
  //     <BaseAndPaper>
  //       <p>Error...</p>
  //     </BaseAndPaper>
  //   );
  // }

  console.log("DATA EVENT jsou tady: ", dataDB);

  if (dataDB && dataDB.getOneUser.success) {
    return (
      <ModalLayout>
        <PaperUser className={classes.paper}>
          <Grid
            container
            // justify="center"
            // alignItems="center"
            className={classes.mainGrid}
          >
            <Grid item xs={4}>
              <Grid container justify="center" alignItems="stretch">
                <Grid item>
                  <Avatar
                    className={classes.avatarMain}
                    src={dataDB.getOneUser.picture}
                  >
                    <LockOutlinedIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="h4"
                align="left"
                className={classes.nameHeader}
              >
                {dataDB.getOneUser.name}
              </Typography>
              <Typography
                variant="subtitle1"
                align="left"
                className={classes.email}
              >
                <a href={`mailto:${dataDB.getOneUser.email}`}>
                  {dataDB.getOneUser.email}
                </a>
              </Typography>
              <Typography
                variant="subtitle1"
                align="left"
                className={classes.email}
              >
                <a href={`tel:${dataDB.getOneUser.telephone}`}>
                  {dataDB.getOneUser.telephone}
                </a>
              </Typography>
              <Grid container justify="flex-start" alignItems="center">
                <Grid item>
                  <Typography variant="subtitle1" className={classes.email}>
                    <AverageRatingStars userId={dataDB.getOneUser._id} />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid
                container
                justify="center"
                className={classes.descriptionCont}
              >
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    className={classes.descriptionText}
                  >
                    {dataDB.getOneUser.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.whiteLine}></div>

            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="subtitle1" className={classes.subHeader}>
                    RATINGS
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  {ratingStates.loading && <Spinner height={100} width={100} />}

                  {ratingStates.data &&
                    ratingStates.data.showRatings &&
                    ratingStates.data.showRatings.map((rating, index) => (
                      <ReceivedRatingsCard rating={rating} key={index} />
                    ))}

                  {ratingStates.data &&
                    ratingStates.data.showRatings &&
                    ratingStates.data.showRatings.length == 0 && (
                      <Typography
                        variant="subtitle1"
                        className={classes.subHeader}
                      >
                        No ratings available
                      </Typography>
                    )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PaperUser>
        <Box mt={8}>
          <Copyright />
        </Box>
      </ModalLayout>
    );
  }

  return (
    <ModalLayout>
      <PaperUser>No DATA</PaperUser>
    </ModalLayout>
  );
}

const useStyles = makeStyles(theme => ({
  opaque: {
    // flexGrow: 1,
    background: "rgba(100,10,10,0.2)",
    width: "100%",
    position: "absolute",
    "z-index": 10,
  },
  mainGrid: {
    width: "100%",
  },
  paperUser: {
    // background: "#600328",
    background: "linear-gradient(90deg, #E8045D 0%, #76517B 100%)",
    color: "white",
    marginTop: "10vh",
    padding: theme.spacing(3, 2),
    height: "80vh",
    overflow: "scroll",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  avatarMain: {
    width: "3rem",
    height: "3rem",
    margin: 10,
    border: "2px solid white",
    boxShadow: "4px 3px 5px 0px rgba(0,0,0,0.5)",
    backgroundColor: theme.palette.secondary.main,
  },
  nameHeader: {
    // textAlign: "center",
  },

  email: {
    // textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  ratingContainer: {
    width: "100%",
    maxHeight: 200,
    overflow: "scroll",
  },
  descriptionCont: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
  },
  descriptionText: {
    margin: 10,
  },
  eventButtons: {
    position: "absolute",
    bottom: 0,
  },
  subHeader: {
    fontWeight: 600,
    margin: 15,
  },
  whiteLine: {
    height: 1,
    backgroundColor: "white",
  },
}));

export default UserModal;

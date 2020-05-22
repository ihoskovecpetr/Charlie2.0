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

import { withRouter, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { USER_RATINGS } from "src/Services/GQL/USER_RATINGS";

import ModalLayout from "../Layouts/ModalLayout";
import RatingCard from "../Molecules/rating-card";
import RatingCardNew from "src/Atoms/Profile/RatingCardNew";
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
      description
      createdEvents{
        _id
      	name
      }
    }
  }
`;


function UserModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: {  user_id: props.match.params.id,
                  // limit: 2 
                }
    //skip: !id,
    //pollInterval: 500
  });

  const ratingStates = useQuery(USER_RATINGS, {
    variables: { host_id: props.match.params.id }
  });

  // const ratingStates ={
  //   data: {
  //     showRatings: [
  //   {
  //     guest: {
  //       picture: "https://scontent-prg1-1.xx.fbcdn.net/v/t1.0-9/61950201_2397914480420841_8357957627317059584_n.jpg?_nc_cat=108&_nc_oc=AQnV7_8s9Q3H0-hAymHvaGXLt-97aDdy46ODFVxEtKOsUJ_LaKdLA7KV-8HQqKodG40&_nc_ht=scontent-prg1-1.xx&oh=43eb25b5ccd547e3e0ebc377dd31adb0&oe=5E87BF91",
  //       name: "Rater Ivo"
  //     },
  //     message: "Cool event bro",
  //     ratingValue: 5,
  //     createdAt: "2019"
  //   }
  // ]
  //   }
  // }
  console.log("RENDERING USER MODAL");

  let dataDB;

  const PaperUser = props => {
    return <Grid container justify="center" className={classes.paperUser}>
              {props.children}
          </Grid>;
  };

  // if (bookingStates.loading) {
  //   return <>Creating Booking</>;
  // }

  // if (bookingStates.data) {
  //   refetch();
  // }

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
            justify="center"
            alignItems="center"
            alignContent="center"
            className={classes.mainGrid}
          >
            <Grid item xs={12}>
              <Grid container justify="center">
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
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.nameHeader}>
                {dataDB.getOneUser.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.email}>
                {dataDB.getOneUser.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="subtitle1" className={classes.email}>
                  <AverageRatingStars userId={dataDB.getOneUser._id}/>
              </Typography>
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.description}>
                {dataDB.getOneUser.description}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.subHeader}>
                RATINGS
              </Typography>
            </Grid>

            {ratingStates.loading && <Spinner height={100} width={100} />}
            {ratingStates.data &&
              ratingStates.data.showRatings &&
              ratingStates.data.showRatings.map((rating, index) => (
                <RatingCardNew rating={rating} key={index} />
              ))}
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
      <PaperUser>
        No DATA
      </PaperUser>
    </ModalLayout>
  );
}

const useStyles = makeStyles(theme => ({
  opaque: {
    // flexGrow: 1,
    background: "rgba(100,10,10,0.2)",
    width: "100%",
    position: "absolute",
    "z-index": 10
  },
  mainGrid: {
    width: "100%"
  },
  paperUser: {
    // background: "#600328",
    background:
    "linear-gradient(90deg, #E8045D 0%, #76517B 100%)",
    color: "white",
    marginTop: "10vh",
    padding: theme.spacing(3, 2),
    height: "80vh",
    overflow: "scroll",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  avatarMain: {
    height: 120,
    width: 120,
    margin: 10,
    border: "2px solid white",
    boxShadow: "4px 3px 5px 0px rgba(0,0,0,0.5)",
    backgroundColor: theme.palette.secondary.main
  },
  nameHeader: {
    textAlign: "center"
  },
  email: {
    textAlign: "center"
  },
  ratingContainer: {
    width: "100%",
    maxHeight: 200,
    overflow: "scroll"
  },
  eventButtons: {
    position: "absolute",
    bottom: 0
  },
  subHeader:{
    fontWeight: 600,
    margin: 15
  }
}));

export default withRouter(UserModal);

import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { withRouter, useHistory, NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Gallery from "react-grid-gallery";
import gql from "graphql-tag";
import { displayDate } from "../Services/transform-services";

import { UserContext } from "../userContext";
import ModalLayout from "../Layouts/ModalLayout";
import EventButtons from "../Molecules/event-buttons";
import RatingCard from "../Molecules/rating-card";
import Spinner from "../Atoms/Spinner";
import PendingGuest from "../Molecules/event/pending-guest";
import ConfirmedGuest from "../Molecules/event/confirmed-guest";
import Copyright from "../Atoms/copyright";

const GET_USER = gql`
  query getOneUser($user_id: ID!) {
    getOneUser(id: $user_id) {
        success
        _id
        name
        picture
      
  }
}
`;

const HOST_RATINGS = gql`
  query showRatings($host_id: ID!) {
    showRatings(host_id: $host_id) {
      guest {
        picture
        name
      }
      message
      ratingValue
      createdAt
    }
  }
`;

let dataMock;
dataMock = {
  getOneUser: {
    success: true,
      name: "Petr H. McOcker",
      picture:
        "https://scontent-prg1-1.xx.fbcdn.net/v/t1.0-9/61950201_2397914480420841_8357957627317059584_n.jpg?_nc_cat=108&_nc_oc=AQnV7_8s9Q3H0-hAymHvaGXLt-97aDdy46ODFVxEtKOsUJ_LaKdLA7KV-8HQqKodG40&_nc_ht=scontent-prg1-1.xx&oh=43eb25b5ccd547e3e0ebc377dd31adb0&oe=5E87BF91"
  },

};



function UserModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: { user_id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });

  // const ratingStates = useQuery(HOST_RATINGS, {
  //   variables: { host_id: props.match.params.id}
  // });

  const ratingStates ={
    data: {
      showRatings: [
    {
      guest: {
        picture: "https://scontent-prg1-1.xx.fbcdn.net/v/t1.0-9/61950201_2397914480420841_8357957627317059584_n.jpg?_nc_cat=108&_nc_oc=AQnV7_8s9Q3H0-hAymHvaGXLt-97aDdy46ODFVxEtKOsUJ_LaKdLA7KV-8HQqKodG40&_nc_ht=scontent-prg1-1.xx&oh=43eb25b5ccd547e3e0ebc377dd31adb0&oe=5E87BF91",
        name: "Rater Ivo"
      },
      message: "Cool event bro",
      ratingValue: 5,
      createdAt: "2019"
    }
  ]
    }
  }   
  console.log("RENDERING USER MODAL");



  let dataDB;

  const PaperUser = props => {
    return <Paper className={classes.paper}>{props.children}</Paper>;
  };

  // if (bookingStates.loading) {
  //   return <>Creating Booking</>;
  // }

  // if (bookingStates.data) {
  //   refetch();
  // }

  if (dataMock) {
    dataDB = dataMock;
  } else if (data) {
    dataDB = data;
  }

  if (loading) {
    return (
      <ModalLayout>
        <PaperUser>
          <Spinner />
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
        <PaperUser>
          <Grid
            container
            justify="center"
            alignItems="center"
            alignContent="center"
            direction="column"
            spacing={2}
            className={classes.mainGrid}
          >
            <Grid item>
        <Avatar className={classes.avatar} src={dataDB.getOneUser.picture}>
          <LockOutlinedIcon />
        </Avatar>
        </ Grid>
        <Grid item>
          <Typography variant="subtitle2">
          {dataDB.getOneUser.name}
          </Typography>
        </Grid>

        {ratingStates.loading && <Spinner />}
            {ratingStates.data &&
              ratingStates.data.showRatings &&
              ratingStates.data.showRatings.map((rating, index) => (
                <RatingCard rating={rating} key={index} />
              ))}
            
           </ Grid>

       
        </PaperUser>
        <Box mt={8}>
          <Copyright />
        </Box>
      </ModalLayout>
    );
  }

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
  paper: {
    background: "red",
    color: "white",
    marginTop: theme.spacing(8),
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 380,
    minWidth: 250,
    maxHeight: "80vh",
    overflow: "scroll"
  },
  closeButton: {
    background: theme.palette.violetova,
    color: "white"
  },
  nameGrid: {
    borderBottom: "solid 1px white"
  },
  avatar: {
    height: 80,
    width: 80,
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  standardHeading: {
    //borderBottom: "solid 1px grey",
    fontWeight: 600,
    color: "grey"
  },

  ratingContainer: {
    width: "100%",
    maxHeight: 200,
    overflow: "scroll"
  },
  eventButtons: {
    position: "absolute",
    bottom: 0
  }
}));

export default withRouter(UserModal);

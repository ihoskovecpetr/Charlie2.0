import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter, Link } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const FEW_EVENTS = gql`
  query eventGeoDay(
    $date: String!
  ) {
    eventGeoDay(date: $date) {
      _id
      name
      confirmed
      author {
        name
        picture
      }
      dateStart
      geometry {
        coordinates
      }
      address
      capacityMax
      price
      description
      BYO
      freeSnack
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
    }
  }
`;

let dataMock = {
      _id: "2sdf2sdfs2sfdsdfs2",
      success: true,
      author: {
        name: "Petr H.",
        picture: "https://scontent-prg1-1.xx.fbcdn.net/v/t1.0-9/61950201_2397914480420841_8357957627317059584_n.jpg?_nc_cat=108&_nc_oc=AQnV7_8s9Q3H0-hAymHvaGXLt-97aDdy46ODFVxEtKOsUJ_LaKdLA7KV-8HQqKodG40&_nc_ht=scontent-prg1-1.xx&oh=43eb25b5ccd547e3e0ebc377dd31adb0&oe=5E87BF91",
      },
      name: "Mock data Party",
      geometry: { coordinates: [50.040112099, 14.428] },
      lng: 14.45,
      lat: 50,
      addressGoogle: "addressGoogle",
      addressCustom: "addressCustom",
      address: "address",
      eventType: 1,
      dateStart: "2019-10-10",
      price: 12,
      capacityMax: 20,
      BYO: true,
      imagesArr: [
        {
          caption: "No more pictures for this Event",
          src:
            "https://s1.at.atcdn.net/wp-content/uploads/2019/03/icebergs-800x584.jpg",
          thumbnail:
          "https://s1.at.atcdn.net/wp-content/uploads/2019/03/icebergs-800x584.jpg",
          thumbnailHeight: 10,
          thumbnailWidth: 10,
          scaletwidth: 100,
          marginLeft: 0,
          vwidth: 100,
          isSelected: false
        }
      ],
      description: "Desc",
      confirmed: true,
      hide: false
    };

const useStyles = makeStyles(theme => ({
 opaque: {
        // flexGrow: 1,
        background: 'rgba(100,10,10,0.2)',
        width: '100%',
        position: 'absolute',
        "z-index": 10
      },
container: {
    background: 'rgba(10,10,100,0.2)',
        height: '100vh',
      },
      root: {
        padding: theme.spacing(3, 2),
      },

}));

function Event(props) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(FEW_EVENTS, {
    variables: { id: props.match.params.id }
  });

  let dataDB;

  if(data){
      console.log("DATA EVENT jsou tady: ", data)
  }


  if (dataMock) {
    dataDB = dataMock;
  } else if (data) {
    dataDB = data.eventGeoDay;
  }
  console.log("Event íííííííííííííííd=================================== ", props)

  return (
    <div className={classes.opaque} >
        <Container maxWidth="lg" fixed={true} >
            <Grid container justify="center" alignItems="center" className={classes.container}>
            <Paper className={classes.root}>
            <Grid item >
            <Link  to={{  pathname: `/`,
                          state: {  justGoBack: true
                                     }}}>
                    <Button variant="contained" color="primary" >
                        Close
                    </Button>
              </Link>
                </Grid>
                <Grid item >
                    <Button variant="contained" color="primary" onClick={() => {props.history.goBack()}} >
                        {dataDB.name}
                    </Button>
                </Grid>
                <Grid item >
                        {dataDB.name}
                </Grid>
                </Paper>
        </Grid>
      </Container>
      <CssBaseline />
    </div>
  );
}

export default withRouter(Event)
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { NavLink } from "react-router-dom";

import Spinner from "src/Atoms/Spinner";

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

export default function UserCardPlay(props) {
  const classes = useStyles();
  let history = useHistory();

  const [value, setValue] = React.useState(2);
  const { loading, error, data } = useQuery(HOST_RATINGS, {
    variables: { host_id: props.author._id }
  });


  const SubHeader = () => {
    if (loading) {
      return <Spinner height={100} width={100} />;
    }
    if (data) {
      let celkem;
      let arrValues = data.showRatings.map(x => x.ratingValue);
      const arrAvg = arrValues.reduce((a, b) => a + b, 0) / arrValues.length;
      return (
        <>
          <Rating name="simple-controlled" readOnly value={arrAvg} />
        </>
      );
    }
  };

  return (<>
    <Grid container>
      <Grid item xs={4} className={classes.clickableProfile} onClick={() => {history.push(`/user/${props.author._id}`)}}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={props.author.picture}
                />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="subtitle2" className={classes.text}>
                    {props.author.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
          
      </Grid>
      <Grid item  xs={8}>
      <Grid container>
        <Grid item >
          <SubHeader />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" className={classes.text}>
              {props.author.description}
          </Typography>
        </Grid>
      </Grid>
      </Grid>
    </Grid>
    {/* <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={props.author.picture}
          >
            <LockOutlinedIcon />
          </Avatar>
        }
        action={
          <NavLink to={`/user/${props.author._id}`}>
            <IconButton aria-label="settings">
              <MoreVertIcon className={classes.dots} />
            </IconButton>
          </NavLink>
        }
        title={
          <Typography variant="subtitle2" className={classes.whiteText}>
            {props.author.name}
          </Typography>
        }
        subheader={
          <>
            <SubHeader />
          </>
        }
      />
    </Card> */}
    </>
  );
}

const useStyles = makeStyles(theme => ({

  avatar: {
    backgroundColor: red[500],
    // color: "lightgrey",
    width: 70,
    height: 70,
    boxShadow: '2px 2px 5px rgba(149, 165, 166, 0.5)'
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  clickableProfile: {
    cursor: 'pointer'
  }
}));

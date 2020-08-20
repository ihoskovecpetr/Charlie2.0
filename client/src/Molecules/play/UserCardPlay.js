import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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

  const { loading, error, data } = useQuery(HOST_RATINGS, {
    variables: { host_id: props.author._id },
  });

  const SubHeader = () => {
    if (loading) {
      return <Spinner height={100} width={100} />;
    }
    if (data) {
      let arrValues = data.showRatings.map(x => x.ratingValue);
      const arrAvg = arrValues.reduce((a, b) => a + b, 0) / arrValues.length;
      return (
        <>
          <Rating name="simple-controlled" readOnly value={arrAvg} />
        </>
      );
    }
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={4}
          className={classes.clickableProfile}
          onClick={() => {
            history.push(`/?user=${props.author._id}`);
          }}
        >
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
                  <Typography
                    variant="subtitle2"
                    className={classes.textAuthor}
                  >
                    {props.author.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item>
              <SubHeader />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" className={classes.textDesc}>
                {props.author.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: red[500],
    // color: "lightgrey",
    width: 70,
    height: 70,
    boxShadow: "2px 2px 5px black",
  },
  textAuthor: {
    marginTop: 10,
    marginBottom: 10,
    textDecoration: "underline",
    color: "#E8045D",
  },
  textDesc: {
    overflow: "hidden",
    "text-overflow": "ellipsis",
    "-webkit-line-clamp": 3,
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
  },
  clickableProfile: {
    cursor: "pointer",
  },
}));

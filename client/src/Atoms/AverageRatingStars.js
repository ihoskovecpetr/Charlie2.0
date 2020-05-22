import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

import { useQuery } from "@apollo/react-hooks";

import { useAverageRating } from "src/Hooks/useAverageRating";
import { USER_RATINGS } from "src/Services/GQL/USER_RATINGS";


export default function AverageRatingStars({userId}) {
  const classes = useStyles();

  const ratingStates = useQuery(USER_RATINGS, {
    variables: { host_id: userId }
  });

  const { averageRating } = useAverageRating(ratingStates.data && ratingStates.data.showRatings)


  return (<Rating name="simple-controlled" readOnly value={averageRating} />);
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: 5
  },
  mainHeader: {
    width: "100%",
    fontWeight: 600,
    color: "grey"
  },
}));
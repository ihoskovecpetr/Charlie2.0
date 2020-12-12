import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Rating from "@material-ui/lab/Rating";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { NavLink } from "react-router-dom";

import Spinner from "../../Atoms/Spinner";

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

export default function UserCard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const { loading, error, data } = useQuery(HOST_RATINGS, {
    variables: { host_id: props.author._id },
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

  return (
    <Card className={classes.card}>
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
          <NavLink to={`/?user=${props.author._id}`}>
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
    </Card>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    width: "100%",
    background: "#600328",
  },
  avatar: {
    backgroundColor: red[500],
    color: "lightgrey",
  },
  dots: {
    color: "lightgrey",
  },
  whiteText: {
    color: "lightgrey",
  },
}));

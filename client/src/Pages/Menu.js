import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { lightBlue } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    backgroundColor: "lightGrey"
  }
}));

export default function Menu(props) {
  const classes = useStyles();

  console.log("Menu props: ", props);

  return (
    <div>
      {props.ListOfUrls.map((item, index) => (
        <NavLink to={`/${item}`} key={index}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              {props.ListOfNames[index]}
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
          </Paper>
        </NavLink>
      ))}
    </div>
  );
}

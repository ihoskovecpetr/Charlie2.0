import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CreateIcon from "@material-ui/icons/Create";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

import { NavLink, useHistory } from "react-router-dom";

import { useXsSize } from "../../Hooks/useXsSize";
import { UserContext } from "../../userContext";

export default function ProfileTopBox({ error }) {
  const classes = useStyles();
  const history = useHistory();
  const { md_size_memo } = useXsSize();
  const { context } = useContext(UserContext);

  return (
    <>
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        style={{
          // backgroundImage: `url(${context.picture})`,
          background: md_size_memo
            ? null
            : "linear-gradient(90deg, rgba(29,47,94,1) 0%, rgba(123,81,117,1) 100%)"
        }}
        className={classes.mainContainer}
      >
        <Grid
          item
          style={{ paddingTop: md_size_memo ? 80 : 40 }}
          className={classes.profileTopBox}
        >
          <Grid container direction="row">
            <Grid item xs={4}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Avatar
                    className={classes.pen}
                    onClick={() => {
                      history.push(`/signout`);
                    }}
                  >
                    <ExitToAppIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container justify="center">
                <Grid item>
                  <Avatar className={classes.avatar} src={context.picture}>
                    <LockOutlinedIcon />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Avatar className={classes.pen}>
                <CreateIcon />
              </Avatar>
            </Grid>
          </Grid>

          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography component="h1" variant="h5">
                {context.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{context.email}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <Rating name="simple-controlled" readOnly value={4} />
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">{context.description}</Typography>
              {error && <h1>ERROR</h1>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className={classes.wrapB}>
      <Grid container 
            justify="center" 
            className={classes.mainContainerB}>

      </Grid>
      </div> */}
    </>
  );
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    // height: 500,
    backgroundSize: "cover",
    backgroundPosition: "center"
    // filter: "blur(4px)"
  },
  wrapB: {
    height: 0
  },
  mainContainerB: {
    position: "relative",
    height: 500,
    top: -500,
    color: "white"
  },
  profileTopBox: {
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    // background: "linear-gradient(90deg, rgba(76,113,209,1) 0%, rgba(162,88,222,1) 100%)",
    width: "100%",
    height: "100%",
    paddingBottom: 20
  },
  buttonNavi: {
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)"
  },
  avatar: {
    height: 80,
    width: 80,
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "4px 3px 5px 0px rgba(0,0,0,0.5)"
  },
  pen: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(0,0,0,0.3)",
    boxShadow: "4px 3px 5px 0px rgba(0,0,0,0.5)"
  }
}));

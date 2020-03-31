import React, { useState, useContext, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CreateIcon from "@material-ui/icons/Create";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

import { NavLink, useHistory } from "react-router-dom";

import { useXsSize } from "../../Hooks/useXsSize";
import { UserContext } from "../../userContext";

export default function ProfileTopBox({ error }) {
  const classes = useStyles();
  const history = useHistory();
  const { md_size_memo } = useXsSize();
  const { context } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false)

  const inputDescription = useRef(null);
  const inputEmail = useRef(null);
  const inputName = useRef(null);


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
            <Grid item xs={4} onClick={() => {setExpanded(!expanded)}}>
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
              <Typography variant="body1" className={classes.oneLineDescription}>{context.description}</Typography>
              {error && <h1>ERROR</h1>}
            </Grid>
          </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Grid item className={classes.descWrap}>
        <Typography variant="body1" className={classes.standardHeading}>NAME</Typography>
              <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="filled"
                      defaultValue={context.name}
                      inputRef={inputName}
                      className={classes.textFieldDesc}
                      multiline
                      rows="2"
                    />
        <Typography variant="body1" className={classes.standardHeading}>EMAIL</Typography>
              <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="filled"
                      defaultValue={context.email}
                      inputRef={inputEmail}
                      className={classes.textFieldDesc}
                      multiline
                      rows="2"
                    />
        <Typography variant="body1" className={classes.standardHeading}>DESCRIPTION</Typography>
              <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="filled"
                      defaultValue={context.description}
                      inputRef={inputDescription}
                      className={classes.textFieldDesc}
                      multiline
                      rows="4"
                    />
                                <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >SAVE</Button>
            </Grid>
        </ Collapse>
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    // height: 500,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // filter: "blur(4px),"
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
  oneLineDescription: {
    width: "100%",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    backgroundColor: "rgba(255,255,255,0.2)"
  },
  descWrap: {
    width: "100%",
    padding: 5,
  },
  textFieldDesc: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.2)"
  },
  standardHeading: {
    width: '100%',
    fontWeight: 500,
    // color: "lightGrey",
    textAlign: 'left',
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 10,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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

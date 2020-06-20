import React, { useState, useContext, useRef, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CreateIcon from "@material-ui/icons/Create";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { NavLink, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { UPDATE_USER } from "src/Services/GQL/UPDATE_USER";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";

import { findEmpty } from "src/Services/functions";
import { useXsSize } from "src/Hooks/useXsSize";
import { useAverageRating } from "src/Hooks/useAverageRating";
import { UserContext } from "src/userContext";

import DropzoneSignup from "src/Molecules/DropzoneSignup";

export default function ProfileTopBox({ errorQuery, showRatings }) {
  const classes = useStyles();
  const history = useHistory();
  const { md_size_memo } = useXsSize();
  const { context } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false)
  const [formValue, setFormValue] = useState({ picture: context.picture });
  const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER);

  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputTelephone = useRef(null);
  const inputDescription = useRef(null);

  const { averageRating } = useAverageRating(showRatings)

  const { dataOut } = data ? data.updateUser : { dataOut: undefined };
  const { errorOut } = data ? data.updateUser : { errorOut: undefined };
  

  useEffect(() => {
    if(dataOut && dataOut.success){
      context.getLoggedInUser()
    }
  }, [dataOut])



  const onSubmitHandler = (e) => {
    e.preventDefault();
    let load = {
      _id: context._id,
      name: inputName.current.value,
      email: inputEmail.current.value,
      telephone: inputTelephone.current.value,
      description: inputDescription.current.value,
      picture: formValue ? formValue.picture : context.picture,
      };
    let empty = findEmpty(load);
    empty = empty.map(item => `${item} is Empty`)
    if(load.password != load.password2) empty.push("Not matching passwords")

    console.log("Empty ones: ", empty);

  if (empty.length == 0) {
      updateUser({
        variables: load,
        refetchQueries: () => [
          {
            query: PROFILE_DATA,
            variables: { host_id: context._id }
          }
        ]
      })
      setExpanded(!expanded)
  } else {
      // setFEerrors(empty);
    }
}


  return (
    <div className={classes.mainWrap}>
    <Container
    maxWidth="sm"
    className={classes.mainContainer}
  >
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
        className={classes.mainGridContainer}
      >
        <Grid
          item
          style={{ paddingTop: md_size_memo ? 80 : 40 }}
          className={classes.profileTopBox}
        >
          {expanded ? null 
          :
          <>
          <Grid container direction="row" justify="center">
          <Grid item>
            <Grid container justify="center">
              <Grid item>
                <Avatar className={classes.avatar} src={context.picture}>
                  <LockOutlinedIcon />
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
          <Grid
          container
          justify="center"
          alignItems="center"
          style={{ width: "100%" }}
        >
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.centerText}>
              {context.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" className={classes.centerText}>
              {context.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" className={classes.centerText}>
              {context.telephone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" className={classes.centerText}>
              <Rating name="simple-controlled" readOnly value={averageRating} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" className={classes.oneLineDescription}>
                {context.description}
            </Typography>
            <Typography variant="body1" className={classes.oneLineDescription}>
                {errorQuery && <h1>ERROR while loading profile data</h1>}
            </Typography>
          </Grid>
        </Grid>
          </>
          }

          <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Grid item className={classes.descWrap}>
        <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            className={classes.gridDropzone}
          >
            <Grid item>
              <DropzoneSignup setFormValue={setFormValue} formValue={formValue} />
            </Grid>
          </Grid>
        {/* <Typography variant="body1" className={classes.standardHeading}>NAME</Typography> */}
              <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="filled"
                      defaultValue={context.name}
                      inputRef={inputName}
                      className={classes.textFieldDesc}
                      multiline
                      rows="1"
                    />
        {/* <Typography variant="body1" className={classes.standardHeading}>EMAIL</Typography> */}
        <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="filled"
                      disabled
                      defaultValue={context.email}
                      inputRef={inputEmail}
                      className={classes.textFieldDesc}
                      multiline
                      rows="1"
                    />
          <TextField
                      id="outlined-basic"
                      label="Telephone Nr."
                      variant="filled"
                      defaultValue={context.telephone}
                      inputRef={inputTelephone}
                      className={classes.textFieldDesc}
                      multiline
                      rows="1"
                    />
        {/* <Typography variant="body1" className={classes.standardHeading}>DESCRIPTION</Typography> */}
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
                  className={classes.saveButton}
                  onClick={e => {
                    onSubmitHandler(e)
                  }}
                >
                  SAVE
                </Button>
              </Grid>
        </ Collapse>
        <Grid item xs={12}>
              <Grid container className={classes.buttonContainer}>
              <Grid item xs={6}>
                <Grid container justify="center">
                  <Grid item>
                    <Button
                      className={classes.outButton}
                      onClick={() => {history.push(`/signout`); }}
                    >
                      SIGN OUT
                      {/* <ExitToAppIcon /> */}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container justify="center">
                  <Grid item onClick={() => {setExpanded(!expanded)}}>
                  <Button className={classes.settingsButton}>
                    <CreateIcon />
                    
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </Button>
                </Grid>
                </Grid>
                </Grid>
              </Grid>
            </Grid>
       
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  mainWrap: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  mainContainer: {
    padding: 0
  },
  mainGridContainer: {
    wieght: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // filter: "blur(4px),"
    color: "white"
  },
  profileTopBox: {
    zIndex: 2,
    // background: "linear-gradient(90deg, rgba(76,113,209,1) 0%, rgba(162,88,222,1) 100%)",
    width: "100%",
    height: "100%",
    paddingBottom: 5
  },
  gridDropzone: {
    width: "100%",
    margin: theme.spacing(3, 0, 2)
  },
  oneLineDescription: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    textAlign: "center",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  centerText:{
    textAlign: "center",
    marginTop: 10
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 10
  },
  descWrap: {
    width: "100%",
    padding: 5,
  },
  textFieldDesc: {
    margin: 5,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.6)"
  },
  standardHeading: {
    width: '100%',
    fontWeight: 500,
    // color: "lightGrey",
    textAlign: 'left',
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
  outButton: {
    color: "white",
    fontWeight: 600,
    height: 40,
    width: 120,
    backgroundColor: "rgba(0,0,0,0.3)",
    boxShadow: "4px 3px 5px 0px rgba(0,0,0,0.5)"
  },
  settingsButton: {
    color: "white",
    height: 40,
    width: 120,
    backgroundColor: "rgba(0,0,0,0.3)",
    boxShadow: "4px 3px 5px 0px rgba(0,0,0,0.5)"
  },
  saveButton: {
    color: "white",
    height: 40,
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
    boxShadow: "4px 3px 5px 0px rgba(0,0,0,0.5)"
  },
}));

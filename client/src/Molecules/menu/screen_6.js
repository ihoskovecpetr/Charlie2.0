import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import { NavLink } from "react-router-dom";
import { Animated } from "react-animated-css";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import "../../Pages/Menu.css";
import BluredCity from "../../Images/bluredCity.png";

import Copyright from "../../Atoms/copyright";
import SocialLine from "../../Atoms/social-line";

export default function Screen1() {
  const classes = useStyles();
  const [formValue, setFormValue] = useState({
    message: "Your message",
    email: "your@email.com",
  });


  const handleValueChange = (e) => {
    console.log("e: ", e.currentTarget.name, e.currentTarget.value);
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    setFormValue(prev => {
    return { ...prev, [name]: value };
  });
  }

  const onSubmit = (e) => {
    alert(`This is not implementer yet: ${formValue.email} , ${formValue.message} `)
  }



  return (
    <div className="section s8">
      <Container maxWidth="sm" className={classes.container_6}>
        <Typography className={classes.defaultHeader}>
          <b>CONTACT</b> US
        </Typography>

        <Grid container>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              style={{backgroundColor: "white", borderRadius: 5}}
              label="Your Email"
              value={formValue.email}
              onChange={e => {
                    handleValueChange(e);
                  }}
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows="4"
              style={{backgroundColor: "white", borderRadius: 5}}
              id="question"
              label="Your Question"
              value={formValue.message}
              onChange={e => {
                    handleValueChange(e);
                  }}
              name="message"
              autoComplete="text"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e =>{
                  e.preventDefault()
                  onSubmit(e)
                }
              }
            >
              Send
            </Button>
          </form>
        </Grid>
      </Container>
      <Container maxWidth="xl" className={classes.footer_container}>
        <Container maxWidth="xs" style={{ height: "100%" }}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="row"
            className={classes.grid_foot_container}
          >
            <Grid item xs={12}>
              <Typography variant="body2">GET IN TOUCH</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">Sydney NSW, Australia</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">charliepartyapp@gmail.com</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">0435-388-698</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <SocialLine color="secondary" />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                justify="center"
                direction="row"
                spacing={5}
                alignItems="center"
              >
                <Grid item>
                  <NavLink to={`/privacy-policy`}>
                    <Grid item>
                      <Typography variant="subtitle2">
                        PRIVACY POLICY
                      </Typography>
                    </Grid>
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to={`/faq`}>
                    <Grid item>
                      <Typography variant="subtitle2">F.A.Q.</Typography>
                    </Grid>
                  </NavLink>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box mt={2}>
                  <Copyright />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container_6: {
    color: "black",
    //background: "rgba(25,25,25,0.3)"
    paddingTop: 80,
    paddingBottom: 80
  },

  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    fontSize: 20,
    height: "5vh"
  },
  defaultContent: {
    margin: 20,
    fontWeight: 500
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(5),
  },
  footer_container: {
    flexGrow: 1,
    backgroundImage: `url(${BluredCity})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  grid_foot_container: {
    background: "rgba(0,0,0,0.4)",
    color: "white",
    textAlign: "center"
  }
}));

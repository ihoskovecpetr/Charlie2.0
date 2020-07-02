import React, { useState, useRef } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { NavLink } from "react-router-dom";
import { Animated } from "react-animated-css";

import { makeStyles } from "@material-ui/core/styles";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import BluredCity from "src/Images/bluredCity.png";

import Copyright from "src/Atoms/copyright";
import SocialLine from "src/Atoms/social-line";

const ENQUIRY = gql`
  mutation custommerEnquiry($email: String!, $desc: String!) {
    custommerEnquiry(email: $email, desc: $desc) {
      success
    }
  }
`;

export default function Screen6() {
  const classes = useStyles();
  const [formValue, setFormValue] = useState({
    message: "",
    email: "",
  });
  const [sendEnquiry, { loading, error, data }] = useMutation(ENQUIRY);

  const emailRef = useRef();
  const descRef = useRef();

  const handleValueChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("emailRef: ", emailRef, emailRef.current.value);
    sendEnquiry({
      variables: {
        email: emailRef.current.value,
        desc: descRef.current.value,
      },
    });
  };

  return (
    <div className="section s8">
      <Container maxWidth="sm" className={classes.container_6}>
        <Typography className={classes.defaultHeader}>
          <b>CONTACT</b> US
        </Typography>

        <Grid container>
          <form className={classes.form} noValidate>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              inputRef={emailRef}
              className={classes.inputStyle}
              label="Your Email"
              disabled={data ? true : false}
              placeholder="your@email"
              // value={formValue.email}
              // onChange={handleValueChange}
              name="email"
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              inputRef={descRef}
              className={classes.inputStyle}
              multiline
              rows="4"
              className={classes.inputStyle}
              id="question"
              label="Your Question"
              disabled={data ? true : false}
              placeholder="Hi, I want to cheer you up with my message, give you some feedback or whatever I want."
              // onChange={handleValueChange}
              name="message"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading || data ? true : false}
              className={classes.submit}
              onClick={onSubmit}
            >
              {data ? "Email has been sent" : "Send"}{" "}
              {loading ? "sending..." : ""}
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
              <Typography variant="body2">Prague, Czechia</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <a href={`mailto:charliehouseparty@gmail.com`}>
                  charliehouseparty@gmail.com
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <a href={`tel:+420704206828`}>+420704206828</a>
              </Typography>
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

const useStyles = makeStyles((theme) => ({
  container_6: {
    color: "black",
    //background: "rgba(25,25,25,0.3)"
    paddingTop: 80,
    paddingBottom: 80,
  },

  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    fontSize: 20,
    height: "5vh",
  },
  defaultContent: {
    margin: 20,
    fontWeight: 500,
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
    textAlign: "center",
  },
  inputStyle: {
    backgroundColor: "white",
    borderRadius: 5,
  },
}));

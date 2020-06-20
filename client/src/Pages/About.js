import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

import Screen6 from "../Molecules/menu/screen_6";


const FullpageWrapper = fullpageProps => {
  const classes = useStyles();

    return (
      <>
        <Container maxWidth="sm" className={classes.aboutContainer}>
            <Grid container>
              <Grid item>
                <Typography
                  variant="h5"
                  component="h5"
                  className={classes.defaultHeader}
                >
                  MAIN <b>MISSION</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                  <Typography component="p" className={classes.defaultParagraph}>
                    Have you ever seen house on the beach or flat in a
                    skyscraper and wonder how would it be to enjoy a drink
                    in there? Then this is your chance, dont go to that
                    same old bar you know already good enought, just have
                    a look and join some event in your neighbourhood.
                  </Typography>
             
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography
                  variant="h5"
                  component="h5"
                  className={classes.defaultHeader}
                >
                  <b>F.A.Q.</b>
                </Typography>
              </Grid>
              <Grid item>
                  <Typography variant="h6" component="h6" className={classes.defaultSubHeader}>
                    How to start?
                  </Typography>
                  <Typography component="p" className={classes.defaultParagraph}>
                    Go to create section of Charlie, fill up short form with
                    all the important questinos and press PREVIEW > Confirm,
                    you will get notification on your email anytime you
                    gained some guest. Easy!
                  </Typography>
                  
                  <Typography variant="h6" component="h6" className={classes.defaultSubHeader}>
                    How to colect the admission fee?
                  </Typography>
                  <Typography component="p" className={classes.defaultParagraph}>
                    At this stage of Charlie development you will collect
                    fee from your guests by yourself.
                  </Typography>
               
                  <Typography variant="h6" component="h6" className={classes.defaultSubHeader}>
                    Is my place good enought to host Charlie event?
                  </Typography>
                  <Typography component="p" className={classes.defaultParagraph}>
                    It is only up to you how much time/efford/money will you
                    invest into creating event or improving your place and
                    how much you want to earn per each guest.. only guests
                    will decide :)
                  </Typography>
                  <Typography variant="h6" component="h6" className={classes.defaultSubHeader}>
                    How to accept guests?
                  </Typography>
                  <Typography component="p" className={classes.defaultParagraph}>
                    Guest will arrive to your flat with Entry ticket in his phone. 
                    (received in the attachment of confirmation email). 
                    Scan this QR code with any QR code scanner (iPhone users just open their camera and point to QR code)
                    Then open link included in the QR code.
                    Accept guest.  
                  </Typography>
                  <Divider />
                  <div className={classes.formidableMentions}>
                    <p>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
                    <p>Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
                  </div>
              </Grid>
            </Grid>
          </Container>
        <Screen6 />
      </>
    )
};

const useStyles = makeStyles(theme => ({
  aboutContainer: {
    paddingTop: 20
  },

  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    marginTop: 30,
    marginBottom: 30
  },
  defaultSubHeader: {
    color: theme.palette.darkGrey,
    marginTop: 10,
    marginBottom: 20
  },
  defaultParagraph: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    borderRadius: 10
  },
  formidableMentions: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 40
  }
}));

export default FullpageWrapper;


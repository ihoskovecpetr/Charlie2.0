import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({

  img: {
    height: 100,
    width: 200,
  },
  topbar: {
    position: "absolute",
    //height: 35,
    width: '100%',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.3) 100%)',
    color: 'white',
    flexGrow: 1,
    alignItems: 'center',
    alignContent: 'center'
  },

  h3Name: {
    display: 'inline-block',
    margin: '0.5em',
    fontSize: 18
  },

  authorGrid: {
    top: -30,
    position: 'relative',
  },
  avatar: {
    border: '2px solid #FFFFFF',
    width: 60,
    height: 60,
  },
  body: {
    top: -30,
    position: 'relative',
    width: '100%',
    color: 'white',
    flexGrow: 1
  },
  button: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
    color: 'white',
    flexGrow: 1
  },

}));

export default function Infowindow(props) {

  let Pic = props.location.imagesArr[0]
  let Author = props.location.author

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = event => {
    setSpacing(20);
  };

  return (<>
    <CssBaseline />
<Grid container justify="center" className={classes.topbar}>
  <Grid >
  <h3 className={classes.h3Name}>Event Boss out</h3>
  </Grid>
</Grid>
        <img src={Pic.src} alt={Pic.capture} className={classes.img} />
<Grid container justify="center" alignItems="center" className={classes.authorGrid}>
      <Avatar alt="Author picture" src={Author.src} className={classes.avatar} />
    </Grid>

    <Grid container direction='column' justify="center" alignItems="center"  className={classes.body} >
      <Grid item justify="center" alignItems="center" >
        <Typography noWrap>Price</Typography>
      </Grid>
      <Grid item justify="center" alignItems="center" >
        <Typography noWrap>Date/Time</Typography>
      </Grid>  
    </Grid>

    <Grid container direction='column' justify="center" alignItems="center"  className={classes.button} >
      <Grid item justify="center" alignItems="center" >
        <Typography noWrap>OPEN</Typography>
      </Grid>
    </Grid>
    </>
  );
} 
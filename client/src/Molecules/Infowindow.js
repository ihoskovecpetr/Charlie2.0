import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from "@material-ui/core/CssBaseline";
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles(theme => ({
  root: {
    //flexGrow: 1,
    display: 'flex',
    height: 100
  },
  img: {
    height: 120,
    width: 200,
  },
  gridList: {
    flexWrap: 'nowrap',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Infowindow(props) {

  let lastPicture = props.location.imagesArr[0].src
  let Pic = props.location.imagesArr[0]

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = event => {
    setSpacing(20);
  };

  return (<>
    <CssBaseline />
    <Grid container className={classes.root} spacing={1}>
    <GridList className={classes.gridList} cols={1}>
        <GridListTile key={Pic.capture}>
        <img src={lastPicture} alt={Pic.capture} />
        <GridListTileBar
        title={Pic.capture}
        subtitle={<span>by: {"tile.author"}</span>}
        //actionIcon={
            // <IconButton aria-label={`info about ${Pic.capture}`} className={classes.icon}>
            // <InfoIcon />
            // </IconButton>
        //}
        />
        </GridListTile>
    </GridList>
    </Grid>
    </>
  );
} 

{/* <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          
            <Grid  item>
             
                <img className={classes.paper} src={lastPicture} alt="Smiley face" height="100vh" width="100vw" />
           
            </Grid>
         
        </Grid>
        </Grid>
    </Grid> */}
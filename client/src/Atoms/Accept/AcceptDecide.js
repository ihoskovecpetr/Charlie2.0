import React, {useContext} from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import ConfirmPNG from "src/Images/confirm_pink.png";
import ClosePNG from "src/Images/close_black.png";

import Spinner from "src/Atoms/Spinner";

export default function AcceptDecide({markEnteredStates, markEnteredHandler}){
    const classes = useStyles();
    let history = useHistory();

    return(
      <Grid item>
      <Grid container justify="center">
        <Grid item>
          {!markEnteredStates.data && <IconButton aria-label="settings" 
                      className={classes.iconBtn} 
                      disabled={markEnteredStates.loading ? true : false}
                      onClick={markEnteredHandler}
                      >
                        {markEnteredStates.loading 
                        ? <Spinner height={20} width={20} /> 
                        : <Avatar src={ClosePNG} className={classes.btnAvatar} />}
          </IconButton>}
        </Grid>
        <Grid item>
        {!markEnteredStates.data && <IconButton aria-label="settings" 
                      className={classes.iconBtn} 
                      disabled={markEnteredStates.loading ? true : false}
                      onClick={markEnteredHandler}
                      >
                        {markEnteredStates.loading 
                        ? <Spinner height={20} width={20} /> 
                        : <Avatar src={ConfirmPNG} className={classes.btnAvatar} />}
          </IconButton>}
        </Grid>
      </Grid>
    </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   
  iconBtn:{
    backgroundColor: "rgba(255,255,255,0.2)"
  },
  btnAvatar:{
    height: 50,
    width: 50
  },
  }));

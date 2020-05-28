import React, {useContext} from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import ConfirmPNG from "src/Images/confirm_pink.png";
import ClosePNG from "src/Images/close_black.png";

export default function AcceptDeclined({event, transparent}){
    const classes = useStyles();
    let history = useHistory();


    return(


<Grid item>
<Grid container justify="center">
  <Grid item>
  <Grid container 
                  alignItems="center"
                  justify="center"
                  direction="column"
                  className={classes.nameAndPrice} 
                  >
                    <Grid item >
                      <IconButton aria-label="settings" 
                            className={classes.iconBtn} 
                            disabled={true}>
                          <Avatar src={ClosePNG} className={classes.btnAvatar} />
                      </IconButton>                    
                    </Grid>
            </Grid>
  </Grid>
</Grid>
</Grid>
    )
}

const useStyles = makeStyles(theme => ({
   
  iconBtn:{
    backgroundColor: "rgba(255,255,255,0.8)",
    margin: 20
  },
  btnAvatar:{
    height: 50,
    width: 50
  },
  }));

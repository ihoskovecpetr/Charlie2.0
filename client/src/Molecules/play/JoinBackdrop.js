import React, { useState } from "react"
import Grid from "@material-ui/core/Grid";
import Backdrop from '@material-ui/core/Backdrop';
import Chip from '@material-ui/core/Chip';

import { makeStyles } from "@material-ui/core/styles";


const JoinBackdrop = ({event}) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);

    const closeBackdrop = () => {
        setChecked(false)
      };

    return(
        <Grid item className={classes.XX}>
            <Backdrop 
                open={checked} 
                onClick={closeBackdrop} 
                className={classes.backdropMain}>
                    <Chip label={`JOIN`} 
                        //variant="outlined" 
                        color="secondary" 
                        style={{width: "90%", fontWeight: 500, fontSize: 25, padding: 20, margin: "5%"}} 
                        // onClick={discoverPlay}
                        />
            </Backdrop>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   
    backdropMain: {
        zIndex: 10
      },
  }));

export default JoinBackdrop
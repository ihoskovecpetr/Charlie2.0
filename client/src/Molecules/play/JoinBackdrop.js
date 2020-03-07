import React, { useState } from "react"
import Grid from "@material-ui/core/Grid";
import Backdrop from '@material-ui/core/Backdrop';
import Chip from '@material-ui/core/Chip';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

import { makeStyles } from "@material-ui/core/styles";


const JoinBackdrop = ({event, checked, setChecked}) => {
    const classes = useStyles();
    

    const closeBackdrop = () => {
        setChecked(false)
      };

    return(
        <Grid item className={classes.XX}>
            <Backdrop 
                open={checked} 
                onClick={closeBackdrop} 
                className={classes.backdropMain}>
            <Container
                maxWidth="xs"
                className={classes.playContainer}
                >
                <InputLabel htmlFor="standard-adornment-amount">
                    DESCRIPTION
                </InputLabel>
                <Grid
                    container
                    className={classes.descriptionContainer}
                >
                    <Grid item className={classes.descriptionItem}>
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="decsription"
                        defaultValue="Example: Upon arrival, you will get welcome drink and some snacks will be ready on the balcony. Grill be ready too."
                        multiline
                        rows="4"
                        // inputRef={inputDescription}
                        //label="Description"
                        name="decsription"
                        autoComplete="false" //improvisation, should be "off", or random "string"
                        // className={classes.textField}
                    />
                    </Grid>
                </Grid>
                <Chip label={`JOIN`} 
                    //variant="outlined" 
                    color="secondary" 
                    style={{width: "90%", fontWeight: 500, fontSize: 25, padding: 20, margin: "5%"}} 
                    // onClick={discoverPlay}
                    />
            </Container>

            </Backdrop>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   
    backdropMain: {
        zIndex: 10
      },
      textField: {
          backgroundColor: "white"
      }
  }));

export default JoinBackdrop
import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import {Transition} from 'react-spring/renderprops'

export default function ScrollAnimated({height, width}) {
  const [toggle, setToggle] = useState(false);

const useStyles = makeStyles(theme => ({
    mainContainer: {
        width: "100%"
    },
    mainItem:{
        border: "2px solid #E8045D",
        padding: 4,
        borderRadius: 15
    },
    centerWrap:{
        position: "relative",
        width: width,
        height: height,
    },
    sliderCenter:{
        width: width,
        height: (height * 0.5),
        backgroundColor: "#E8045D",
        borderRadius: (width * 0.5)
    },
}))

const classes = useStyles();

useEffect(() => {
    let timr = setTimeout(() => {
      setToggle(!toggle)
    },4000)

    return() => {
        clearInterval(timr);
      };

  }, [toggle])

  return (
    <Grid container justify="center" className={classes.mainContainer}>
        <Grid item className={classes.mainItem}>
            <div className={classes.centerWrap}>
                <Transition
                    items={toggle}
                    from={{ position: 'absolute', opacity: 0, top: (height * 0.5), transitionDuration: "3s" }}
                    enter={{ opacity: 1, top: 0 }}
                    leave={{ opacity: 0, top: 0 }}>
                    {toggle =>
                        toggle
                        ? props => <div style={props} className={classes.sliderCenter}></div> //😄
                        : props => <div style={props} className={classes.sliderCenter}></div> //🤪
                    }
                </Transition>
            </div>
        </Grid>

    </Grid>
  );
}


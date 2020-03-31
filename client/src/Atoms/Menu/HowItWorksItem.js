import React, {useRef} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {useSpring, animated} from 'react-spring'
import useVisibilitySensor from "@rooks/use-visibility-sensor"


const useStyles = makeStyles(theme => ({
    mainItem: {
        height: 274,
        padding: 10
      },
      hwIcon: {
        height: 90,
      },
      subtitle: {
        fontSize: 22,
        fontWeight: 500,
        margin: 10,
        color: theme.palette.charliePink
      },
      text: {
        fontSize: 18,
        fontWeight: 500,
        margin: 10,
        textAlign: "center"
      },
}));

export default function HowItWorksItem({image, subtitle, text}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const rootNode = useRef(null);
  
  const { isVisible, visibilityRect } = useVisibilitySensor(rootNode, {
    intervalCheck: 100,
    scrollCheck: true,
    resizeCheck: true
});
  const swingIn = useSpring({
    transform: "translateX(0px)", opacity: 1, 
    from: {opacity: 0, transform: "translateX(-100px)"},   
    reset: isVisible})

  return (
    <Grid item sm={4} xs={12} className={classes.mainItem}>
    <Grid container alignItems="center" direction="column">
    {isVisible ? <animated.div style={swingIn}>
    <img src={image} className={classes.hwIcon}/>
   </animated.div> : <div className={classes.hwIcon}> </div>}
   <Grid item>
        <Typography variant="subtitle1" className={classes.subtitle} ref={rootNode}>
          {subtitle}
        </Typography>
    </Grid>

    <Grid item>
        <Typography variant="body1" component="p" className={classes.text}>
        “{text}"
        </Typography>
    </Grid>
   </Grid>

    </Grid>
  );
}

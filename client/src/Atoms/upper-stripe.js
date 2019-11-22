import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


function UpperStripe(props){

    const useStyles = makeStyles(theme => ({
        menuButton: {
            marginRight: theme.spacing(2),
            // [theme.breakpoints.up("sm")]: {
            //   display: "none"
            // }
          },
      appBar: {
        //marginLeft: props.drawerWidth,
        // [theme.breakpoints.up("sm")]: {
        //   width: `calc(100% - ${props.drawerWidth}px)`
        // },
    },
    title: {
      flexGrow: 1,
    },
  }
    ));

    const classes = useStyles();

    console.log(props);
    return (
      <>
        <CssBaseline />
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            
   
        
          <Typography variant="h6" className={classes.title}>
            News {props.name}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        
        </AppBar>
      </>
    );
  };



export default UpperStripe
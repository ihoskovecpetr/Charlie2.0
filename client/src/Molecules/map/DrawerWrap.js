import React, {useState, useContext} from "react";
import ReactDOM from "react-dom";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Drawer from '@material-ui/core/Drawer';

import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "src/userContext";

const DrawerWrap = (props) => {
  const classes = useStyles();
  const { context, setContext } = useContext(UserContext);
  const [open, setOpen] = useState(true);

  const toggleDrawer = (event) => {
    if (context.openDrawer) {
      setContext(prev => {return({...prev, openDrawer: false})})
    }else{
      setOpen(true)
    }
  };

  return(
    <>
      <Drawer anchor={"left"} open={context.openDrawer} onClose={toggleDrawer}>
      Papp
    </Drawer>
    </>
  )
};

export default DrawerWrap;

const useStyles = makeStyles(theme => ({

}));

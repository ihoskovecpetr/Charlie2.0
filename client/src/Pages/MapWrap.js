import React, {useState, useEffect} from "react";

import { makeStyles } from "@material-ui/core/styles";

import MapPage from './MapPage';
import DrawerWrap from '../Molecules/map/DrawerWrap';

const MapWrap = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    console.log("Map Wrap RERENDER: ", props.workingPosition)
  },[])

  return(
    <>
      <MapPage {...props} setOpen={setOpen}  />
      {/* <DrawerWrap open={open} setOpen={setOpen} /> */}
    </>
  )
};

export default MapWrap;

const useStyles = makeStyles(theme => ({

}));

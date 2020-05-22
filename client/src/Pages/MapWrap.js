import React, {useState} from "react";

import { makeStyles } from "@material-ui/core/styles";

import MapPage from './MapPage';
// import DrawerWrap from '../Molecules/map/DrawerWrap';

const MapWrap = (props) => {
  const classes = useStyles();

  return(
    <>
      <MapPage {...props} />
      {/* <DrawerWrap /> */}
    </>
  )
};

export default MapWrap;

const useStyles = makeStyles(theme => ({

}));

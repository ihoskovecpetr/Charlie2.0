import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";

import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  fab1: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(8)
  }
}));

export default function FloatingBubbleCards(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const fabs = [
    {
      color: "primary",
      position: "absolute",
      className: classes.fab1,
      icon: <AddIcon />,
      label: "Add"
    },
    {
      color: "secondary",
      position: "absolute",
      className: classes.fab1,
      icon: <PlayArrowIcon />,
      label: "Edit"
    },
    {
      color: "inherit",
      position: "absolute",
      className: clsx(classes.fab1, classes.fabGreen),
      icon: <UpIcon />,
      label: "Expand"
    }
  ];

  return (
    <>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={550}
          style={{
            transitionDelay: `${value === index ? 300 : 0}ms`
          }}
          unmountOnExit
        >
          <NavLink
            to={`play/5e4842dab7927b135ebfe429`}
            key={index}
            // onClick={() => {
            //   handleDrawerToggle();
            // }}
          >
            <Fab
              aria-label={fab.label}
              className={fab.className}
              color={fab.color}
            >
              {fab.icon}
            </Fab>
          </NavLink>
        </Zoom>
      ))}
    </>
  );
}

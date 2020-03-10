import React from "react"

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExploreIcon from "@material-ui/icons/Explore";
import SubjectIcon from "@material-ui/icons/Subject";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import CharlieLogo from "../Images/charlie-logo.png"
import DrawerProfileBox from "./DrawerProfileBox"


function DrawerContent({ListOfNames, ListOfUrls, handleDrawerToggle, drawerWidth}) {

    const useStyles = makeStyles(theme => ({
        avatarCharlie: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
          width: 40,
          height: 40
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main
        }

      }));

      const classes = useStyles();

      console.log("ListOfNames: ", ListOfNames)
      console.log("ListOfUrls: ", ListOfUrls)     
    return(
        <div>
        <div className={classes.toolbar} />
        <Divider />

        <DrawerProfileBox handleDrawerToggle={handleDrawerToggle} />
        
        <List>
        {ListOfNames.map((text, index) => (
        <NavLink
            to={`/${ListOfUrls[index]}`}
            key={index}
            onClick={() => {
                handleDrawerToggle();
            }}
            >
            <ListItem button key={text}>
                {index === 0 && (
                <ListItemIcon>
                    <Avatar
                    className={classes.avatarCharlie}
                    alt="Remy Sharp"
                    src={CharlieLogo}
                    />
                </ListItemIcon>
                )}
                {index === 1 && (
                <ListItemIcon>
                    <Avatar className={classes.avatar}>
                    <PlayArrowIcon />
                    </Avatar>
                </ListItemIcon>
                )}
                {index === 2 && (
                <ListItemIcon>
                    <Avatar className={classes.avatar}>
                    <AddCircleOutlineIcon />
                    </Avatar>
                </ListItemIcon>
                )}
                {index === 3 && (
                <ListItemIcon>
                    <Avatar className={classes.avatar}>
                    <ExploreIcon />
                    </Avatar>
                </ListItemIcon>
                )}
                {index === 4 && (
                <ListItemIcon>
                    <Avatar className={classes.avatar}>
                    <SubjectIcon />
                    </Avatar>
                </ListItemIcon>
                )}
                <Divider />
                {index === 5 && (
                <ListItemIcon>
                    <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                    </Avatar>
                </ListItemIcon>
                )}

                <ListItemText primary={text} />
            </ListItem>
        </NavLink>
        ))}
        </List>
        <Divider />
    </div>
    )
    }


export default DrawerContent
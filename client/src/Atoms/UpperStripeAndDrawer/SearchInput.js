import React, { useState, useContext, useEffect, useRef } from "react";
import SearchIcon from '@material-ui/icons/Search';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { UserContext } from "src/userContext";

export default function SearchInput({}) {
  const classes = useStyles();
  let history = useHistory();
  const { context } = useContext(UserContext);

  const inputName = useRef(null);

  const pathSet = history.location.pathname.split("/");

  return (
    <form action="/search">
    <Input
        id="input-with-icon-adornment"
        className={classes.searchField}
        placeholder="Search"
        name="text"
        inputRef={inputName}
        disabled={pathSet[1] === "search" ? true : false}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
          ev.preventDefault();
          history.replace(`search?text=${inputName.current.value ? inputName.current.value : ""}`)
          }
        }}
        endAdornment={
          <InputAdornment 
              position="start" 
              onClick={() => {history.replace(`search?text=${inputName.current.value ? inputName.current.value : ""}`)}}>
            <SearchIcon />
          </InputAdornment>
        }
      />
      </form>
  );
}

const useStyles = makeStyles(theme => ({
  searchField:{
    marginLeft: 10,
  }
}));


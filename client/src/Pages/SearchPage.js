import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useXsSize } from "../Hooks/useXsSize";
import EventSearchResult from "src/Atoms/Search/EventSearchResult";
import UserResult from "src/Atoms/Search/UserResult";

const SEARCH = gql`
query textSearch($text: String!){
  textSearch(text: $text) {
    events{
        _id
        createdAt
        updatedAt
        success
        name
        price
        capacityMax
        currency
        dateStart
        dateEnd
        happeningNow
        address
        description
        areYouAuthor
        author {
          _id
          name
          picture
          description
        }
        geometry {
          coordinates
        }
        imagesArr {
          caption
          src
          thumbnail
          thumbnailHeight
          thumbnailWidth
          scaletwidth
          marginLeft
          vwidth
        }
    }
    users{
      _id
      name
      picture
      description
    }
    errorOut{
      name
      message
    }

  }
}
`;

export default function Search(){
  const classes = useStyles();
  let history = useHistory();
  const { md_size_memo } = useXsSize();
  const [text, setText] = useState();
  const [placeHolder, setPlaceHolder] = useState();
  const { loading, error, data, refetch } = useQuery(SEARCH, {
    variables: { text: text }
  });

  useEffect(() => {
    const query = history.location.search.split("?")[1] ? history.location.search.split("?")[1].split("=")[1] : null
    console.log("Decoded Query: ", decodeURIComponent(query))
    setText(decodeURIComponent(query))
    setPlaceHolder(decodeURIComponent(query))
  }, [])

  const handleChangeText = (value) => {
    console.log("Value: ", value, value.target.value)
    setPlaceHolder(value.target.value)
  }

  const handleSearch = () => {
    setText(placeHolder)
    refetch()
    history.replace(`search?text=${placeHolder}`)
  }

    return (
      <div style={{
                overflow: "hidden",
                color: false ? "white" : "black",
                height: "100vh",
                background: false
                  ? "linear-gradient(90deg, rgba(29,47,94,1) 0%, rgba(104,81,123,1) 100%)"
                  : null
              }}>
            <Container maxWidth="sm">
              <Grid container className={classes.mainGridCont}>
                <Grid item xs={12}>
                <Input
                    id="input-with-icon-adornment"
                    className={classes.searchField}
                    placeholder="Search"
                    value={placeHolder}
                    fullWidth={true}
                    name="text"
                    onKeyDown={(ev) => {
                      if (ev.key === 'Enter') {
                      //ev.preventDefault();
                      console.log("onKeyDown: ENTER ", ev)
                      handleSearch()
                    }
                    }}
                    onChange={handleChangeText}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                  </Grid>

                  <Button 
                      variant="contained" 
                      color="secondary" 
                      fullWidth={true} 
                      onClick={handleSearch}> 
                              Search 
                  </Button>

                  {loading && <Typography
                                variant="body2"
                                align="center">
                                Loading...
                              </Typography>}

                    {data && data.textSearch.events.map((event, index) => (
                        <Grid item xs={12} key={index} className={classes.itemGrid}>
                            <Grid container justify="center" className={classes.itemContainer}>
                                <EventSearchResult event={event} searchText={text} />
                            </Grid>
                        </Grid>
                      ))}
                    {data && data.textSearch.users.map((user, index) => (
                        <Grid item xs={12} key={index} className={classes.itemGrid}>
                            <Grid container justify="center" className={classes.itemContainer}>
                                <UserResult user={user} searchText={text} />
                            </Grid>
                        </Grid>
                      ))}
                </Grid>
            </Container>
          </div>
  )
}


  const useStyles = makeStyles(theme => ({
    mainGridCont: {
      position: "relative",
      paddingTop: 20
    },
    searchField:{
      marginLeft: 0,
      marginBottom: 5
    },
    itemContainer: {
      width: "100%",
    },
    itemGrid: {
      width: "100%",
    },
  }));

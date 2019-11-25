import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    backgroundColor: 'lightBlue'
  },
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    backgroundColor: 'lightBlue'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  center: {
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    'align-items': 'center'
  },
  gridLogo: {
    textAlign: 'center',
  }
}));

export default function Menu(props) {
  const classes = useStyles();

  console.log("Menu props: ", props);

  return (
    <>
     <Container maxWidth="sm">
       <Grid container justify='center' direction='column' className={classes.container}>
        <Grid item justify='center'>
          <Typography variant="h4" component="h3" className={classes.center}>
            PROJECT           
          </Typography>
          </Grid>
          <Grid item justify='center'>
          <Typography variant="h3" component="h3" className={classes.center}>
            CHARLIE           
          </Typography>
        </Grid>
        
        <Grid item justify='center'  alignItems="center" >
        <Grid container justify='center'>
        
        <Avatar className={classes.avatar} alt="Remy Sharp" src="https://res.cloudinary.com/party-images-app/image/upload/v1557794256/ojkgl1hkiljwij69njbb.png" />
        
        </Grid>
        </Grid>
        </Grid>
        
        <CardMedia
        className={classes.media}
        image="https://res.cloudinary.com/party-images-app/image/upload/v1557794256/ojkgl1hkiljwij69njbb.png"
        title="Paella dish"
      />
       
      {props.ListOfUrls.map((item, index) => (
        <NavLink to={`/${item}`} key={index}>
          <Paper className={classes.root} >
            <Typography variant="h5" component="h3">
              {props.ListOfNames[index]}
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
          </Paper>
        </NavLink>
      ))}
      </Container>
    </>
  );
}

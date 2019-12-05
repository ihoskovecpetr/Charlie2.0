import React from "react"
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import Grid from "@material-ui/core/Grid";

export default function SocialLine(props){
    return(
        <Grid container direction="row" justify="center" spacing={7} style={{paddingTop: 20, paddingBottom: 20, width: '100%'}}>
        <Grid item>
            <InstagramIcon fontSize="large" color={props.color}/>
        </Grid>
        <Grid item>
            <FacebookIcon fontSize="large" color={props.color}/>
        </Grid>
        <Grid item>
            <TwitterIcon fontSize="large" color={props.color}/>
        </Grid>
        </Grid>
    )
}
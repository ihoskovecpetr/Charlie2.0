import React, {useContext, useState, useEffect} from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import CropFreeIcon from '@material-ui/icons/CropFree';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "src/userContext";
//import QRCodePNG from "src/Images/QR.png"
import Dropzone_QR from "./Dropzone_QR"



const QRCodeEntering = ({bookings}) => {
    const [qrCodeData, setQrCodeData] = useState();
    const [GRDecoded, setQRDecoded] = useState({user_id: null, event_id: null});
    const classes = useStyles();
    const { context, setContext } = useContext(UserContext);

    useEffect(( ) => {
            if(qrCodeData){
            
            }
    },[qrCodeData])


    return(
            <Grid item xs={12}>
                    <Typography component="div" className={classes.standardContent}>
                        <Grid container>
                            <Grid item xs={12}>
                              <Dropzone_QR setQrCodeData={setQrCodeData} />
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container justify="center">
                                <Grid item>
                                  {qrCodeData}
                                </Grid>
                              </Grid>
                            </Grid>
                        </Grid>
                    </Typography>
              </Grid>
    )
}

const useStyles = makeStyles(theme => ({
   

      thisLine:{
        height: '1px',
        width: '80%',
        margin: 0,
        marginTop: '2px',
        marginBottom: '2px',
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: "#707070"
      },
      nameAndPrice:{
        marginBottom: 25
      },
      mainHeader:{
        textAlign: "center",
        fontSize: 30,
        fontWeight: 600,
        padding: 10,
      },
      headerPrice:{
        fontSize: 20,
        textAlign: "center",
      },
      headerPerPerson:{
        fontSize: 16,
        fontWeight: 300,
        textAlign: "center",
      },
      addressGreyWrap:{
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: "center",
      },
      timeDistanceWrap:{
        padding: 10,
        paddingRight: 20
      },
      timeDistance:{
        fontSize: 16,
        textAlign: "left",
      },
      descWrap:{
        padding: 20
      },
  }));

export default QRCodeEntering
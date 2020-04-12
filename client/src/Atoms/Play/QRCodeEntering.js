import React, {useContext, useState} from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import CropFreeIcon from '@material-ui/icons/CropFree';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "src/userContext";
//import QRCodePNG from "src/Images/QR.png"
import Dropzone_QR from "./Dropzone_QR"

import jsQR from "jsqr";

import QrCode from 'qrcode-reader';

// import qrCode from "jsqrcode"

const ListTopHalf = ({bookings}) => {
    const [qrCodeData, setQrCodeData] = useState();
    const classes = useStyles();
    const { context, setContext } = useContext(UserContext);

    const handleQRCodeInput = (input) => {
        var reader = new FileReader();

        reader.onload = function(input) {

                // const image = new Image;
                // image.onload = () => {
                //     console.log("onload image: ", image)
                //     const canvas = document.createElement("CANVAS");
                //     const ctx = canvas.getContext("2d");
                //     const width = image.naturalWidth;
                //     const height = image.naturalHeight;
                //     console.log("NATTY: ", image, width, height)
                //     ctx.drawImage(image, 0, 0);
                //     const imageData = ctx.getImageData(0, 0, width, height);
                //     console.log("imageData: ", imageData);
                //     console.log("jsQR: ", jsQR);
                //     const code = jsQR(imageData.data, imageData.width, imageData.height, {dontInvert: true});
                //     console.log("ELSE Found QR code", code); 
                // }
                // image.src =  input.target.result

                var qr = new QrCode();

                qr.callback = function(err, value) {
                    if (err) {
                        console.error(err);
                        // setQrCodeData(nu)
                    }
                    console.log("ER: ", value);
                    if(value){
                      console.log("XX+: ", value.result);  
                    }
                };
                qr.decode(input.target.result);
            
        }

        


        reader.readAsDataURL(input.target.files[0]);
        
        // image.onload = async function() {
        //     console.log("Image Loaded: ", image , image.naturalWidth, image.naturalHeight );
        //    }
        }

    return(
            <Grid item xs={12}>
                <TextField 
                    type="file"
                    onChange={handleQRCodeInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CropFreeIcon />
                        </InputAdornment>
                      )
                    }}
                    variant="filled">
                </TextField>
                    <Typography component="div" className={classes.standardContent}>
                        <Grid container>
                            <Grid item direction="row">
                              {bookings && bookings.map(booking => {
                                if (booking.confirmed && !booking.cancelled && booking.entered) {
                                  return (
                                    <Grid item>
                                      ENTERED GUEST: {booking.user.name} 
                                    </Grid>
                                  );
                                }
                                return null;
                              })}
                            </Grid>
                            {/* {bookingStates.loading && (
                            <Grid container justify="center" alignItems="center" style={{width: "100%", height: 300}}>
                              <Grid item>
                                <Spinner height={100} width={100} />
                              </Grid>
                            </Grid>
                            )} */}
                            <Grid item xs={12}>
                            <Dropzone_QR  setQrCodeData={setQrCodeData} />
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

export default ListTopHalf
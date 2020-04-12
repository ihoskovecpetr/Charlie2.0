import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CropFreeIcon from '@material-ui/icons/CropFree';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import QrCode from 'qrcode-reader';

import Spinner from "src/Atoms/Spinner";

function MyDropzone({setQrCodeData}) {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);
  const onDrop = useCallback(acceptedFiles => {

    setIsUploading(true);

    acceptedFiles.map(file => {
      var reader = new FileReader();
      reader.onload = function(input) {
              var qr = new QrCode();
              qr.callback = function(err, value) {
                  if (err) {
                      console.error(err);
                      setQrCodeData("We could not read this")
                      setIsUploading(false)
                  }
                  if(value){
                    console.log("XX+: ", value.result);
                    setIsUploading(false)
                    setQrCodeData(value.result)  
                  }
              };
              qr.decode(input.target.result);
      }

      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    <>
      <div
        {...getRootProps()}
        style={{
          outline: "none",
          cursor: "pointer",
          border: "1px dashed grey"
        }}
      >
        <input {...getInputProps()} />
        <Grid container justify="center">
          <Grid item>
          {/* {isDragActive ? (
            <>
              <WallpaperIcon fontSize="large" className={classes.uploadIcon} />
            </>
          ) : (
            <>
              <WallpaperIcon fontSize="large" className={classes.uploadIcon} />
            </>
          )} */}
           {isUploading ? <Spinner height={100} width={100} /> : <CropFreeIcon fontSize="large" className={classes.uploadIcon} />}
          </ Grid>
        </ Grid>
        {/* <p>Place HERE your pictures</p> */}

       
        
      </div>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  uploadIcon: {
    margin: 20,
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

export default MyDropzone;

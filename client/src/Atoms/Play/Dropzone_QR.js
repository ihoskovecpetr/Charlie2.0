import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CropFreeIcon from "@material-ui/icons/CropFree";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import QrCode from "qrcode-reader";

import Spinner from "src/Atoms/Spinner";

function Dropzone_QR({ setQrCodeData }) {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);
  const [loadedImage, setLoadedImage] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    setIsUploading(true);

    acceptedFiles.map(file => {
      console.log("DROP FILE: ", file);
      var reader = new FileReader();
      reader.onload = function(input) {
        setLoadedImage(input.target.result);

        console.log("INPUT: ", input);
        var qr = new QrCode();
        qr.callback = function(err, value) {
          if (err) {
            console.error(err);
            setQrCodeData("We could not read this");
            setIsUploading(false);
          }
          if (value) {
            console.log("XX+: ", value);

            setIsUploading(false);
            setQrCodeData(value.result);

            const image = new Image();
            image.onload = () => {
              const width = image.naturalWidth;
              const height = image.naturalHeight;
              console.log("NATTY: ", width, height);
              const ratio = height / 200;
              const sqSize = value.points[0].estimatedModuleSize / ratio;
              console.log("NATTY ratio: ", ratio);
              console.log(
                "Point x, y+: ",
                value.points[2].x / ratio,
                value.points[2].y / ratio
              );

              var canvas = document.getElementById("qr_canvas");
              canvas.height = image.naturalHeight / ratio;
              canvas.width = image.naturalWidth / ratio;
              var ctx = canvas.getContext("2d");
              ctx.beginPath();
              ctx.lineWidth = "3";
              ctx.strokeStyle = "#E8045D";
              ctx.rect(
                value.points[1].x / ratio - sqSize / 2,
                value.points[1].y / ratio - sqSize / 2,
                sqSize,
                sqSize
              );
              ctx.stroke();

              ctx.beginPath();
              ctx.lineWidth = "3";
              ctx.strokeStyle = "#E8045D";
              ctx.rect(
                value.points[0].x / ratio - sqSize / 2,
                value.points[0].y / ratio - sqSize / 2,
                sqSize,
                sqSize
              );
              ctx.stroke();

              ctx.beginPath();
              ctx.lineWidth = "3";
              ctx.strokeStyle = "#E8045D";
              ctx.rect(
                value.points[2].x / ratio - sqSize / 2,
                value.points[2].y / ratio - sqSize / 2,
                sqSize,
                sqSize
              );
              ctx.stroke();
            };
            image.src = input.target.result;
          }
        };
        qr.decode(input.target.result);
      };
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
          border: "1px dashed grey",
        }}
      >
        <input {...getInputProps()} />
        <Grid container justify="center">
          <Grid item>
            {isUploading ? (
              <Spinner height={100} width={100} />
            ) : loadedImage ? (
              <img
                src={loadedImage}
                alt="No Image"
                className={classes.qrImage}
              />
            ) : (
              <CropFreeIcon fontSize="large" className={classes.uploadIcon} />
            )}
            {loadedImage && (
              <div className={classes.canvasWrap}>
                <canvas id="qr_canvas" className={classes.canvas}>
                  canvas
                </canvas>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  uploadIcon: {
    margin: 20,
    "&:hover": {
      cursor: "pointer",
    },
  },
  qrImage: {
    height: 200,
  },
  canvasWrap: {
    height: 0,
    top: -207,
    position: "relative",
  },
  canvas: {
    zIndex: 100,
    // height: 200,
    // width: 276,
    position: "relative",
    // border: "1px solid green"
  },
}));

export default MyDropzone;

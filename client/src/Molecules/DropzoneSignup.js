import React, { useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CropFreeIcon from "@material-ui/icons/CropFree";
import Spinner from "../Atoms/Spinner";

import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";

import { createUploadOfImage } from "src/Services/functions";

function ProfileDropzone({ formValue, setFormValue }) {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setIsUploading(true);

    acceptedFiles.map(file => {
      handleImageUpload(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleImageUpload = file => {
    const fileName = file.name;
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = document.createElement("img");
      img.src = event.target.result;

      img.onload = () => {
        const elem = document.createElement("canvas");

        let TumbWidth = img.width;
        let TumbHeight = img.height;

        if (img.width > 200 && img.height > 200) {
          if (img.width > img.height) {
            let hRatio = img.height / 200;
            TumbWidth = img.width / hRatio;
            TumbHeight = 200;
          } else if (img.width < img.height) {
            let wRatio = img.width / 200;
            TumbWidth = 200;
            TumbHeight = img.height / wRatio;
          }
        }

        elem.width = TumbWidth;
        elem.height = TumbHeight;
        const ctx = elem.getContext("2d");
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, TumbWidth, TumbHeight);
        ctx.canvas.toBlob(
          blob => {
            const smallfile = new File([blob], fileName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            uploadingOneImg(smallfile);
          },
          "image/jpeg",
          1
        );
      };
      reader.onerror = error => console.log(error);
    };
  };

  const uploadingOneImg = async imgThumb => {
    try {
      let urlThumb;
      let upload1 = createUploadOfImage(imgThumb);
      const res1 = await upload1;

      if (res1.body.secure_url !== "") {
        urlThumb = res1.body.secure_url;
      }

      setFormValue(prevValues => ({
        ...prevValues,
        picture: urlThumb,
      }));

      setIsUploading(false);
    } catch (err) {
      console.error(err);
      window.alert("Problem with uploading your picture..");
    }
  };

  return (
    <div {...getRootProps()} className={classes.dropzoneWrap}>
      <input {...getInputProps()} />
      {!isUploading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.mainGrid}
        >
          <Grid item>
            {formValue.picture ? (
              <Avatar
                alt="Profile picture"
                src={formValue.picture}
                className={classes.profileAvatar}
              ></Avatar>
            ) : (
              <CropFreeIcon fontSize="large" />
            )}
          </Grid>
        </Grid>
      ) : (
        <Spinner height={100} width={100} />
      )}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  dropzoneWrap: {
    padding: "5px",
    border: "2px dashed grey",
    cursor: "pointer",
  },
  mainGrid: {
    background: "transparent",
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  profileAvatar: {
    height: 100,
    width: 100,
  },
  uploadIcon: {
    margin: 20,
    "&:hover": {
      cursor: "pointer",
    },
  },
  wrap_gallery: {
    width: "100%",
  },
}));

export default ProfileDropzone;

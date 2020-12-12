import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Gallery from "react-grid-gallery";
// import request from "superagent";
import Grid from "@material-ui/core/Grid";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import { makeStyles } from "@material-ui/core/styles";
import { createUploadOfImage } from "src/Services/functions";

function MyDropzone({ formValue, setFormValue, setCountOfFiles }) {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    let count = 0;
    acceptedFiles.map(file => {
      handleImageUpload(file);
      count = count + 1;
    });
    setCountOfFiles(count);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadingOneImg = async (imgThumb, imgFull) => {
    try {
      let upload1 = createUploadOfImage(imgThumb);
      let upload2 = createUploadOfImage(imgFull);

      const [res1, res2] = await Promise.all([upload1, upload2]);

      // if (res1.body.secure_url !== "") {
      //   urlTumb = res1.body.secure_url;
      // }

      setFormValue(prevValues => {
        return {
          ...prevValues,
          ImagesArr: [
            ...prevValues.ImagesArr,
            {
              caption: "No description",
              isSelected: false,
              src: res2.body.secure_url,
              thumbnail: res1.body.secure_url,
              thumbnailHeight: res2.body.height,
              thumbnailWidth: res2.body.width,
            },
          ],
        };
      });

      setDisplay(true);
    } catch (err) {
      console.error(err);
      window.alert("Problem with uploading your picture..");
    }
  };

  const handleImageUpload = file => {
    const width = 350;
    const height = 350;
    const fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = document.createElement("img");
      img.src = event.target.result;

      img.onload = () => {
        const elem = document.createElement("canvas");
        elem.width = width;
        elem.height = height;

        const ctx = elem.getContext("2d");
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob(
          blob => {
            const smallfile = new File([blob], fileName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            uploadingOneImg(smallfile, file);
          },
          "image/jpeg",
          1
        );
      };
      reader.onerror = error => console.log(error);
    };
  };

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
            {isDragActive ? (
              <>
                <WallpaperIcon
                  fontSize="large"
                  className={classes.uploadIcon}
                />
              </>
            ) : (
              <>
                <WallpaperIcon
                  fontSize="large"
                  className={classes.uploadIcon}
                />
              </>
            )}
          </Grid>
        </Grid>
        {display ? (
          <div className={classes.wrap_gallery}>
            <Gallery
              images={formValue.ImagesArr}
              rowHeight={100}
              display={display}
              backdropClosesModal={true}
            />
          </div>
        ) : (
          <span> </span>
        )}
        {display ? (
          <span> </span>
        ) : (
          <div className={classes.wrap_gallery}>
            <Gallery
              images={formValue.ImagesArr}
              rowHeight={100}
              display={display}
              backdropClosesModal={true}
            />
          </div>
        )}
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
  wrap_gallery: {
    width: "100%",
  },
}));

export default MyDropzone;

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Gallery from "react-grid-gallery";
import request from "superagent";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import { makeStyles } from "@material-ui/core/styles";

// import Spinner from "src/Atoms/Spinner";

// const CLOUDINARY_UPLOAD_PRESET = "simple-preset-1";
const CLOUDINARY_UPLOAD_PRESET = "simpl_pst"; 
// const CLOUDINARY_UPLOAD_URL =
//   "https://api.cloudinary.com/v1_1/party-images-app/upload"; 
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dkyt8girl/upload"; 
let smallfile;

function MyDropzone({setFormValue, setCountOfFiles}) {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [display, setDisplay] = useState(false);
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files

    setIsUploading(true);
  
    let count = 0 
    acceptedFiles.map(file => {
      handleImageUpload(file);
      count = count + 1
    });
    setCountOfFiles(count)
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
            smallfile = new File([blob], fileName, {
              type: "image/jpeg",
              lastModified: Date.now()
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

  const uploadingOneImg = (imgTumb, imgFull) => {
    var urlTumb;

    //var divider;
    var upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", imgTumb);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
        window.alert("Problem with uploading your picture..");
      }

      if (response.body.secure_url !== "") {
        urlTumb = response.body.secure_url;
      }

      var upload2 = request
        .post(CLOUDINARY_UPLOAD_URL)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("file", imgFull);
      upload2.end((err, response) => {
        if (err) {
          window.alert("Problem with uploading your picture..");
        }
        if (response.body.secure_url !== "") {
          var uplArr = uploadedFiles;
          uplArr.push({
            src: response.body.secure_url,
            thumbnail: urlTumb,
            thumbnailWidth: response.body.width,
            scaletwidth: 100,
            thumbnailHeight: response.body.height,
            isSelected: false,
            caption: "After Rain (Jeshu John - designerspics.com)"
          });

          setUploadedFiles([...uplArr]);
          setIsUploading(false);
          setDisplay(true);
          setFormValue(prevValues => {
            return { ...prevValues, ImagesArr: uplArr };
          });
        }
      });
    });
  };

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
        {isDragActive ? (
          <>
            <WallpaperIcon fontSize="large" className={classes.uploadIcon} />
          </>
        ) : (
          <>
            <WallpaperIcon fontSize="large" className={classes.uploadIcon} />
          </>
        )}
        {/* <p>Place HERE your pictures</p> */}

        {/* {isUploading ? <Spinner height={100} width={100} /> : null} */}
        {display ? (
          <Gallery
            images={uploadedFiles}
            rowHeight={100}
            display={display}
            backdropClosesModal={true}
          />
        ) : (
          <span> </span>
        )}
        {display ? (
          <span> </span>
        ) : (
          <Gallery
            images={uploadedFiles}
            rowHeight={100}
            display={display}
            backdropClosesModal={true}
          />
        )}
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

import React, { useState, useCallback } from "react";

import Avatar from "@material-ui/core/Avatar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { useDropzone } from "react-dropzone";
import Gallery from "react-grid-gallery";
import request from "superagent";
import WallpaperIcon from "@material-ui/icons/Wallpaper";

import Spinner from "../Atoms/Spinner";

const CLOUDINARY_UPLOAD_PRESET = "simple-preset-1";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/party-images-app/upload";
let smallfile;
var urlTumb;

function MyDropzone(props) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [display, setDisplay] = useState(false);
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log("Acc files: ", acceptedFiles);

    setIsUploading(true);

    acceptedFiles.map(file => {
      handleImageUpload(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageUpload = file => {
    const width = 200;
    const height = 100;
    const fileName = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = document.createElement("img");
      img.src = event.target.result;

      img.onload = () => {
        const elem = document.createElement("canvas");
        console.log("IMG width: ", img.width);
        console.log("IMG width: ", img.height);
        let TumbWidth = img.width;
        let TumbHeight = img.height;

        if (img.width > 200 && img.height > 200) {
          console.log("Both dimensions BIGGER");
          if (img.width > img.height) {
            console.log("Wider: ");
            let hRatio = img.height / 200;
            TumbWidth = img.width / hRatio;
            TumbHeight = 200;
          } else if (img.width < img.height) {
            console.log("Higher: ");
            let wRatio = img.width / 200;
            TumbWidth = 200;
            TumbHeight = img.height / wRatio;
          }
        }

        console.log("Výsledné rozměry: ", TumbWidth, TumbHeight);

        elem.width = TumbWidth;
        elem.height = TumbHeight;
        const ctx = elem.getContext("2d");
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, TumbWidth, TumbHeight);
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
          props.setFormValue(prevValues => {
            return { ...prevValues, ImagesArr: uplArr, picture: urlTumb };
          });
        }
      });
    });
  };

  return (
    <>
      <div {...getRootProps()} style={{ outline: "none" }}>
        <input {...getInputProps()} />
        {urlTumb && !isUploading ? (
          // <Avatar style={{ background: "green" }}>
          //   <CheckCircleOutlineIcon />
          // </Avatar>
          <Avatar
            alt="Remy Sharp"
            src={props.formValue.picture}
            style={{ height: 100, width: 100 }}
          ></Avatar>
        ) : null}
        {!urlTumb && !isUploading ? (
          <Avatar style={{ background: "red", height: 100, width: 100 }}>
            <PersonAddIcon fontSize="large" />
          </Avatar>
        ) : null}
        {isUploading ? <Spinner height={100} width={100} /> : null}
      </div>
    </>
  );
}

export default MyDropzone;
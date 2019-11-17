import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Gallery from "react-grid-gallery";
import request from "superagent";

const CLOUDINARY_UPLOAD_PRESET = "simple-preset-1";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/party-images-app/upload";
let smallfile;

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
        // console.log("response.body uploaded");
        // console.log(response.body);
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

          setUploadedFiles(uplArr);
          setIsUploading(false);
          setDisplay(true);
          props.setFormValue(prevValues => {
            return { ...prevValues, ImagesArr: uplArr };
          });
        }
      });
    });
  };

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
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
    </>
  );
}

export default MyDropzone;

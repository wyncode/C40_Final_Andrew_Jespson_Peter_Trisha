import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const DishImages = () => {
  const [fileinput, setFileinpute] = useState('');
  const [picPreviewSource, setPicPreviewSource] = useState('');

  const uploadImage = async (base64EncodedImage) => {
    try {
      const response = await axios.post(
        '/api/stores/image',
        base64EncodedImage
      );
      console.log(response);
      //send the user to their current store
    } catch (error) {
      swal(`Oops!`, 'Something went wrong.');
    }
  };

  const previewPic = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicPreviewSource(reader.result);
    };
  };

  const handlefilechange = (e) => {
    const file = e.target.files[0];
    previewPic(file);
  };

  const handlePicSubmit = (e) => {
    e.preventDefault();
    if (!picPreviewSource) return;
    uploadImage(picPreviewSource);
  };
  return (
    <div>
      <p>Click on the "Choose File" button to upload a file:</p>
      <form onSubmit={handlePicSubmit}>
        <input
          type="file"
          name="image"
          onChange={handlefilechange}
          value={fileinput}
        />
        <button>submit</button>
      </form>
      {picPreviewSource && (
        <img
          src={picPreviewSource}
          style={{
            height: '200px'
          }}
        />
      )}
    </div>
  );
};

export default DishImages;

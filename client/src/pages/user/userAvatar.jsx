import React, { useState } from 'react';

const UserAvatar = () => {
  const [fileinput, setFileinpute] = useState('');
  const [picPreviewSource, setPicPreviewSource] = useState('');

  const uploadImage = (base64EncodedImage) => {
    //cdde the aprt
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

import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import InstagramIcon from '@material-ui/icons/Instagram';
// import TwitterIcon from '@material-ui/icons/Twitter';

const AboutSection = () => {
  const { store, setStore } = useContext(AppContext);
  const { id } = useParams();
  useEffect(async () => {
    const data = await axios.get(`api/stores/${id}`);
    setStore(data.data);
  }, []);
  return (
    <div>
      <h1 className="about-boxes"> {store?.mediaGallery} </h1>
      <h3 className="about-boxes"> Bio: {store?.bio} </h3>
      <h3 className="about-boxes"> Allergy Info: {store?.allergyInfo} </h3>
      <h3 className="about-boxes">
        {' '}
        Education: {store?.educationalBackground}{' '}
      </h3>
      <h3 className="about-boxes">
        Special Certifications: {store?.specializedCertifications}
      </h3>
      <h3 className="about-boxes"> Highlights: {store?.careerHighlights} </h3>
      <h3 className="about-boxes"> Website: {store?.website} </h3>
      {/* //* {store?.socialHandle[0].Instagram && (
        <a href={store?.socialHandle[0].Instagram}>
          <FacebookIcon />
        </a>
      )}
      {store?.socialHandle[1].Facebook && (
        <a href={store?.socialHandle[1].Facebook}>
          <InstagramIcon />
        </a>
      )}
      {store?.socialHandle[2].Twitter && (
        <a href={store?.socialHandle[2].Twitter}>
          <TwitterIcon />
        </a>
      )}  */}
    </div>
  );
};

export default AboutSection;

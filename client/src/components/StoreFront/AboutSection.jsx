import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const AboutSection = () => {
  const { currentStore, setCurrentStore } = useContext(AppContext);
  useEffect(async () => {
    const data = await axios.get(`api/stores/:id`);
    setCurrentStore(data.data);
  }, []);
  return (
    <div>
      <h1> {currentStore?.mediaGallery} </h1>
      <h3> Bio: {currentStore?.bio} </h3>
      <h3> Allergy Info: {currentStore?.allergyInfo} </h3>
      <h3> Education: {currentStore?.educationalBackground} </h3>
      <h3>Special Certifications: {currentStore?.specializedCertifications}</h3>
      <h3> Highlights: {currentStore?.careerHighlights} </h3>
      <h3> Website: {currentStore?.website} </h3>
      {currentStore?.socialHandle[0].Instagram && (
        <a href={currentStore?.socialHandle[0].Instagram}>
          <FacebookIcon />
        </a>
      )}
      {currentStore?.socialHandle[1].Facebook && (
        <a href={currentStore?.socialHandle[1].Facebook}>
          <InstagramIcon />
        </a>
      )}
      {currentStore?.socialHandle[2].Twitter && (
        <a href={currentStore?.socialHandle[2].Twitter}>
          <TwitterIcon />
        </a>
      )}
    </div>
  );
};

export default AboutSection;

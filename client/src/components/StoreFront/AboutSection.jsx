import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import FacebookIcon from '@material-ui/icons/Facebook';

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
      <FacebookIcon />
    </div>
  );
};

export default AboutSection;

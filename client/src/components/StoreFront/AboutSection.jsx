import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FacebookIcon from '@material-ui/icons/Facebook';
import Link from '@material-ui/core/Link';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const AboutSection = () => {
  const { store, setStore, loading, setLoading } = useContext(AppContext);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/stores/${id}`)
      .then((res) => {
        setStore(res.data);
        setLoading(false);
        sessionStorage.setItem('currentStore', res.data);
      })
      .then(console.log(sessionStorage))
      .catch((e) => console.log(e));
  }, [setStore, loading, setLoading, id]);

  return (
    <div>
      <h1> {store?.mediaGallery} </h1>
      <h3> Bio: {store?.bio} </h3>
      <h3> Allergy Info: {store?.allergyInfo} </h3>
      <h3> Education: {store?.educationalBackground} </h3>
      <h3>Special Certifications: {store?.specializedCertifications}</h3>
      <h3> Highlights: {store?.careerHighlights} </h3>
      <h3> Website: {store?.website} </h3>
      {/* <div>
        {store?.socialHandle[0]?.Instagram && (
          <Link href={store?.socialHandle[0].Instagram} target="_blank">
            <InstagramIcon />
          </Link>
        )}
         {/* {sessionStorage.getItem(currentStore) && (
        <Link href={sessionStorage.getItem(currentStore).socialHandle[1].Facebook}>
          <FacebookIcon />
        </Link>
      )}
      {sessionStorage.getItem(currentStore) && (
        <Link href={sessionStorage.getItem(currentStore).socialHandle[2].Twitter}>
          <TwitterIcon />
        </Link> 
      )} 
      </div> */}
    </div>
  );
};

export default AboutSection;

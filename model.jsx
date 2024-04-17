// TeachableMachineComponent.jsx

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import "./mode.css"
import { useNavigate } from 'react-router-dom';
// YourComponent.jsx
import { URL } from './config';



const TeachableMachineComponent = () => {
  const URL = 'https://teachablemachine.withgoogle.com/models/-J_sHHLog1/';
  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [componentName, setComponentName] = useState('');
  const [size, setSize] = useState('');
  const [userid, setUserid] = useState('');
  const [description, setDescription] = useState('');
  const labelContainerRef = useRef(null);
  const imageUploadRef = useRef(null);
  const navigate = useNavigate();
  const handleUpdate = () => {
    try {
      navigate("/updatec");
    } catch (error) {
      console.log(error);
    }
  }

  const loadModel = async () => {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    const loadedModel = await tmImage.load(modelURL, metadataURL);
    setModel(loadedModel);
    setMaxPredictions(loadedModel.getTotalClasses());

    if (labelContainerRef.current) {
      labelContainerRef.current.innerHTML = '';
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    if (id === 'phone-number') setPhoneNumber(value);
    else if (id === 'component-name') setComponentName(value);
    else if (id === 'size') setSize(value);
    else if (id === 'userid') setUserid(value);
    else if (id === 'description') setDescription(value);
  };

  const handleButtonClick = async () => {
    loadModel();
    document.getElementById('start-button').classList.add('clicked');
    if (imageUploadRef.current) {
      imageUploadRef.current.classList.add('background');
    }

    try {
      const response = await axios.put(`${URL}component-add`, {
        componentName: componentName,
        size: size,
        userid: userid,
        phoneNumber: phoneNumber,
        description: description
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = function (e) {
        img.src = e.target.result;
        img.onload = async function () {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Call predict only if model is not null
          if (model !== null) {
            await predict(canvas);
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const predict = async (canvas) => {
    const prediction = await model.predict(canvas);

    if (labelContainerRef.current) {
      labelContainerRef.current.innerHTML = '';
    }

    let maxProbability = -1;
    let maxProbabilityClass = '';

    for (let i = 0; i < maxPredictions; i++) {
      if (prediction[i].probability > maxProbability) {
        maxProbability = prediction[i].probability;
        maxProbabilityClass = prediction[i].className;
      }
    }

    setComponentName(maxProbabilityClass);

    const resultDiv = document.createElement('div');
    if (labelContainerRef.current) {
      labelContainerRef.current.appendChild(resultDiv);
    }
  };


  return (
    <div className="modelbox">
      <label htmlFor="phone-number">Phone Number:</label>
      <input
        type="text"
        id="phone-number"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="component-name">Component Name:</label>
      <input
        type="text"
        id="component-name"
        placeholder="Enter component name"
        value={componentName}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="size">Size:</label>
      <input
        type="text"
        id="size"
        placeholder="Enter size"
        value={size}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="userid">User ID:</label>
      <input
        type="text"
        id="userid"
        placeholder="Enter user ID"
        value={userid}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="description">Description of the Component:</label>
      <textarea
        id="description"
        placeholder="Enter description"
        value={description}
        onChange={handleInputChange}
      />
      <br />
      <br />
      <label htmlFor="image-upload">UPLOAD IMAGE:</label>
      <br />
      <input
        type="file"
        accept="image/jpeg"
        id="image-upload"
        onChange={handleImageUpload}
        ref={imageUploadRef}
      />
      <br />
      <div className="buttoncont">
      <button type="button" onClick={handleButtonClick} id="start-button">
        Start
      </button>
      <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default TeachableMachineComponent;
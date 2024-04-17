import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './updatecomp.css'
import {URL} from './config.js'
const UpdateComp = () => {
  const [component, setComponent] = useState(''); // Set initial state for component
  const [description, setDescription] = useState(''); // Set initial state for description
  const [userid, setUserId] = useState(''); // Set initial state for userid


  const handleUpdate = async () => {
    try {
      // Make an Axios PUT request
      const response = await axios.put(`${URL}component-update`, {
        component,
        description,
        userid,
      });

      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error('Error updating documents:', error);
      // Handle error and update state or show error to the user
    }
  };

  return (
    <div className="modelc">
        <h1>Update component</h1>
      <input
        type="text"
        placeholder="Component"
        value={component}
        onChange={(e) => setComponent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="UserId"
        value={userid}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Component</button>
    </div>
  );
};

export default UpdateComp;

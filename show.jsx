import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyComponent from '../../test/src/MyComponent';
import './YourComponent.css';
import { URL } from './config';

const FeatureItem = ({ label, value }) => (
  <div>
    <strong>{label}:</strong> {value}
  </div>
);

const YourComponent = () => {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}allDocuments`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleBid = (userid, collectionName) => {
    try {
      navigate(`/bid/${collectionName}/${userid}`); // Use the collectionName and userid to navigate to a specific bid route
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="all">
      <h1 className="heder">All Items</h1>
      {!showAll && (
        <ul>
          {data.map((item, index) => (
            <div className="card" key={index}>
              <h2>Product {index + 1}</h2>
              <p><strong>Collection:</strong> {item.collection}</p>
      <p><strong>ID:</strong> {item.id}</p>
      <p><strong>Trigger Motor:</strong> {item.triggermotor}</p>
      <p><strong>Speaker Details:</strong> {item.speaker}</p>
      <p><strong>Screen:</strong> {item.screen}</p>
      <p><strong>Sensor:</strong> {item.sensor}</p>
      <p><strong>Camera:</strong> {item.camera}</p>
      <p><strong>Battery:</strong> {item.battery}</p>
      <p><strong>Name:</strong> {item.userid}</p>
      <p><strong>Phone:</strong> {item.phone}</p>
      <div className='buybtn'>
      <button className="bid" onClick={() => handleBid(result.userid, collectionName)}>Buy</button>
      </div>
      
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourComponent;

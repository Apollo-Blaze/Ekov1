import React, { useState } from 'react';
import axios from 'axios';
import './VendorPage.css'
import { useNavigate } from 'react-router-dom';
import YourComponent from './show';
import MyComponent from './../../test/src/MyComponent';
// YourComponent.jsx
import { URL } from './config';
import { useLocation } from 'react-router-dom';


const Search = () => {
  const location = useLocation();
  
  const user = location.state.user;
  console.log(user)
  const [collectionName, setCollectionName] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [specName, setSpecName] = useState('');
  const [results, setResults] = useState([]);
  const navigate=useNavigate()
  const handleRequest = async () => {
    try {
      const response = await axios.post(`${URL}gfc`, {
        collectionName: collectionName,
        fieldName: fieldName,
        specName: specName
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleShow= ()=>{
    try{
      navigate("/show")
    }
    catch(error){
      console.log(error)
    }
  }
  const handleBid = (userid, collectionName) => {
    try {
      navigate(`/bid/${collectionName}/${userid}`,{ state: { user: { userid: user.userid, phoneno: user.phoneno, vc: user.vc } } }); // Use the collectionName and userid to navigate to a specific bid route
    } catch (error) {
      console.log(error);
    }
  };
  
  
  

  return (
    <>
    <div className='hero'>
      <div className='f1'>
    <div className='search-container'>
      <h1>Check Phone {user.userid}</h1>
      <div className='f2'>
        <label className='lol'>
          Phone Name:
          <input  className="tt" type="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} />
        </label>
      </div>
      <div className='f2'>
        <label className='lol'>
          Component Name:
          <input className="tt" type="text" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
        </label>
      </div>
      <div className='f2'>
        <label className='lol'>
          Specification:
          <input className="tt" type="text" value={specName} onChange={(e) => setSpecName(e.target.value)} />
        </label>
      </div>
      <button className='bit1'onClick={handleRequest}>Search</button>
      </div>
      </div>
      <div className='result'>
        <h2>Results:</h2>
        <span className='lin'></span>
        {/* <ul>
          {results.map((result, index) => (
            <li key={index}>{JSON.stringify(result)}</li>
          ))}
        </ul> */}
        <ul>
    {     results.map((result, index) => (
        <li className="lis" key={index}>
            
            <strong>Phone: {result.phone}</strong><br />
            <strong>Speaker: {result.speaker}</strong><br />
            <strong>Screen: {result.screen}</strong><br />
            <strong>Sensor: {result.sensor}</strong><br />
            <strong>Camera: {result.camera}</strong><br />
            <strong>Battery: {result.battery}</strong><br />
            <strong>Trigger Motor: {result.triggermotor}</strong><br/>
            <strong>Bid Amount: {result.bidding}</strong>
            <br></br>
            <button className="bid" onClick={() => handleBid(result.userid, collectionName)}>Buy</button>
            <span className='lin'></span>

        </li>
    ))}
</ul>

      </div>
      
      </div>
      <div className='hero'>
        <div className='uc'>
        <YourComponent/>
        </div>
      </div>
    </>
  );
};

export default Search;
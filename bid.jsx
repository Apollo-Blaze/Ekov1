import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './bid.css';
import { URL } from './config';
import { useLocation } from 'react-router-dom';

const BiddingPage = () => {
  const location = useLocation();
  const user = location.state.user;
  const { collectionName, userId } = useParams(); // Get the collection name and user ID from the route params
  const [bidAmount, setBidAmount] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bids, setBids] = useState([]);
  const [highestBid, setHighestBid] = useState(0);
  const [isValidBid, setIsValidBid] = useState(true);
  
  const handleBidChange = (event) => {
    setBidAmount(event.target.value);
    setIsValidBid(true); // Reset validity when bid amount changes
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };


  const handleBidSubmit = async () => {
    console.log(collectionName);
6666666
    try {
      console.log("hi")
        const response = await axios.put(`${URL}biddinguser`, {
          collection: collectionName,
          phoneNumber: user.phoneno,
          amount: bidAmount, // Convert bidAmount to an integer
          userid: user.userid
        });
        console.log("hello")
        console.log(response.data);
    } catch (error) {
        console.error('Error updating document:', error);
    }
};

  return (
    <div className="out" >
      <Typography variant="h4" className="title" gutterBottom>
        <strong>Bidding Page</strong>
      </Typography>

      <Typography variant="h6" className="tit" gutterBottom>
        Collection Name: {collectionName}
      </Typography>
      <Typography variant="h6" className="tit" gutterBottom>
        User ID: {userId}
      </Typography>

      <div className="textFieldContainer">
        <TextField
          type="number"
          label="Enter Bid Amount"
          variant="outlined"
          value={bidAmount}
          onChange={handleBidChange}
          fullWidth
          className="tex"
          inputProps={{
            style: { color: 'white', borderColor: isValidBid ? 'green' : 'red' },autoComplete: 'off',
          }}
        />

      </div>

      <Button variant="contained" color="primary" className="blabla" onClick={handleBidSubmit}>
        Submit Bid
      </Button>

      <List>
        {bids.map((bid, index) => (
          <ListItem key={index} className="listItem">
            <ListItemText
              primary={`Bid Amount: ${bidAmount}`}
              secondary={`Time: ${bid.time}`}
            />
            <ListItemText
              primary={`Name: ${bid.name}`}
            />
            <ListItemText
              primary={`Phone Number: ${bid.phoneNumber}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BiddingPage;

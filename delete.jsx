import React, { useState } from 'react';
import axios from 'axios';
import "./delete.css";
import { URL } from './config';

const DeleteDocument = () => {
  const [collection, setCollection] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      console.log(userId);
      const response = await axios.put(`${URL}delete`, {
        collection: collection,
        searchFieldValue: userId

      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error deleting document');
    }
  };
//   const handleDelete = async () => {
//     try {
//         const response = await axios.delete(`http://localhost:3000/deleteDocument/${collection}/${userId}`);
//         console.log(response.data);
//     } catch (error) {
//         console.error('Error deleting document:', error);
//     }
// };
// const handleDelete = async () => {
//   try {
//       const response = await axios.put('http://localhost:3000/updateDocument', {
//           collection: collection,
//           searchFieldValue: searchFieldValue,
//       });
//       console.log(response.data);
//   } catch (error) {
//       console.error('Error updating document:', error);
//   }
// };

  return (
    <div className="delete-container">
      <h1>Delete Document</h1>
      <label>
        Collection Name:
        <input type="text" value={collection} onChange={(e) => setCollection(e.target.value)} />
      </label>
      <br />
      <label>
        User ID:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <br />
      <button className='del' onClick={handleDelete}>Delete Document</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteDocument;

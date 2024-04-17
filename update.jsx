import React, { useState } from 'react';
import axios from 'axios';
import './update.css';
import { URL } from './config';

const UpdateDocument = () => {
    const [searchFieldValue, setSearchFieldValue] = useState('');
    const [updateFieldName, setUpdateFieldName] = useState('');
    const [updateFieldValue, setUpdateFieldValue] = useState('');
    const [collection, setCollection] = useState('');
// YourComponent.jsx


    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${URL}updateDocument`, {
                collection: collection,
                searchFieldValue: searchFieldValue,
                updateFieldName: updateFieldName,
                updateFieldValue: updateFieldValue
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    return (
        <div className="cont">
            <div className="form-container">
                <h2>Update Document</h2>
                <label>
                    Model:
                    <input type="text" value={collection} onChange={(e) => setCollection(e.target.value)} />
                </label>
                <label>
                    User ID:
                    <input type="text" value={searchFieldValue} onChange={(e) => setSearchFieldValue(e.target.value)} />
                </label>
                <label>
                    Component to be updated:
                    <input type="text" value={updateFieldName} onChange={(e) => setUpdateFieldName(e.target.value)} />
                </label>
                <label>
                    Status of the Component:
                    <input type="text" value={updateFieldValue} onChange={(e) => setUpdateFieldValue(e.target.value)} />
                </label>
                <button className="update" onClick={handleUpdate}>Update Document</button>
            </div>
        </div>
    );
};

export default UpdateDocument;

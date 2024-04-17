// import React, { useState } from 'react';
// import firebase from './firebase';
// // import 'firebase/firestore';

// const UpdateDocumentByFieldValue = () => {
//     const [collection, setCollection] = useState('');
//     const [fieldName, setFieldName] = useState('');
//     const [fieldValue, setFieldValue] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         if (!collection || !fieldName || !fieldValue) {
//             setErrorMessage('Please fill in all fields.');
//             return;
//         }

//         const db = firebase.firestore();
//         const querySnapshot = await db.collection(collection).where(fieldName, '==', fieldValue).get();

//         querySnapshot.forEach(async (doc) => {
//             try {
//                 await db.collection(collection).doc(doc.id).update({
//                     [fieldName]: 'NEW_VALUE_HERE'
//                 });
//                 console.log(`Document with ID ${doc.id} updated successfully`);
//             } catch (error) {
//                 console.error(`Error updating document with ID ${doc.id}:`, error);
//                 setErrorMessage(`Error updating document with ID ${doc.id}: ${error.message}`);
//             }
//         });
//     };

//     return (
//         <div>
//             <h2>Update Document By Field Value</h2>
//             <form onSubmit={handleUpdate}>
//                 <label>
//                     Collection Name:
//                     <input type="text" value={collection} onChange={(e) => setCollection(e.target.value)} />
//                 </label>
//                 <label>
//                     Field Name:
//                     <input type="text" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
//                 </label>
//                 <label>
//                     Field Value:
//                     <input type="text" value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} />
//                 </label>
//                 <button type="submit">Update Document</button>
//                 {errorMessage && <p>{errorMessage}</p>}
//             </form>
//         </div>
//     );
// };

// export default UpdateDocumentByFieldValue;

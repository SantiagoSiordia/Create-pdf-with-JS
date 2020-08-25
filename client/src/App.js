import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './App.css';

const App = () => {

  const [state, setState] = useState({
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0
  });

  const handleOnChange = ({ target: { value, name } }) => setState({ ...state, [name]: value });

  const handleCreateAndDownload = () => {
    axios.post('/create-pdf', state)
      .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      });
  }

  return (
    <div className="App">
      <input type="text" placeholder="Name" name="name" onChange={handleOnChange} />
      <input type="number" placeholder="Receipt ID" name="receiptId" onChange={handleOnChange} />
      <input type="number" placeholder="Price 1" name="price1" onChange={handleOnChange} />
      <input type="number" placeholder="Price 2" name="price2" onChange={handleOnChange} />

      <button onClick={handleCreateAndDownload}>
        Download PDF
      </button>
    </div>
  );
}

export default App;

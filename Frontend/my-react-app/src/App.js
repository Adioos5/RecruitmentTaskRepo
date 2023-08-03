import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { PostContainer } from './components/PostContainer';

function App() {

  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('');

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData('https://localhost:7056/api?input=none&showAll=true');
  }, []);


  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(textInput!=="")
      fetchData('https://localhost:7056/api?input=' + textInput + '&showAll=false');
    else
      fetchData('https://localhost:7056/api?input=none&showAll=true');
  };

  return (
    <div style={{marginTop:"50px"}}>
      <label>
        Text Input:
        <input type="text" value={textInput} onChange={handleInputChange} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      {data.map((item) => (
        <PostContainer key={item.id} title={item.title} body={item.body}/>
      ))}
    </div>
  );
}

export default App;

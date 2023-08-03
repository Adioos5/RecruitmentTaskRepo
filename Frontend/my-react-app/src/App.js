import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { PostContainer } from './components/PostContainer';
import logo from './myLogo.png'

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
    <div class="container" style={{marginTop:"50px"}}>
      <div style={{display:"flex"}}>
        <img src={logo} width="200px" height="200px"/>
        <div style={{marginLeft:"20px"}}>
          <h2>By Adrian Cieśla</h2>
          <p>This is a simple web application to search blog posts.</p>
        </div>
      </div>
      <label style={{marginTop:"20px", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <input type="text"  class="form-control" id="exampleTextInput" placeholder="What are you looking for...?" 
          value={textInput} onChange={handleInputChange} style={{maxWidth: "500px", marginLeft:"20px", marginRight:"20px"}}/>
        
        <button style={{display:"flex", alignItems:"center"}} type="submit" class="btn btn-dark" onClick={handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </label>
      {data.map((item) => (
        <PostContainer key={item.id} title={item.title} body={item.body}/>
      ))}
    </div>
  );
}

export default App;

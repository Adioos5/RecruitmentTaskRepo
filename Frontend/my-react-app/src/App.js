import React, { useState, useEffect } from 'react';
import './App.css';
import { PostContainer } from './components/PostContainer';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{  display: 'flex', alignItems: 'center',
      justifyContent: 'center'}}>
      <div style={{marginTop:"50px"}}>
        <input type="text"/>

        {data.map((item) => (
          <PostContainer key={item.id} title={item.title} body={item.body}/>
        ))}
      </div>
    </div>
  );
}

export default App;

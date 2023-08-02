import React, { useState, useEffect } from 'react';
import './App.css';

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
      <div class="col">
        {data.map((item) => (
          <div key={item.id}>
            {item.title} <br/>
            {item.body} <br/><br/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

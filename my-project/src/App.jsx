import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';
import Cardv2 from './components/Cardv2';
import FilterBar from './components/FilterBar'; // Import the FilterBar component
import Header from './components/Header';
import List from './components/List';

function App() {

  const [datafromCrumb, setDataFromCrumb] = useState([]);

  function handleDataFromChild(data) {
    setDataFromCrumb(data);
  }

  // console.log(datafromCrumb);

  return (
    <div>
      <Header />

      <div className='flex flex-col items-center'>
        <FilterBar sendDataToParent={handleDataFromChild}/>
      </div>

      <List items={datafromCrumb}/>
    </div>
    
  );
}

export default App;
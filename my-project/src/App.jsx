import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';
import Cardv2 from './components/Cardv2';
import FilterBar from './components/FilterBar'; // Import the FilterBar component
import Header from './components/Header';
import List from './components/List';

function App() {

  return (
    <div>
      <Header />

      {/* <Card /> */}
      <div className="card-container">
        <div className="card-item">
          <Cardv2 />
        </div>
        <div className="card-item">
          <Cardv2 />
        </div>
        <div className="card-item">
          <Cardv2 />
        </div>
      </div>
      <List />
    </div>
    
  );
}

export default App;
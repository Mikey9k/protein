import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Cardv2 from './components/Cardv2';
import FilterBar from './components/FilterBar'; // Import the FilterBar component
import Header from './components/Header';
import List from './components/List';
import CompareBar from './components/CompareBar';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [datafromCrumb, setDataFromCrumb] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});


  function handleDataFromChild(data) {
    setDataFromCrumb(data);
  }

  useEffect(() => {
    // Reset selectedItems when the component mounts
    setSelectedItems([]);
  }, []);

  const handleRemoveItem = (index) => {
      const newSelectedItems = [...selectedItems];
      newSelectedItems[index].checked = false; // Uncheck the item
      newSelectedItems.splice(index, 1); // Remove the item
      setSelectedItems(newSelectedItems);
  };

  // console.log(datafromCrumb);

  return (
    <div>
      <Header />

      <div className='flex flex-col items-center'>
        <FilterBar sendDataToParent={handleDataFromChild}/>
      </div>

      <div className="App">
            <List items={datafromCrumb} selectedItems={selectedItems} setSelectedItems={setSelectedItems} checkedItems={checkedItems} />
            <CompareBar selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
        </div>
    </div>
    
  );
}

export default App;
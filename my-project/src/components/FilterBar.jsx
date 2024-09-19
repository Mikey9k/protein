import React, { useState } from 'react';
import './FilterBar.css';

export default function FilterBar({sendDataToParent}) {
    const [selectedOption1, setSelectedOption1] = useState('Pick A Flavour');
    const [selectedOption2, setSelectedOption2] = useState('Pick a Category');
    // const [selectedOption3, setSelectedOption3] = useState('Select an option');

    const handleSelect1 = (option) => {
        setSelectedOption1(option);
        sendDataToParent([option, selectedOption2]);
    };

    const handleSelect2 = (option) => {
        setSelectedOption2(option);
        sendDataToParent([selectedOption1, option]);
    };

    // const handleSelect3 = (option) => {
    //     setSelectedOption3(option);
    //     sendDataToParent([selectedOption1, selectedOption2]);
    // };

    return (
        <div className="filter-bar">
            <div className="dropdown-container">
                <div className="dropdown-display">{selectedOption1}</div>
                <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleSelect1('Chocolate')}>Chocolate</div>
                    <div className="dropdown-item" onClick={() => handleSelect1('Vanilla')}>Vanilla</div>
                    <div className="dropdown-item" onClick={() => handleSelect1('Banana')}>Banana</div>
                </div>
            </div>

            <div className="dropdown-container">
                <div className="dropdown-display">{selectedOption2}</div>
                <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleSelect2('Whey')}>Whey Protein</div>
                    <div className="dropdown-item" onClick={() => handleSelect2('Collagen')}>Collagen Protein</div>
                    {/* <div className="dropdown-item" onClick={() => handleSelect2('Option 3')}>Option 3</div> */}
                </div>
            </div>

            {/* <div className="dropdown-container">
                <div className="dropdown-display">{selectedOption3}</div>
                <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleSelect3('Option 1')}>Option 1</div>
                    <div className="dropdown-item" onClick={() => handleSelect3('Option 2')}>Option 2</div>
                    <div className="dropdown-item" onClick={() => handleSelect3('Option 3')}>Option 3</div>
                </div>
            </div> */}
        </div>
    );
}

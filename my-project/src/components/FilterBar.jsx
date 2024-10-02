import React, { useState } from 'react';
import './FilterBar.css';
import FilterColumn from './FilterColumn';

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
        <div>
            <FilterColumn />

            {/* <div className="filter-bar" id="filter-bar">


                <div className="dropdown-container">
                    <div className="dropdown-display">{selectedOption1}</div>
                    <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={() => handleSelect1('Chocolate')}>Chocolate</div>
                        <div className="dropdown-item" onClick={() => handleSelect1('Vanilla')}>Vanilla</div>
                        <div className="dropdown-item" onClick={() => handleSelect1('Banana')}>Banana</div>
                        <div className="dropdown-item" onClick={() => handleSelect1('Unflavoured')}>Unflavoured</div>
                        <div className="dropdown-item" onClick={() => handleSelect1('All')}>All</div>
                    </div>
                </div>

                <div className="dropdown-container">
                    <div className="dropdown-display">{selectedOption2}</div>
                    <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={() => handleSelect2('Whey Protein')}>Whey Protein</div>
                        <div className="dropdown-item" onClick={() => handleSelect2('Plant Protein')}>Plant Protein</div>
                        <div className="dropdown-item" onClick={() => handleSelect2('All')}>All</div>
                    </div>
                </div>

            </div> */}

        </div>
    );
}

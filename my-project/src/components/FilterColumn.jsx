import React, { useState } from 'react';
import './FilterColumn.css';

export default function FilterColumn({ sendDataToParent }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const [selectedOption1, setSelectedOption1] = useState('Pick A Flavour');
    const [selectedOption2, setSelectedOption2] = useState('Pick a Category');

    const handleSelect1 = (option) => {
        setSelectedOption1(option);
        sendDataToParent([option, selectedOption2]);
    };

    const handleSelect2 = (option) => {
        setSelectedOption2(option);
        sendDataToParent([selectedOption1, option]);
    };

    const resetFilters = () => {
        setSelectedOption1('Pick A Flavour');
        setSelectedOption2('Pick a Category');
        sendDataToParent(['Pick A Flavour', 'Pick a Category']);
    };

    const handleChocolateLover = () => {
        setSelectedOption1('Chocolate');
        sendDataToParent(['Chocolate', 'All']);
    };

    const handlePlantBasedFriendly = () => {
        setSelectedOption2('Plant Protein');
        sendDataToParent(['All', 'Plant Protein']);
    };

    return (
        <>
            <div className="button-container">
                <div className="filter-buttons">
                    <button className="filter-button" onClick={handleChocolateLover}>Chocolate Lover</button>
                    <button className="filter-button" onClick={handlePlantBasedFriendly}>Vegan Friendly</button>
                </div>
                <button className="expand-button" onClick={toggleExpand}>
                    {isExpanded ? 'Close Filters' : 'Open Filters'}
                </button>
            </div>
            <div className={`filter-pane ${isExpanded ? 'expanded' : ''}`}>
                <button className="collapse-button" onClick={toggleExpand}>
                    &times;
                </button>
                <div className="filter-content">
                    <div className="filter-option">
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
                    </div>
                    <div className="filter-option">
                        <div className="dropdown-container">
                            <div className="dropdown-display">{selectedOption2}</div>
                            <div className="dropdown-menu">
                                <div className="dropdown-item" onClick={() => handleSelect2('Whey Protein')}>Whey Protein</div>
                                <div className="dropdown-item" onClick={() => handleSelect2('Plant Protein')}>Plant Protein</div>
                                <div className="dropdown-item" onClick={() => handleSelect2('All')}>All</div>
                            </div>
                        </div>
                    </div>
                    <button className="reset-button" onClick={resetFilters}>
                        Reset
                    </button>
                </div>
            </div>
        </>
    );
}
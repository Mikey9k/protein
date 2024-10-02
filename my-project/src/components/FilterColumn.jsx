import React, { useState } from 'react';
import './FilterColumn.css';

export default function FilterColumn() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <button className="expand-button" onClick={toggleExpand}>
                {isExpanded ? 'Close Filters' : 'Open Filters'}
            </button>
            <div className={`filter-pane ${isExpanded ? 'expanded' : ''}`}>
                <button className="collapse-button" onClick={toggleExpand}>
                    &times;
                </button>
                <div className="filter-content">
                    {/* <h3>Filters</h3> */}
                    <div className="filter-option">
                        <div className="dropdown-container">
                            <div className="dropdown-display">Filter 1</div>
                            <div className="dropdown-menu">
                                <div className="dropdown-item">Option 1</div>
                                <div className="dropdown-item">Option 2</div>
                                <div className="dropdown-item">Option 3</div>
                            </div>
                        </div>
                    </div>
                    <div className="filter-option">
                        <div className="dropdown-container">
                            <div className="dropdown-display">Filter 2</div>
                            <div className="dropdown-menu">
                                <div className="dropdown-item">Option 1</div>
                                <div className="dropdown-item">Option 2</div>
                                <div className="dropdown-item">Option 3</div>
                            </div>
                        </div>
                    </div>
                    <div className="filter-option">
                        <div className="dropdown-container">
                            <div className="dropdown-display">Filter 3</div>
                            <div className="dropdown-menu">
                                <div className="dropdown-item">Option 1</div>
                                <div className="dropdown-item">Option 2</div>
                                <div className="dropdown-item">Option 3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
import React from 'react';
import './CompareBar.css';

export default function CompareBar({ selectedItems, onRemoveItem }) {
    if (selectedItems.length === 0) return null;
    const maxItems = 3;
    const emptySlots = maxItems - selectedItems.length;

    return (
        <div className="compare-bar">
            {selectedItems.map((item, index) => (
                <div key={index} className="compare-item">
                    <img 
                        src={item.logo} 
                        alt={item.providername} 
                        className="compare-logo" 
                    />
                    <button 
                        className="remove-button" 
                        onClick={() => onRemoveItem(index)}
                    >
                        &times;
                    </button>
                </div>
            ))}
            {Array.from({ length: emptySlots }).map((_, index) => (
                <div key={selectedItems.length + index} className="compare-item empty-slot">
                    {index === 0 && (
                        <div className="empty-slot-text">
                            Add {emptySlots} more
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
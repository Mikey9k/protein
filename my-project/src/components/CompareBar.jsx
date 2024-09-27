// protein/my-project/src/components/CompareBar.jsx
import React, { useState, useEffect } from 'react';
import './CompareBar.css';
import CompareModal from './CompareModal';

export default function CompareBar({ selectedItems, onRemoveItem }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [maxItems, setMaxItems] = useState(getMaxItems());

    useEffect(() => {
        const handleResize = () => {
            setMaxItems(getMaxItems());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function getMaxItems() {
        return window.innerWidth <= 600 ? 2 : 4;
    }

    if (selectedItems.length === 0) return null;
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
            <button className="compare-button" onClick={() => setIsModalOpen(true)}>
                Compare
            </button>
            {isModalOpen && <CompareModal selectedItems={selectedItems} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}
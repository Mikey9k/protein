// protein/my-project/src/components/CompareModal.jsx
import React from 'react';
import './CompareModal.css';

export default function CompareModal({ selectedItems, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <table className="compare-table">
                    <thead>
                        <tr>
                            <th>Detail</th>
                            {selectedItems.map((item, index) => (
                                <th key={index}>{item.providername}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {['weight', 'price', 'rating_parsed', 'flavour', 'category'].map((detail, index) => (
                            <tr key={index}>
                                <td>{detail}</td>
                                {selectedItems.map((item, idx) => (
                                    <td key={idx}>{item[detail]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
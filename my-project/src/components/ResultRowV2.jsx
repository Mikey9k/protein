import React, { useState, useEffect } from 'react';
import './ResultRowV2.css';

const ResultRowV2 = ({ providername, weight, price, value, logo, link, flavour, category, rating, rank, retailer, selectedItems, setSelectedItems, uniqueId, id }) => {
  const [isChecked, setIsChecked] = useState(selectedItems.some(item => item.id === id && item.checked));
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


  let rating_parsed = undefined;
  if (rating !== undefined) {
    rating_parsed = rating.toFixed(1);
  }

  function truncateText(text) {
    return text.length > 35 ? text.substring(0, 35) + "..." : text;
  }

  let title = truncateText(providername);

  function handleCompareChange(e) {
    if (e.target.checked) {
      if (selectedItems.length < (maxItems) && !selectedItems.some(item => item.id === id)) {
        setSelectedItems([...selectedItems, { providername, weight, price, rating_parsed, id, logo, checked: true }]);
      } else {
        e.target.checked = false;
        alert(`You can only compare up to ${maxItems} items or the item is already selected.`);
      }
    } else {
      setSelectedItems(selectedItems.filter(item => item.id !== id));
    }
    setIsChecked(e.target.checked);
  }

  return (
    <tr className="result-row-v2">
      <td>{rating_parsed}</td>
      <td>
        {providername && (
          <div className="image-container">
            <img src={logo} alt={providername} className="image-responsive object-contain" />
          </div>
        )}
      </td>
      <td>
        {title}
        <div className="bubbles1">
            <div className="bubbleflav">{flavour}</div>
            <div className="bubbletype">{category}</div>
        </div>
      </td>
      <td>
        <div>{value}</div>
        <div style={{ fontSize: 'x-small' }}>per 100g</div>
      </td>
      <td>{weight}</td>
      <td>${price.toFixed(2)}</td>
      <td>{flavour}</td>
      <td>{category}</td>
      <td>
        {retailer && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <div className="sitebubble flex items-center gap-1">
              <img src={retailer} alt={retailer} className="w-20" />
              <img src="https://cdn3.iconfinder.com/data/icons/iconano-web-stuff/512/109-External-512.png" className="h-3" />
            </div>
          </a>
        )}

        <div className="flex items-center">
          <input type="checkbox" checked={isChecked} id={`compare-${uniqueId}`} name={`compare-${uniqueId}`} className="mr-2" onChange={handleCompareChange} />
          <label htmlFor={`compare-${uniqueId}`} className="text-sm font-medium text-gray-700">Compare</label>
        </div>
      </td>
    </tr>
  );
};

export default ResultRowV2;


import React from 'react';

const ResultRow = ({ providername, weight, price, value, logo, link, flavour, category }) => {

  function truncateText(text) {
    return text.length > 85 ? text.substring(0, 85) + "..." : text;
  }
    
  let title = truncateText(providername);
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="result-row relative border min-h-[64px] rounded-lg bg-gray-200 p-4 my-2 transition-all duration-300 shadow-xl">
        <div className="flex items-center gap-4">
          {providername && (
            <div className="image-container1">
              <img src={logo} alt={providername} className="w-12 h-12 md:w-24 md:h-24 object-contain zoom-out1" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-base md:text-xl font-semibold text-black">{title}</h2>
            <div className="mt-2 flex flex-wrap gap-3">
              {weight && (
                <div className="flex gap-x-1">
                  <span className="text-sm md:text-lg text-gray-500">{weight}</span>
                  <span className="text-xs md:text-base text-gray-400">grams</span>
                </div>
              )}
              {price && (
                <div className="flex gap-x-1">
                  <span className="text-sm md:text-lg text-gray-500">{price.toFixed(2)}</span>
                  <span className="text-xs md:text-base text-gray-400">$</span>
                </div>
              )}
              {value && (
                <div className="flex gap-x-1">
                  <span className="text-sm md:text-lg text-gray-500">{value.toFixed(2)}</span>
                  <span className="text-xs md:text-base text-gray-400">Cost per 100g</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <div className="bubbles1 leading-none">
                  <div className="bubbleflav">{flavour}</div>
                  <div className="bubbletype">{category}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </a>
  );
};

export default ResultRow;
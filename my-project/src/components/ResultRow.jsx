

import React from 'react';
import './ResultRow.css';

const ResultRow = ({ providername, weight, price, value, logo, link, flavour, category, rating, rank, retailer}) => {

  let rating_parsed = undefined;
  if (rating !== undefined) {
      rating_parsed = rating.toFixed(1);
  }


  function truncateText(text) {
    return text.length > 65 ? text.substring(0, 65) + "..." : text;
  }
  let title = truncateText(providername);
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="result-row relative border min-h-[64px] rounded-lg bg-gray-200 p-4 my-2 transition-all duration-300 shadow-xl">
        <div className="flex items-center gap-4">
          {providername && (
            <div className="image-container1">
              <img src={logo} alt={providername} className="image-responsive object-contain zoom-out1" />            
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-base md:text-xl font-semibold text-gray">{title}</h2>
            <div className="mt-1 flex flex-wrap gap-3">
              {price && (
                <div className="flex gap-x-1">
                  <span className="text-xl md:text-xl font-bold text-gray">$ {price.toFixed(2)}</span>
                </div>
              )}
              
            </div>

            <div className="flex flex-wrap gap-3">
              {value && (
                <div className="flex gap-x-1">
                  <span className="text-sm text-gray">{value.toFixed(2)} per 100 g</span>
                </div>
              )}
              {weight && (
                <div className="flex gap-x-1">
                  <span className="text-sm text-gray">| {weight} grams</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">

              {/* {rating_parsed !== undefined && (
                <div className="right-3 flex items-center">
                  <div className="text-black text-s font-bold rounded-full mr-1">
                      {rating_parsed}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-current">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 1.91 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
              )} */}

              
              {rank !== undefined && (
                <div className="flex items-center bg-blue-100 text-blue-800 text-s font-semibold px-2.5 py-0.5 rounded">
                  <span>#{rank}</span>
                </div>
              )}

              <div className="bubbles1">
                  <div className="bubbleflav">{flavour}</div>
                  <div className="bubbletype">{category}</div>
              </div>

      
              

            </div>

            <hr className="separator" />

            <div className="mt-2 flex flex-wrap gap-3 justify-end">
              {rating_parsed !== undefined && (
                <div className="right-3 flex items-center">
                  <div className="text-black text-s font-bold rounded-full mr-1">
                    {rating_parsed}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-current">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 1.91 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
              )}
              {retailer && (
                <div className="sitebubble flex items-center gap-1">
                  <img src={retailer} alt={retailer} className="w-20" />
                  <img src="https://cdn3.iconfinder.com/data/icons/iconano-web-stuff/512/109-External-512.png" className="h-3" />
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </a>
  );
};

export default ResultRow;
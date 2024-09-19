import React from 'react';
// import './ResultRow.css';
const ResultRow = ({ providername, weight, price, value, logo, link, loading }) => {
  return (
    <a href={link} target="_blank">
      <div className="relative border min-h-[64px] border-gray-200 
        rounded-lg bg-gray-200 p-4 my-2 overflow-hidden transition-all duration-300 
        hover:shadow-lg hover:border-gray-300">
        <div className="flex items-center gap-4">
          {/* <img src={logo} alt={providername} className="w-12 h-12 md:w-24 md:h-24 object-contain" /> */}
          {/* <img src={logo} className={"w-24"} style={{borderRadius: '3px'}} alt="image" /> */}

          {providername && (
            <img src={logo} alt={providername} style={{borderRadius: '5px'}} className="w-12 h-12 md:w-24 md:h-24 object-contain" /> 
          )}
          <div className="flex-1">
            <h2 className="text-base md:text-xl font-semibold text-black">{providername}</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {weight && (
                <div className="flex gap-x-1">
                  <span className="text-sm md:text-lg text-gray-500">
                    {weight}
                  </span>
                  <span className="text-xs md:text-base text-gray-400">grams</span>
                </div>
              )}

              {price && (
                <div className="flex gap-x-1">
                  <span className="text-sm md:text-lg text-gray-500">
                    {price}
                  </span>
                  <span className="text-xs md:text-base text-gray-400">USD</span>
                </div>
              )}

              {value && (
                <div className="flex gap-x-1">
                  <span className="text-sm md:text-lg text-gray-500">
                    {value}
                  </span>
                  <span className="text-xs md:text-base text-gray-400">value</span>
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
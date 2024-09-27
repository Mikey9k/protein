import React from 'react';
import './Cardv2.css';
import CompareBar from './CompareBar';


export default function Cardv2({ providername, weight, price, value, logo, link, flavour, category, rating, rank, retailer, selectedItems, setSelectedItems, uniqueId, id }) {
    // const [selectedItems, setSelectedItems] = React.useState([]);

    let rating_parsed = undefined;
    if (rating !== undefined) {
        rating_parsed = rating.toFixed(1);
    }

    // console.log(uniqueId)

    function truncateText(text) {
        return text.length > 45 ? text.substring(0, 45) + "..." : text;
    }
      
    let title = truncateText(providername);
    function getMedalEmoji(rank) {
        if (rank === 1) return '\u{1F947}'; // 🥇
        if (rank === 2) return '\u{1F948}'; // 🥈
        if (rank === 3) return '\u{1F949}'; // 🥉
        return '';
    }

    function handleCompareChange(e) {
        if (e.target.checked) {
            if (selectedItems.length < 3 && !selectedItems.some(item => item.id === id)) {
                setSelectedItems([...selectedItems, { providername, weight, price, rating_parsed, id, logo, checked: true }]);
            } else {
                e.target.checked = false;
                alert('You can only compare up to 3 items or the item is already selected.');
            }
        } else {
            setSelectedItems(selectedItems.filter(item => item.id !== id));
        }
    }
    

    React.useEffect(() => {
        console.log("Selected items: ", selectedItems);
    }, [selectedItems]);

    const isChecked = selectedItems.some(item => item.id === id && item.checked);
    
    return (
        <div className="card-wrapper">
            <div className="nft bg-white rounded-lg">
                <figure className="image-container">
                    <img src={logo} alt="" className="ml-auto mr-auto zoom-out" />
                </figure>

                <button className="absolute top-3 right-3 rounded-full bg-gray-800 text-white hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-5 h-5 flex transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-current m-auto">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>

                <h2 className='absolute top-3 left-3'>
                    <span style={{ fontSize: '2em' }}>{getMedalEmoji(rank)}</span>
                </h2>

                <div className="rounded-lg p-4 bg-gray-300 flex flex-col content-overlap" style={{ width: '250px', height: '300px', overflow: 'hidden' }}>
                    <div>
                        <h6 className="text-gray-600 text-l font-bold leading-none mb-2 flex fixed-height">
                            {rank !== undefined && (
                                <div className="flex items-center bg-blue-100 text-blue-800 text-s font-semibold mr-2 px-2.5 py-0.5 rounded" style={{ width: '50px', height: '24px' }}>
                                    <span>#{rank}</span>
                                </div>
                            )}
                            <div className="flex-grow">
                                {title}
                            </div>
                        </h6>
                        <h5 className="text-gray text-3xl font-bold leading-none">
                            ${price.toFixed(2)}
                        </h5>
                        <span className="text-xs text-gray-450 leading-none font-light flex items-center mt-1 nowrap">
                            ${value.toFixed(2)} per 100g | {weight} grams | 
                            {rating_parsed !== undefined && (
                                <div className="flex items-center ml-1">
                                    <div className="text-black text-s font-bold rounded-full mr-1">
                                        {rating_parsed}
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-current">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 1.91 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                </div>
                            )}
                        </span>
                        <br></br>
                        <br></br>
                    
                        <div className="flex justify-between items-center">
                            <div className="bubbles leading-none">
                                <div className="bubbleflav">{flavour}</div>
                                <div className="bubbletype">{category}</div>
                            </div>
                        </div>

                        <hr className="separator" />

                        <div className="mt-2 flex flex-wrap gap-3 justify-end">
                            {retailer && (
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                <div className="sitebubble flex items-center gap-1">
                                    <img src={retailer} alt={retailer} className="w-20" />
                                    <img src="https://cdn3.iconfinder.com/data/icons/iconano-web-stuff/512/109-External-512.png" className="h-3" />
                                </div>
                                </a>
                            )}
                        </div>

                        <div className="flex justify-end mt-2">
                            <div className="flex items-center">
                                <input type="checkbox" checked={isChecked} id={`compare-${uniqueId}`} name={`compare-${uniqueId}`} className="mr-2" onChange={handleCompareChange} />
                                <label htmlFor={`compare-${uniqueId}`} className="text-sm font-medium text-gray-700">Compare</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
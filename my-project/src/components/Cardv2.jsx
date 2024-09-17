import React from 'react';
import './Cardv2.css';

export default function Cardv2() {
    return (
        <div className="card-wrapper">
            <div className="nft bg-white rounded-lg m-h-64">
                <figure className="image-container">
                    <img src="https://www.amazonia.com/cdn/shop/products/slim_tone_triple_choc_500g_1.jpg?v=1631843407&width=720" alt="" className="ml-auto mr-auto" />
                </figure>

                <button className="absolute top-3 right-3 rounded-full bg-gray-800 text-white hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-5 h-5 flex transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-current m-auto">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>

                <div className="rounded-lg p-4 bg-gray-300 flex flex-col content-overlap">
                    <div>
                        <h6 className="text-gray-600 text-l font-bold leading-none mb-2">
                            4kg Amazonia Raw 
                            <br></br>
                            Protein Slim & Tone
                        </h6>
                        <h5 className="text-gray text-3xl font-bold leading-none">
                            $25.00
                        </h5>
                        <span className="text-xs text-gray-450 leading-none font-light">
                            $0.15 per 100g | 4.5kg  
                        </span>
                        <br></br>
                        <br></br>
                        <br></br>
                      
                        <div className="bubbles leading-none">
                            <div className="bubbleflav">Chocolate</div>
                            <div className="bubbletype">Pea</div>
                        </div>
                        
                        <div className="absolute bottom-3 right-3 flex items-center">
                            <div className="text-black text-s font-bold rounded-full mr-1">
                                4.8
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-current">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 1.91 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
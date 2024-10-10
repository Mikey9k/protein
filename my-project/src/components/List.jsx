import { useState, useEffect, useRef } from 'react';
import React from 'react';
// import Breadcrumb from './Breadcrumb';
// import ResultRow from './ResultRow';
import axios from "axios";
import _, { result, sortBy } from 'lodash';
// import { data } from 'autoprefixer';
// import LoadingSkeleton from './LoadingSkeleton';
import { format, toZonedTime } from 'date-fns-tz';
import ResultRow from './ResultRow';
import './ResultRow.css';
import Cardv2 from './Cardv2';
import './List.css';
import CardTemplate from './CardTemplate';
import { GiPassport } from 'react-icons/gi';
import './SortedBar.css';
import ResultRowV2 from './ResultRowV2';
import FilterColumn from './FilterColumn';

// Create a mapping object for retailer names and their logos
const retailerLogos = {
    'Amazon': 'https://images.crowdspring.com/blog/wp-content/uploads/2023/07/03162944/amazon-logo-1.png',
    'Coles': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Coles_logo.svg/2560px-Coles_logo.svg.png',
    'Woolworths': 'https://cdn.worldvectorlogo.com/logos/woolworths-5.svg',
    // Add more retailer names and their logos as needed
};

export default function List({items, selectedItems, setSelectedItems}) {
    const [latest, setLatest] = useState("");
    const [cachedResults,setCachedResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState('Sort By');
    const [sortedFiltered, setSortedFiltered] = useState([]);

    const [sortConfig, setSortConfig] = useState({ key: 'rating', direction: 'ascending' });

    const [recordsDisplayed, setRecordsDisplayed] = useState(10);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const loadMoreRecords = () => {
        setRecordsDisplayed(recordsDisplayed + 10);
    };

    const currentRecords = sortedFiltered.slice(0, recordsDisplayed);


    // const carouselRef = useRef(null);
    // const [showLeftArrow, setShowLeftArrow] = useState(false);
    // const [showRightArrow, setShowRightArrow] = useState(true);

    // const scrollLeft = () => {
    //     carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    // };

    // const scrollRight = () => {
    //     carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    // };

    // const handleScroll = () => {
    //     const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    //     setShowLeftArrow(scrollLeft > 0);
    //     setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    // };

    // useEffect(() => {
    //     const carousel = carouselRef.current;
    //     if (carousel) {
    //         carousel.addEventListener('scroll', handleScroll);
    //         handleScroll(); // Initial check

    //         return () => {
    //             carousel.removeEventListener('scroll', handleScroll);
    //         };
    //     }
    // }, []);

    const handleSelect1 = (option) => {
        setSelectedOption1(option);
    };


    const category = {
        "Whey Protein": "Whey",
        "Plant Protein": "Plant",
    }
    const flavour = {
        "Chocolate": "Chocolate",
        "Vanilla": "Vanilla",
        "Banana": "Banana",
        "Unflavoured": "Unflavoured",
    }

    const title = [...items];
    // console.log(title);

    if (title.length === 0) {
        //
    } else {
        // console.log("mumma")
        if (title[0] === "Pick A Flavour") {
            title[0] = "";
            title[1] = category[title[1]];
        } else if (title[1] === "Pick a Category") {
            
            title[1] = "";
            console.log(title);
        } else {
            title[1] = category[title[1]];
        }
        
    }




    // console.log(items);
    let filterString = "";

    if (items[0] == "All") {
        items[0] = "Pick A Flavour";
    }
    if (items[1] == "All") {
        items[1] = "Pick a Category";
    }
    if (items[0] == undefined && items[1] == undefined) {
        // Pick a category
    } else if (items[0] == "Pick A Flavour" ) {
        if (items[1] !== "Pick a Category") {
            filterString += `?category=${category[items[1]]}`;
        }
    } else if (items[1] == "Pick a Category" ) {
        if (items[0] !== "Pick a Flavour") {
            filterString += `?flavour=${flavour[items[0]]}`;
        }
    } else {
        filterString += `?flavour=${flavour[items[0]]}&category=${category[items[1]]}`;
    }

    // console.log(filterString);

    useEffect(() => {
        setEmpty(false);
        setLoading(true);
        axios.get(`https://proteinbuddy.onrender.com/record/products${filterString}`)
          .then(res => {
            setFilteredResults(res.data);
            // console.log(res.data);
            setLoading(false);
            if (res.data === "No records found") {
                setEmpty(true);
            }
          });
    }, [filterString]);

    useEffect(() => {
        axios.get('https://proteinbuddy.onrender.com/record/latest')
          .then(res => {

            setLatest(res.data.updatedAt);
            console.log(res.data);
          });
    }, []);
    
    const formatDateToAEST = (date) => {
        const timeZone = 'Australia/Sydney';
        const zonedDate = toZonedTime(new Date(date), timeZone);
        return format(zonedDate, 'dd MMMM yyyy hh:mm:ss aXXX', { timeZone });
    };

    // useEffect(() => {
    //     axios.get('https://proteinbuddy.onrender.com/record')
    //       .then(res => {
    //         setCachedResults(res.data);
    //         console.log(res.data);
    //       });
    // }, []);

    // const sortedCache = sortBy(cachedResults, "value").reverse();
    // console.log(filteredResults)
    // useEffect(() => {
    //     let sortedData = [];
    //     if (filteredResults !== "No records found") {
    //       if (selectedOption1 === 'Lowest Unit Price') {
    //         sortedData = sortBy(filteredResults, "value");
    //       } else if (selectedOption1 === 'Price (Low to high)') {
    //         sortedData = sortBy(filteredResults, "currentPrice");
    //       } else if (selectedOption1 === 'Price (High to low)') {
    //         sortedData = sortBy(filteredResults, "currentPrice").reverse();
    //       } else {
    //         sortedData = sortBy(filteredResults, "weight").reverse();
    //       }
    //     }
    //     setSortedFiltered(sortedData);
    //   }, [filteredResults, selectedOption1]);


    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getArrow = (key) => {
        if (sortConfig.key === key) {
            return (
                <div className="arrow-container">
                    <span className={sortConfig.direction === 'ascending' ? 'arrow active' : 'arrow'}>▲</span>
                    <span className={sortConfig.direction === 'descending' ? 'arrow active' : 'arrow'}>▼</span>
                </div>
            );
        }
        return (
            <div className="arrow-container">
                <span className="arrow">▲</span>
                <span className="arrow">▼</span>
            </div>
        );
    };

    useEffect(() => {
        let sortableRecords = [...filteredResults];
        sortableRecords.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    
        setSortedFiltered(sortableRecords);
    }, [filteredResults, sortConfig]);


    return (
        <div>

            <div className="list-container p-4 rounded-lg block relative border border-white/20 shadow-xl mt-8">

                <div className="list-content">
                    {loading && (
                        <>
                            <div className="loading-overlay">
                                <div className="loading-indicator flex flex-col justify-center items-center space-y-4 mt-8 mb-8">
                                    <div className="w-16 h-16 border-8 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-blue-500 font-medium text-lg">Loading...</p>
                                </div>
                            </div>
                        </>
                    )}


                    {empty && (
                        <div className="flex flex-col justify-center items-center space-y-4">
                            {/* Funny GIF */}
                            <img 
                            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHQ3aXR6eDhtNXpsZG95dDJhNXVmdnZpNDJqMnQ2OGFuejYwMGV6dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/kfRPfxMScM8WGVPMJY/giphy.gif" 
                            alt="Empty state funny gif" 
                            className="w-64 h-64 object-cover rounded-lg shadow-lg" 
                            />

                            {/* Message */}
                            <p className="text-lg text-gray-700 font-semibold">
                            Oops! Looks like there's nothing here.
                            </p>
                            {/* <p className="text-gray-500">
                            Maybe your data took a day off. 😄
                            </p> */}
                        </div>
                    )}


                    {(
                        <div>


                            <div className="heading-container" id="heading-container">
                                <h2 className="heading">
                                    &#128269; Browse {title[0]} {title[1]} Protein
                                </h2>
                            </div>

                            


                            <br></br>


                            <div className="header-toggle" onClick={toggleDropdown}>
                                {isDropdownOpen ? 'Hide Menu' : 'Show Menu'}
                            </div>
                            <div className={`header-bar ${isDropdownOpen ? 'open' : ''}`} id="header-bar">
                                <div className="header-container" onClick={() => requestSort('rating')}>
                                    <span className="header-item">Rating</span> {getArrow('rating')}
                                </div>
                                <div className="header-container" onClick={() => requestSort('title')}>
                                    <span className="header-item">Provider Name</span> {getArrow('title')}
                                </div>
                                <div className="header-container" onClick={() => requestSort('value')}>
                                    <span className="header-item">Value</span> {getArrow('value')}
                                </div>
                                <div className="header-container" onClick={() => requestSort('weight')}>
                                    <span className="header-item">Weight</span> {getArrow('weight')}
                                </div>
                                <div className="header-container" onClick={() => requestSort('currentPrice')}>
                                    <span className="header-item">Price</span> {getArrow('currentPrice')}
                                </div>
                                <div className="header-container" onClick={() => requestSort('flavour')}>
                                    <span className="header-item">Flavour</span> {getArrow('flavour')}
                                </div>
                                <div className="header-container" onClick={() => requestSort('category')}>
                                    <span className="header-item">Category</span> {getArrow('category')}
                                </div>
                                <div className="header-container">
                                    Compare
                                </div>
                            </div>

                        <br></br>

                            <table className="result-table">
                                <tbody>
                                    {currentRecords.map((result, index) => (
                                    <ResultRowV2
                                        key={result._id}
                                        providername={result.title}
                                        weight={result.weight}
                                        price={result.currentPrice}
                                        value={result.value}
                                        logo={result.image}
                                        link={result.url}
                                        flavour={result.flavour}
                                        category={result.category}
                                        rating={result.rating}
                                        rank={index + 1}
                                        retailer={retailerLogos[result.retailer]}
                                        selectedItems={selectedItems}
                                        setSelectedItems={setSelectedItems}
                                        uniqueId={`card-${result._id}`}
                                        id={result._id}
                                    />
                                    ))}
                                </tbody>
                            </table>

                            <br></br>
                            

                            
                            {recordsDisplayed < sortedFiltered.length && (
                                <div className='flex flex-col items-center'>
                                    <button onClick={loadMoreRecords} className="load-more-button">
                                        Load More
                                    </button>
                                </div>
                            )}



                        </div>
                    )}

                </div>


            </div>

            <div className='mt-6'>
                <h2 className="text-2xl text-white font-semibold text-center">
                Latest Record Updated At: {latest ? formatDateToAEST(latest) : 'Not yet updated'}
                </h2>
            </div>

            <div className='mb-6'>
                <br/>    
            </div> 
        </div>
    );
}

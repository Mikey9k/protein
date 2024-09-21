import { useState, useEffect } from 'react';
// import Breadcrumb from './Breadcrumb';
// import ResultRow from './ResultRow';
import axios from "axios";
import _, { sortBy } from 'lodash';
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

export default function List({items}) {
    const [latest, setLatest] = useState("");
    const [cachedResults,setCachedResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState('Sort By');
  

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
    console.log(items);
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
            console.log(res.data);
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
            // console.log(res.data.updatedAt);
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
    let sortedFiltered = [];
    if (filteredResults !== "No records found") {

        if (selectedOption1 === 'Lowest Unit Price') {
            sortedFiltered = sortBy(filteredResults, "value");
        } else if (selectedOption1 === 'Price (Low to high)') { 
            sortedFiltered = sortBy(filteredResults, "currentPrice");
        } else if (selectedOption1 === 'Price (High to low)') {
            sortedFiltered = sortBy(filteredResults, "currentPrice").reverse();
        } else {
            sortedFiltered = sortBy(filteredResults, "weight").reverse();

        }

    } else {
        // setEmpty(true);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 12;

    const totalPages = Math.ceil(sortedFiltered.length / recordsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentRecords = sortedFiltered.slice(
        (currentPage - 1) * recordsPerPage + 3,
        currentPage * recordsPerPage + 3
    );

    const getPageNumbers = () => {
        const pages = [];
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div>

            <div className="list-container p-4 rounded-lg block relative border border-white/20 shadow-xl mt-8">

                      {/* <Card /> */}
                {/* <div className="card-container">
                    <div className="card-item">
                    <CardTemplate />
                    </div>
                    <div className="card-item">
                    <CardTemplate />
                    </div>
                    <div className="card-item">
                    <CardTemplate />
                    </div>
                </div> */}
                <div className='flex flex-col items-center'>
                        
                    <div className="filter-bar">
                        <div className="dropdown-container">
                            <div className="dropdown-display">{selectedOption1}</div>
                            <div className="dropdown-menu">
                                <div className="dropdown-item" onClick={() => handleSelect1('Lowest Unit Price')}>Lowest Unit Price</div>
                                <div className="dropdown-item" onClick={() => handleSelect1('Price (Low to high)')}>Price (Low to high)</div>
                                <div className="dropdown-item" onClick={() => handleSelect1('Price (High to low)')}>Price (High to low)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <br></br>
                <br></br>
                <br></br>

                {loading && (
                    <div className="loading-indicator flex flex-col justify-center items-center space-y-2 mt-16">
                        <div className="w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-blue-500 font-medium">Loading...</p>
                    </div>
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




                {!loading && (
                    <div>
                        <div className="card-container">
                            {sortedFiltered.slice(0, 3).map((result, index) => (
                                <div key={result._id} className="relative flex items-center space-x-4">

                                    <div className="card-item flex-1">
                                        <Cardv2
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
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="courier flex justify-center mt-4 space-x-2">
                            {currentPage > 1 && (
                                <button
                                    onClick={handlePreviousPage}
                                    className="px-4 py-2 bg-white text-[#0082cd] shadow-md hover:shadow-2xl transition-shadow duration-300"
                                >
                                    Previous
                                </button>
                            )}
                            {getPageNumbers().map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageClick(pageNumber)}
                                    className={`px-4 py-2 ${pageNumber === currentPage ? 'bg-blue-700 text-white' : 'text-[#0082cd] bg-white shadow-md hover:shadow-2xl transition-shadow duration-300'}`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            {currentPage < totalPages && (
                                <button
                                    onClick={handleNextPage}
                                    className="px-4 py-2 bg-white text-[#0082cd] shadow-md hover:shadow-2xl transition-shadow duration-300"
                                >
                                    Next
                                </button>
                            )}
                        </div>

                        <br></br>

                        <div>
                            {currentRecords.map((result, index) => (
                                <div key={result._id} className="flex items-center space-x-4 max-w-full">
                                    <div className="flex-1 min-w-0">
                                        <ResultRow
                                            providername={result.title}
                                            weight={result.weight}
                                            price={result.currentPrice}
                                            value={result.value}
                                            logo={result.image}
                                            link={result.url}
                                            flavour={result.flavour}
                                            category={result.category}
                                            rating={result.rating}
                                            rank={(currentPage - 1) * recordsPerPage + index + 4}
                                        />
                                    </div>
                                </div>
                            ))}


                            {/* <div className="flex justify-center mt-4 space-x-2">
                                {currentPage > 1 && (
                                    <button
                                        onClick={handlePreviousPage}
                                        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
                                    >
                                        Previous
                                    </button>
                                )}
                                {currentPage < totalPages && (
                                    <button
                                        onClick={handleNextPage}
                                        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
                                    >
                                        Next
                                    </button>
                                )}
                            </div> */}
                        </div>
                    </div>
                )}



            </div>

            <div className='mt-6'>
                <h2 className="text-2xl font-semibold text-center">
                Latest Record Updated At: {latest ? formatDateToAEST(latest) : 'Not yet updated'}
                </h2>
            </div>

            <div className='mb-6'>
                <br/>    
            </div> 
        </div>
    );
}
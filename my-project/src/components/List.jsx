import { useState, useEffect } from 'react';
// import Breadcrumb from './Breadcrumb';
// import ResultRow from './ResultRow';
import axios from "axios";
import { sortBy } from 'lodash';
// import { data } from 'autoprefixer';
// import LoadingSkeleton from './LoadingSkeleton';
import { format, toZonedTime } from 'date-fns-tz';
import ResultRow from './ResultRow';
import './ResultRow.css';
import Cardv2 from './Cardv2';
import './List.css';
import CardTemplate from './CardTemplate';
import { GiPassport } from 'react-icons/gi';

export default function List({items}) {
    const [latest, setLatest] = useState("");
    const [cachedResults,setCachedResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    console.log(items);
    let filterString = "";
    if (items[0] == undefined && items[1] == undefined) {
        // Pick a category
    } else if (items[0] == "Pick A Flavour") {
        filterString += `?category=${items[1]}`;
    } else if (items[1] == "Pick a Category") {
        filterString += `?flavour=${items[0]}`;
    } else {
        filterString += `?flavour=${items[0]}&category=${items[1]}`;
    }

    console.log(filterString);

    useEffect(() => {
        axios.get(`https://proteinbuddy.onrender.com/record/products${filterString}`)
          .then(res => {
            setFilteredResults(res.data);
            console.log(res.data);
          });
    }, [filterString]);

    useEffect(() => {
        axios.get('https://proteinbuddy.onrender.com/record/latest')
          .then(res => {

            setLatest(res.data.updatedAt);
            console.log(res.data.updatedAt);
          });
    }, []);
    
    const formatDateToAEST = (date) => {
        const timeZone = 'Australia/Sydney';
        const zonedDate = toZonedTime(new Date(date), timeZone);
        return format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });
    };

    // useEffect(() => {
    //     axios.get('https://proteinbuddy.onrender.com/record')
    //       .then(res => {
    //         setCachedResults(res.data);
    //         console.log(res.data);
    //       });
    // }, []);

    // const sortedCache = sortBy(cachedResults, "value").reverse();
    const sortedFiltered = sortBy(filteredResults, "weight").reverse();

    return (
        <div>
            <div className="result-row p-4 rounded-lg block relative border border-white/10 shadow-lg mt-8">

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


                <div className="card-container">
                    {sortedFiltered.slice(0, 3).map((result, index) => (
                        <div key={result._id} className="flex items-center space-x-4">
                            {/* <div className="w-8 flex justify-center items-center">
                                {index === 0 && <span className="text-5xl">&#129351;</span>}
                                {index === 1 && <span className="text-4xl">&#129352;</span>}
                                {index === 2 && <span className="text-4xl">&#129353;</span>}
                                {index > 2 && <span className="text-2xl font-bold">{index + 1}</span>}
                            </div> */}
                            <div className="card-item flex-1">
                                <Cardv2
                                    providername={result.title}
                                    weight={result.weight}
                                    price={result.currentPrice}
                                    value={result.value}
                                    logo={result.image}
                                    link={result.url}
                                />
                            </div>
                        </div>
                    ))}
                </div>


                {sortedFiltered.slice(0, 10).map((result, index) => (
                    <div key={result._id} className="flex items-center space-x-4">
                        <div className="w-8 flex justify-center items-center">
                            {index === 0 && <span className="text-5xl">&#129351;</span>}
                            {index === 1 && <span className="text-4xl">&#129352;</span>}
                            {index === 2 && <span className="text-4xl">&#129353;</span>}
                            {index > 2 && <span className="text-2xl font-bold">{index + 1}</span>}
                        </div>
                        <div className="flex-1">
                            <ResultRow
                                providername={result.title}
                                weight={result.weight}
                                price={result.currentPrice}
                                value={result.value}
                                logo={result.image}
                                link={result.url}
                            />
                        </div>
                    </div>
                ))}
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
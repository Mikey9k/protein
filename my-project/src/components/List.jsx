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

export default function List() {
    const [latest, setLatest] = useState("");
    const [cachedResults,setCachedResults] = useState([]);

    
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

    useEffect(() => {
        axios.get('https://proteinbuddy.onrender.com/record')
          .then(res => {
            setCachedResults(res.data);
            console.log(res.data);
          });
    }, []);

    const sortedCache = sortBy(cachedResults, "value").reverse();

    return (
        <div>
            <div className="result-row p-4 rounded-lg block relative border border-white/10 shadow-lg">
                {sortedCache.slice(0, 10).map((result, index) => (
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
        </div>
    );
}
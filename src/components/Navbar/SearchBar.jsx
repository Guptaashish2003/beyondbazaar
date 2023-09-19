
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function getAutoCompleteQuerys(query) {
   const items = [
    "Smartphone",
    "Laptop",
    "Earbuds",
    "Television",
    "Mouse",
    "Printer",
    "Camera",
    "Headphones",
    "Tablet",
    "Gaming Console",
    "Speaker",
    "Power Bank",
    "Thermostat",
    "Smartwatch",
    "Monitor",
    "Graphics Card",
    "Refrigerator",
    "Washing Machine",
    "Mixer",
    "Vacuum Cleaner",
    "Air Purifier",
    "Coffee Maker",
    "Robot Vacuum",
    "Microwave",
    "Espresso Machine",
    "Cordless Vacuum",
    "Pressure Cooker",
    "Fan",
    "Dishwasher",
    "OLED TV",
    "Soundbar",
    "Doorbell",
    "PlayStation",
    "Dishwasher"
]


  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        items.filter((fruit) =>
          fruit.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, Math.random() * 1000);
  });
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setResults([]);
    if (debouncedQuery) {
      getAutoCompleteQuerys(debouncedQuery).then((results) => {
        setResults(results);
      });
    }
  }, [debouncedQuery]);

  return (

      
      <div className=" mx-auto flex flex-col  items-center mt-2.5 ">
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4"
            >
        </motion.h1>
                    
        <div className="relative w-full">
          <input
            type="text"
            className="inputBox text-black"
            placeholder="Search..."
            value={query}
            color='black'
            onChange={e => setQuery(e.target.value)} />
        </div>
        <span className={`text-gray-500 text-sm mt-2 z-50${results.length === 0 ? 'hidden' : ''}`}>
          Search results for <span className="">{query}</span> matches <span className="underline">{results.length}</span> items
        </span>
        <div
          className={`w-full  max-h-64 mt-4 group bg-white border border-gray-300 rounded-md shadow-sm z-50 ${results.length === 0 ? 'hidden' : ''}`}>
          {results.map((result, index) => (
            <motion.span
              key={index}
              className="queryLists"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}>
              {result.toLowerCase().includes(query.toLowerCase()) ? (
                <span className="text-gray-500">
                  {result.slice(0, result.toLowerCase().indexOf(query.toLowerCase()))}
                  <span className="text-blue-600">{query}</span>
                  {result.slice(result.toLowerCase().indexOf(query.toLowerCase()) + query.length)}
                </span>
              ) : (
                <span className="text-gray-500">{result}</span>
              )}
            </motion.span>
          ))}
        </div>
      </div>
    
  )
};

export default SearchBar;

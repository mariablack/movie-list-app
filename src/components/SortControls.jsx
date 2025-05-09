import React from 'react';

const SortControls = ({setSortOrder, setMovies, movies, sortOrder, sortMovies}) => {

    const handleSortChange = (order) => {
        setSortOrder(order);
        setMovies(sortMovies(movies, order));
    };
 
    return(
        <div className="flex items-center">
        <span className="mr-2 font-medium text-black">Sort by rating:</span>
        <button 
          onClick={() => handleSortChange('asc')} 
          className={`px-3 py-1 mr-2 rounded ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Low to High
        </button>
        <button 
          onClick={() => handleSortChange('desc')} 
          className={`px-3 py-1 rounded ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          High to Low
        </button>
      </div>
    )
}

export default SortControls;
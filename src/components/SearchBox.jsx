import React from 'react';

const SearchBox = ({searchTerm, setSearchTerm}) => {
 return( 
 <div className="w-full md:w-1/2 mb-4 md:mb-0">
    <input
      type="text"
      placeholder="Search movies by title..."
      className="w-full p-3 text-black border rounded shadow"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>)  
}

export default SearchBox;
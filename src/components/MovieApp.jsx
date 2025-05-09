import React, { useState, useEffect, useCallback } from 'react';

import SearchBox from "./SearchBox";
import SortControls from "./SortControls";
import MovieGrid from './MovieGrid';

// Main App component
const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', or 'desc'
  const API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY;


  // Fetch movies from TMDB API
  const fetchMovies = useCallback(async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();
      
      setMovies(prevMovies => {
        const newMovies = [...prevMovies, ...data.results];
        return sortOrder ? sortMovies(newMovies, sortOrder) : newMovies;
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [sortOrder]);

  // Initial load and pagination
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies]);

  // Sort movies by vote average
  const sortMovies = (moviesToSort, order) => {
    return [...moviesToSort].sort((a, b) => {
      return order === 'asc' 
        ? a.vote_average - b.vote_average 
        : b.vote_average - a.vote_average;
    });
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <header className="bg-blue-700 text-black py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">TMBD Movie List</h1>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        
          {/* Search Box */}
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          
          {/* Sort Controls */}
         <SortControls setSortOrder={setSortOrder} setMovies={setMovies} movies={movies} sortOrder={sortOrder} sortMovies={sortMovies}/>
        </div>
        
        {/* Movie Grid */}
        <MovieGrid filteredMovies={filteredMovies} loading={loading} setCurrentPage={setCurrentPage}/>


        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* No Results Message */}
        {!loading && filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No movies found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieApp;
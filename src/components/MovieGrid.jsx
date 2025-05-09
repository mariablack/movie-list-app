import React, { useCallback, useRef } from 'react'


const MovieGrid = ({ filteredMovies, loading, setCurrentPage}) => {

    const observer = useRef();

        // Set up infinite scrolling with Intersection Observer
        const lastMovieElementRef = useCallback(node => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            
            observer.current = new IntersectionObserver(entries => {
              if (entries[0].isIntersecting) {
                setCurrentPage(prevPage => prevPage + 1);
              }
            });
            
            if (node) observer.current.observe(node);
          }, [loading]); 
    

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie, index) => {
          const isLastElement = index === filteredMovies.length - 1;
          return (
            <div 
              key={[movie.id, index].join("-")} 
              ref={isLastElement ? lastMovieElementRef : null}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              <div className="relative pb-2/3">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{movie.title}</h2>
                <p className="text-sm text-gray-500 mb-2">Released: {new Date(movie.release_date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 mb-4">Rating: {movie.vote_average.toFixed(1)}/10</p>
                <p className="text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
              </div>
            </div>
          );
        })}
      </div>
    )

}

export default MovieGrid;
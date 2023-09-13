import axios from 'axios'
import React, {useEffect, useState} from 'react'
import MovieCard from '../MovieCard/MovieCard';

export default function TopMovies() {

    const [topMovies, setTopMovies] = useState([]);
    useEffect(() => {

    axios(`${import.meta.env.VITE_API_BASE_URL}top_rated?api_key=${import.meta.env.VITE_APP_API_KEY}`)

    .then((res) => {console.log(res.data.results); setTopMovies(res.data.results.slice(0, 10))})
    .catch((err) => console.log(err));

    }, [])

 


 return (
    <div className='top-rated-container'>
      <h3>Top Rated Movies</h3>
      <div className="top-rated-cards-wrapper">
        {topMovies.map(movie => <MovieCard 
        key={movie.id}
        movie={movie}
        width="200px"
        height="100px"
        radius="8px"
        imgSrc={movie.backdrop_path}
        cardStyle="top-rated-card"
        />)}
      </div>
    </div>
  )
}

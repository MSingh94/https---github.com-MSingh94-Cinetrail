import React from 'react'
import Slider from '../components/Slider/Slider'
import PopularMovies from '../components/PopularMovies/PopularMovies'
import './Styles.css'
import './Movies.css'
import TopMovies from '../components/TopMovies/TopMovies'


export default function Homepage() {
  return (
    <div>
      <Slider />
      <div className="movies-wrapper">
      <PopularMovies />
      <TopMovies />
      </div>
      
    </div>
  )
}

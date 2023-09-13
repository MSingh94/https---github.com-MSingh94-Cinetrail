import React, {useContext, useEffect, useState} from 'react'
import './Header.css'
import {MdOutlineLightMode, MdOutlineDarkMode} from "react-icons/md"
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchItem from '../SearchItem/SearchItem';
import { ThemeContext } from '../../contexts/ThemeContext';


export default function Header() {
  const {darkMode, setDarkMode} = useContext(ThemeContext); 
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&query=${query}`)
    .then(res => setSearchResults(res.data.results))
    .catch(err => console.log(err))

  }, [query]) 

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`header-container ${!darkMode && "header-light"}`}>
      <Link className='logo' to="/">Cinetrail</Link>
      <div className="search-container">
        <input type="text" placeholder='Search Movies...' className='search-input' onChange={(e)=>{setQuery(e.target.value)}}/>
      {query.trim() && <div className='search-results-contianer'>{searchResults.map(result => <SearchItem key={result?.id} movie={result} />)} </div>}
      </div>
      <div className="header-buttons-container">

        <div className="theme-button-container">
          <div className="theme-buttons">
          <MdOutlineLightMode className={`theme-icon ${!darkMode && "theme-icon-active"}`} onClick={!darkMode ? undefined: toggleTheme}/>
          <MdOutlineDarkMode className={`theme-icon ${darkMode && "theme-icon-active"}`} onClick={darkMode ? undefined: toggleTheme}/>
        </div>
        </div>
        <button className='create-account-btn'>Create an Account</button>
      </div>
    </div>
  );
}


//https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1

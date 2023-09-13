import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import MovieDetails from './pages/MovieDetails'
import Header from './components/Header/Header'
import ThemeContextProvider from './contexts/ThemeContext'


function App() {
  return (
    <>
    <BrowserRouter>
    <ThemeContextProvider>
     <Header />
     <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/movieDetails/:movieId' element={<MovieDetails />}/>
        <Route path='*' element={<Homepage />} />

     </Routes>
     
     <Footer />
     </ThemeContextProvider>
     </BrowserRouter>
    </>
  )
}

export default App

import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import ReactPlayer from 'react-player';
import Genres from '../components/Genres/Genres';
import ReviewItem from '../components/ReviewItem/ReviewItem';

export default function MovieDetails() {
  const {movieId} = useParams();

  const [movie, setMovie] = useState(null);
  const[trailerKey, setTrailerKey] = useState(null);
  const [reviews, setReviews] = useState([])
  
  useEffect(() => {
    axios(
      `${import.meta.env.VITE_API_BASE_URL}${movieId}?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));

    axios(
      `${import.meta.env.VITE_API_BASE_URL}${movieId}/videos?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => {
        const trailers = res.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailerKey(trailers[0].key);
      })
      .catch((err) => console.log(err));

      axios(
        `${import.meta.env.VITE_API_BASE_URL}${movieId}/reviews?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }`
      )
        .then((res) => {console.log(res.data.results);
          setReviews(res.data.results);
        })
        .catch((err) => console.log(err));

  }, []);
  console.log(movieId);
  return (
    <div className='movie-details-container'>

      <div className="trailer-container">

        <ReactPlayer 
          className='trailer-player'
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width='100%'
          height='100%'
          config={{
            youtube: {
              playerVars: {
                showInfo: 1,
                origin: "https:localhost:5174",
              },
            },
          }}
        />



      </div>

      <div className="details-container">
        <div className="title-container">
        <h1>{movie?.title}</h1>
</div>
      
      <div className="rating">
        {movie && <StarRatings starRatedColor='red' numberOfStars={5} starDimension='15px' starSpacing='1px'
        rating={movie?.vote_average/2}
        name='rating'
        />}
      </div>
      <div className="info-container">
        {movie && (<img src={`${import.meta.env.VITE_API_BASE_IMAGE_URL}${movie.poster_path}`}
        alt={`Movie poster for ${movie.title}`}
        className='details-poster'
        />)}

        <div className="movie-info">
          <h4>{movie?.tagline}</h4>
          <h4>{movie?.overview}</h4>
          <h4>Status:&nbsp; {movie?.status}</h4>
          <h4>Runtime:&nbsp; {movie?.runtime}&nbsp; min</h4>
          <h4>Budget:&nbsp; {movie?.budget}</h4>
          <Genres genreIds={movie?.genres} component="details" />
        </div>

      </div>
      <div className="review-container">
          <p className="reviews-title">Reviews</p>
          {reviews.map((review) => (
            <ReviewItem key={review?.id} review={review} />
          ))}
      </div>
      
    </div>
    </div>
  )
}


import React, {useState}from 'react';
import "./ReviewItem.css";

import Avatar from "/avatar.jpeg"

export default function ReviewItem(review) {

    const [showCompleteReview, setShowCompleteReview] = useState(false);

    let imgSrc = "";
    review?.author_details?.avatar_path
      ? (imgSrc = `${import.meta.env.VITE_API_BASE_IMAGE_URL}${
          review?.author_details?.avatar_path
        }`)
      : (imgSrc = Avatar);

  return (
<div className="review">
      <div className="avatar-container">
        <img src={imgSrc} alt="user avatar" className="avatar" />
        <p>{review?.author}</p>
        </div>
        <p className="content">
            {showCompleteReview? review?.content : `${review?.content.slice(0, 300)}...`}
        </p>
    </div>
  )
}

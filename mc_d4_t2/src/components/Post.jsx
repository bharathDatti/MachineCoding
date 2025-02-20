import React, { useState, useEffect } from "react";


const Post = () => {
  // State Management
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userReaction, setUserReaction] = useState(0); // 1 = Like, -1 = Dislike, 0 = Neutral

  // Load user reaction from local storage
  useEffect(() => {
    const savedReaction = localStorage.getItem("userReaction");
    if (savedReaction) {
      setUserReaction(parseInt(savedReaction));
      if (savedReaction === "1") setLikeCount(1);
      if (savedReaction === "-1") setDislikeCount(1);
    }
  }, []);

  // Save user reaction to local storage
  useEffect(() => {
    localStorage.setItem("userReaction", userReaction.toString());
  }, [userReaction]);

  // Handle Like Button Click
  const handleLike = () => {
    if (userReaction === 1) {
      setLikeCount(likeCount - 1);
      setUserReaction(0); // Neutral
    } else {
      setLikeCount(likeCount + 1);
      if (userReaction === -1) setDislikeCount(dislikeCount - 1); // Undo Dislike
      setUserReaction(1); // Liked
    }
  };

  // Handle Dislike Button Click
  const handleDislike = () => {
    if (userReaction === -1) {
      setDislikeCount(dislikeCount - 1);
      setUserReaction(0); // Neutral
    } else {
      setDislikeCount(dislikeCount + 1);
      if (userReaction === 1) setLikeCount(likeCount - 1); // Undo Like
      setUserReaction(-1); // Disliked
    }
  };

  return (
    <div className="post">
      <p>This is an amazing React tutorial!</p>
      <div className="reaction-buttons">
        <button
          className={`like-btn ${userReaction === 1 ? "active" : ""}`}
          onClick={handleLike}
        >
          👍 Like {likeCount}
        </button>
        <button
          className={`dislike-btn ${userReaction === -1 ? "active" : ""}`}
          onClick={handleDislike}
        >
          👎 Dislike {dislikeCount}
        </button>
      </div>
      <div className="reaction-message">
        {userReaction === 1 && <p>You liked this post!</p>}
        {userReaction === -1 && <p>You disliked this post!</p>}
      </div>
    </div>
  );
};

export default Post;

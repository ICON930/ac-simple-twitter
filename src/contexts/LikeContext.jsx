import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserAddLikeTweet } from 'api/like';
import { getUserDelLikeTweet } from 'api/like';
import { useAuth } from './AuthContext';

const LikeContext = createContext();

export const useLikes = () => useContext(LikeContext);


export const LikeProvider = ({ children }) => {
  const { currenMember } = useAuth()
  const token = localStorage.getItem('token')
  const [likes, setLikes] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likes')) || [];
    setLikes(storedLikes);
  }, []);

  useEffect(() => {
    const fetchUserLike = async () => {
      try {
        if (currenMember && token) {
          const userLikes = await getUserAddLikeTweet(token)
          const tweetIds = userLikes.map(tweet => tweet.id);
          setLikes(tweetIds);
          localStorage.setItem('likes', JSON.stringify(tweetIds));
          
          const likeCountsMap = {};
          userLikes.forEach(tweet => {
            likeCountsMap[tweet.id] = tweet.likedAmount;
          });
          setLikeCounts(likeCountsMap);

          console.log("User likes loaded:", userLikes);
        }
      } catch (error) {
        console.log('Failed to fetch user likes:', error);
      }
    }

    // Fetch user likes only if currentMember and token are available
    if (currenMember && token) {
      fetchUserLike();
    }
  }, [currenMember, token]);

  const addLike = async (tweetId, token, callback) => {
  try {
    await getUserAddLikeTweet(token, tweetId);
    setLikes([...likes, tweetId]);
    localStorage.setItem('likes', JSON.stringify([...likes, tweetId])); 
    if (callback) {
      callback();
    }
  } catch (error) {
    console.error('Failed to add like:', error);
  }
};

  const removeLike = async (tweetId, token) => {
  try {
    await getUserDelLikeTweet(token, tweetId);
    setLikes(likes.filter(id => id !== tweetId));
    localStorage.setItem('likes', JSON.stringify(likes.filter(id => id !== tweetId)));
  } catch (error) {
    console.error('Failed to remove like:', error);
  }
};

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  // Provide the context value
  const contextValue = {
    likes,
    likeCounts,
    addLike,
    removeLike,
  };

  return (
    <LikeContext.Provider value={contextValue}>
      {children}
    </LikeContext.Provider>
  );
};
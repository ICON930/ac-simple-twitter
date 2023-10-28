import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUserAddLikeTweet,
  getUserDelLikeTweet,
  getUserLikeTweet,
} from "api/like";
import { useAuth } from "./AuthContext";

const LikeContext = createContext();

export const useLikes = () => useContext(LikeContext);

export const LikeProvider = ({ children }) => {
  const { currentMember } = useAuth();
  const token = localStorage.getItem("token");
  const [likes, setLikes] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || [];
    setLikes(storedLikes);
  }, []);

  useEffect(() => {
    const fetchUserLikes = async () => {
      if (!currentMember || !token) return;

      try {
        const userLikes = await getUserLikeTweet(token, currentMember.id);
        const tweetIds = userLikes.map((tweet) => tweet.TweetId);
        setLikes(tweetIds);
        localStorage.setItem("likes", JSON.stringify(tweetIds));

        const likeCountsMap = {};
        userLikes.forEach((tweet) => {
          likeCountsMap[tweet.id] = tweet.likedAmount;
        });
        setLikeCounts(likeCountsMap);
      } catch (error) {
        console.log("Failed to fetch user likes:", error);
      }
    };

    fetchUserLikes();
  }, [currentMember, token]);

  const addLike = async (tweetId) => {
    try {
      await getUserAddLikeTweet(token, tweetId);
      const newLikes = [...likes, tweetId];
      setLikes(newLikes);
      localStorage.setItem("likes", JSON.stringify(newLikes));
    } catch (error) {
      console.log("Failed to add like:", error);
    }
  };

  const removeLike = async (tweetId) => {
    try {
      await getUserDelLikeTweet(token, tweetId);
      const newLikes = likes.filter((id) => id !== tweetId);
      setLikes(newLikes);
      localStorage.setItem("likes", JSON.stringify(newLikes));
    } catch (error) {
      console.log("Failed to remove like:", error);
    }
  };

  const contextValue = {
    likes,
    likeCounts,
    addLike,
    removeLike,
  };

  return (
    <LikeContext.Provider value={contextValue}>{children}</LikeContext.Provider>
  );
};

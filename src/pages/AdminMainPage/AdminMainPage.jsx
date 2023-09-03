import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext.jsx";

import NavContainer from "../../components/NavContainer/NavContainer.jsx";
import Header from "../../components/Header/Header.jsx";
import AdminTweetItem from "../../components/AdminTweetItem/AdminTweetItem.jsx";
import { deleteTweet, adminGetAllTweets } from "../../api/admin.js"

import styles from "./AdminMainPage.module.scss";

export default function AdminMainPage () {
    const [ tweets, setTweets ] = useState([]);
    const { adminAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleDeleteTweet = async (id) => {
      try {
        await deleteTweet(id)
        setTweets((preTweets) => {
          return preTweets.filter((tweet) => tweet.id !== id);
        });
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
    const adminGetAllTweet = async () => {
        try {
            const data = await adminGetAllTweets();
            setTweets(data);
        } catch (error) {
            console.log('獲取推文失敗', error);
        }
        }
        adminGetAllTweet();
    }, []);

    const tweetList = tweets.map((tweet) => {
        return (
        <AdminTweetItem
            key={tweet.id}
            tweetId={tweet.id}
            avatar={tweet.User.avatar}
            userName={tweet.User.name}
            account={tweet.User.account}
            createdAt={tweet.createdAt}
            description={tweet.description}
            onDelete={handleDeleteTweet}
        />
        );
    });

  useEffect(() => {
      if (!adminAuthenticated) {
          navigate('/admin/login');
      }
  }, [navigate, adminAuthenticated]);

    return (
    <div className={styles.container}>
      <NavContainer page="admin"/>
      <div className={styles.listContainer}>
        <Header title="推文清單"></Header>
        <div className={styles.list}>
          {tweetList}
        </div>
      </div>
    </div>
  )
}
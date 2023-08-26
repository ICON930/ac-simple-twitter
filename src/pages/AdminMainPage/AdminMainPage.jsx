import { useState, useEffect } from "react";

import NavContainer from "../../components/NavContainer/NavContainer.jsx";
import Header from "../../components/Header/Header.jsx";
import AdminTweetItem from "../../components/AdminTweetItem/AdminTweetItem.jsx";

import styles from "./AdminMainPage.module.scss";

export default function AdminMainPage () {
    const [ tweets, setTweets ] = useState([]);

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
        />
        );
    });

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
import NavContainer from "../../components/NavContainer/NavContainer.jsx";
import Header from "../../components/Header/Header.jsx";
import AdminTweetItem from "../../components/AdminTweetItem/AdminTweetItem.jsx";

import styles from "./AdminMainPage.module.scss";

export default function AdminMainPage () {
    return (
    <div className={styles.container}>
      <NavContainer page="admin"/>
      <div className={styles.listContainer}>
        <Header title="推文清單"></Header>
        <div className={styles.list}>
          <AdminTweetItem></AdminTweetItem>
          <AdminTweetItem></AdminTweetItem>
          <AdminTweetItem></AdminTweetItem>
          <AdminTweetItem></AdminTweetItem>
          <AdminTweetItem></AdminTweetItem>
          <AdminTweetItem></AdminTweetItem>
          <AdminTweetItem></AdminTweetItem>
          <AdminTweetItem></AdminTweetItem>
          <AdminTweetItem></AdminTweetItem>
          <AdminTweetItem></AdminTweetItem>
        </div>
      </div>
    </div>
  )
}
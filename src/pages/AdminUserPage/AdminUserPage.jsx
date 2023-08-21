import NavContainer from "../../components/NavContainer/NavContainer.jsx";
import Header from "../../components/Header/Header.jsx";
import AdminUserCard from "../../components/AdminUserCard/AdminUserCard.jsx";

import styles from "./AdminUserPage.module.scss";

export default function AdminUserPage () {
  return (
    <div className={styles.container}>
      <NavContainer page="admin"/>
      <div className={styles.cardContainer}>
        <Header title="使用者列表" />
        <div className={styles.card}>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
          <AdminUserCard></AdminUserCard>
        </div>
      </div>
    </div>
  )
}
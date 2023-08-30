//scss
import styles from "./EditModal.module.scss";

//icon
import CloseModal from "../../assets/icons/noti-fail.svg";
import Button from "components/Button/Button";
import Banner from "../../assets/icons/default-banner.svg";
import Avatar from "../../assets/icons/default-avatar.svg";
import { useState } from "react";

//api
import { editPage } from "api/edit";

export default function EditModal({ isOpen, isClose, userData }) {
  const [name, setName] = useState(userData.name);
  const [introduction, setIntroduction] = useState(userData.introduction);
  const [isNameExceeded, setNameExceeded] = useState(false);
  const [isIntroductionExceeded, setIsIntroductionExceeded] = useState(false);

  const handleTextChange = (e, setField, setExceeded, maxLength) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setField(value);
      setExceeded(false);
    } else {
      setExceeded(true);
    }
  };

  const handleSave = async () => {
    localStorage.setItem("name", name);
    localStorage.setItem("introduction", introduction);

    // 更新後端資料
    try {
      const token = localStorage.getItem("token"); // 或其他方式獲取 token
      const id = localStorage.getItem("id"); // 或其他方式獲取用戶 ID
      const data = await editPage(token, id, {
        name,
        bio: introduction, // 如果後端接受的字段是 'bio'，則這樣寫
        avatar: null, // 可根據實際需求更新
        cover: null, // 可根據實際需求更新
      });

      // 你可以在這裡添加一些成功後需要執行的代碼
      console.log("Successfully updated:", data);
    } catch (error) {
      console.log("Failed to update user:", error);
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div>
      <div className={styles.overlay} />
      <div className={styles.editModalContainer}>
        <header className={styles.editHeader}>
          <img
            className={styles.closeModal}
            src={CloseModal}
            alt="closeModal"
            onClick={isClose}
          ></img>
          <h5 className={styles.modalTitle}>編輯個人資料</h5>
          <div className={styles.storeButton}>
            <Button title="儲存" size="small" isAction onClick={handleSave} />
          </div>
        </header>
        <img width="634px" src={Banner} alt="default-banner" />
        <img className={styles.avatar} src={Avatar} alt="default-avatar" />
        <div className={styles.editContainer}>
          <label
            className={`${styles.editName} ${
              isNameExceeded ? styles.errorLine : ""
            }`}
          >
            <p className={styles.nameTitle}>名稱</p>
            <textarea
              value={name}
              onChange={(e) =>
                handleTextChange(e, setName, setNameExceeded, 50)
              }
              className={styles.nameTextArea}
            >
              name
            </textarea>
          </label>
          <p className={styles.nameLength}>
            {isNameExceeded && (
              <span className={styles.exceededStyle}>字數超出上限！</span>
            )}
            {name.length}/50
          </p>
          <label
            className={`${styles.editIntroduction} ${
              isIntroductionExceeded ? styles.errorLine : ""
            }`}
          >
            <p className={styles.introductionTitle}>自我介紹</p>
            <textarea
              value={introduction}
              onChange={(e) =>
                handleTextChange(
                  e,
                  setIntroduction,
                  setIsIntroductionExceeded,
                  160
                )
              }
              className={styles.introductionTextArea}
            >
              introduction
            </textarea>
          </label>
          <p className={styles.introductionLength}>
            {isIntroductionExceeded && (
              <span className={styles.exceededStyle}>字數超出上限！</span>
            )}
            {introduction.length}/160
          </p>
        </div>
      </div>
    </div>
  );
}

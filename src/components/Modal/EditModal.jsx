//scss
import styles from './EditModal.module.scss'

//icon
import CloseModal from "../../assets/icons/noti-fail.svg"
import Button from 'components/Button/Button'
import Banner from '../../assets/icons/default-banner.svg'
import Avatar from '../../assets/icons/default-avatar.svg'
import { useState } from 'react'

export default function EditModal ({ isOpen, isClose }) {
  const [name, setName] = useState('name')
  const [description, setDescription] = useState('description')
  const [isNameExceeded, setNameExceeded] = useState(false)
  const [isDescriptionExceeded, setDescriptionExceeded] = useState(false);

  const handleTextChange = (e, setField, setExceeded, maxLength) => {
    const value = e.target.value
    if (value.length <= maxLength) {
      setField(value)
      setExceeded(false)
    } else {
      setExceeded(true)
    }
  } 

  const handleSave = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('description', description);
  }

  if(!isOpen) {
    return null
  }
    return (
    <div>
      <div className={styles.overlay}/>
      <div className={styles.editModalContainer}>
        <header className={styles.editHeader}>
          <img className={styles.closeModal} src={CloseModal} alt='closeModal' onClick={isClose}></img>
          <h5 className={styles.modalTitle}>編輯個人資料</h5>
          <div className={styles.storeButton}>
          <Button 
          title="儲存" 
          size="small"
          isAction 
          onClick={handleSave}
          />
          </div>
        </header>
        <img width="634px" src={Banner} alt='default-banner'/>
        <img className={styles.avatar} src={Avatar} alt='default-avatar'/>
        <div className={styles.editContainer}>
            <label className={styles.editName}>
              <p className={styles.nameTitle}>名稱</p>
              <textarea value={name} onChange={(e) => handleTextChange(e, setName, setNameExceeded, 50)} className={styles.nameTextArea}>name</textarea>
            </label>
              <p className={styles.nameLength}>{isNameExceeded && <span className={styles.exceededStyle}>字數超出上限！</span>}{name.length}/50</p>
            <label className={styles.editDescription}>
              <p className={styles.descriptionTitle}>自我介紹</p>
              <textarea value={description} onChange={(e) => handleTextChange(e, setDescription, setDescriptionExceeded, 160)} className={styles.descriptionTextArea}>description</textarea>
            </label>
             <p className={styles.descriptionLength}>{isDescriptionExceeded && <span className={styles.exceededStyle}>字數超出上限！</span>}{description.length}/160</p>
        </div>
      </div>
    </div>
    )
}
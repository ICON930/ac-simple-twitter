//scss
import styles from './EditModal.module.scss'

//icon
import CloseModal from "../../assets/icons/noti-fail.svg"
import Button from 'components/Button/Button'
import Banner from '../../assets/icons/default-banner.svg'
import Avatar from '../../assets/icons/default-avatar.svg'
import Camera from '../../assets/icons/camera-icon.svg'
import Cross from '../../assets/icons/cross-white.svg'

//hook
import { useRef, useState } from 'react'

//api
import { editTextInfo, uploadFiles } from 'api/edit' 

import { useAuth } from 'contexts/AuthContext'

export default function EditModal ({ isOpen, isClose, userData, onSaveSuccess }) {

  const { updateCurrentMember, currentMember } = useAuth();
  const id = currentMember ? currentMember.id : null; 
  const [name, setName] = useState(userData ? userData.name : '')
  const [introduction, setIntroduction] = useState(userData ? userData.introduction : '')
  const [isNameExceeded, setNameExceeded] = useState(false)
  const [isIntroductionExceeded, setIsIntroductionExceeded] = useState(false);
  const [isFormValid, setFormValid] = useState(true);
  
  const [newAvatar, setNewAvatar] = useState(null);
  const [newCover, setNewCover] = useState(null);
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleAvatarClick = () => {
    avatarInputRef.current.click()
  }

  const handleCoverClick = () => {
    coverInputRef.current.click()
  }
  const handleDeleteCover = () => {
    setNewCover(null);
  };

  const handleTextChange = (e, setField, setExceeded, maxLength) => {
    const value = e.target.value
    let exceeded = false;
    if (value.length <= maxLength) {
      setField(value)
    } else {
      exceeded = true
    }
    setExceeded(exceeded)
    setFormValid(!isNameExceeded && !isIntroductionExceeded)
  } 

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');  
    if (!id) {
      console.error("ID is null or undefined.");
      return;
    }

    const textData = { name, introduction };
    const updatedTextInfo = await editTextInfo(token, id, textData)
    
    const fileData = new FormData();
    if (newAvatar) {
      fileData.append('avatar', newAvatar);
    }
    if (newCover) {
      fileData.append('cover', newCover);
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };

    const updatedFiles = await uploadFiles(token, id, fileData, config);

    updateCurrentMember({
      name: updatedTextInfo.name,
      introduction: updatedTextInfo.introduction,
      avatar: updatedFiles.avatar, // 假設 updatedFiles 包含新的頭像信息
      cover: updatedFiles.cover,  // 假設 updatedFiles 包含新的封面信息
    });
    console.log('Successfully updated:', updatedTextInfo, updatedFiles);
    localStorage.setItem('name', name);
    localStorage.setItem('introduction', introduction);
    onSaveSuccess();
    } catch (error) {
      console.log('Failed to update user:', error);
    }
    };

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
          onClick={isFormValid ? handleSave : null}
          />
          </div>
        </header>
        <div>
        <input 
          type="file"
          accept="image/*"
          ref={avatarInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setNewAvatar(URL.createObjectURL(e.target.files[0]))}
        />
        <input 
          id='cover'
          type="file"
          accept="image/*"
          ref={coverInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setNewCover(URL.createObjectURL(e.target.files[0]))}
        />
          <img width="634px" height="200px" src={newCover || Banner} alt='default-banner'/>
          <img className={styles.updateBanner} src={Camera} alt='update-banner' onClick={handleCoverClick} htmlFor="avatar"/>
          <img className={styles.deleteBanner} src={Cross} alt='delete-banner' onClick={handleDeleteCover} />
        </div>
        <div>
          <img className={styles.avatar} src={newAvatar || Avatar} alt='default-avatar'/>
          <img className={styles.updateAvatar} src={Camera} alt='update-avatar' onClick={handleAvatarClick} />
        </div>
        <div className={styles.editContainer}>
            <label className={`${styles.editName} ${isNameExceeded ? styles.errorLine :''}`}>
              <div className={styles.nameTitle}>名稱</div>
              <textarea value={name} onChange={(e) => handleTextChange(e, setName, setNameExceeded, 50)} className={styles.nameTextArea}></textarea>
            </label>
              <div className={styles.nameLength}>{isNameExceeded && <span className={styles.exceededStyle}>字數超出上限！</span>}{name.length}/50</div>
            <label className={`${styles.editIntroduction} ${isIntroductionExceeded ? styles.errorLine :''}`} >
              <div className={styles.introductionTitle}>自我介紹</div>
              <textarea value={introduction} onChange={(e) => handleTextChange(e, setIntroduction, setIsIntroductionExceeded, 160)} className={styles.introductionTextArea}></textarea>
            </label>
             <div className={styles.introductionLength}>{isIntroductionExceeded && <span className={styles.exceededStyle}>字數超出上限！</span>}{introduction.length}/160</div>
        </div>
      </div>
    </div>
    )
}


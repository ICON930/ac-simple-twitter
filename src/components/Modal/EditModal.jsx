//scss
import styles from './EditModal.module.scss'
import Swal from 'sweetalert2';
//icon
import CloseModal from "../../assets/icons/noti-fail.svg"
import Button from 'components/Button/Button'
import Banner from '../../assets/icons/default-banner.svg'
import Avatar from '../../assets/icons/default-avatar.svg'
import Camera from '../../assets/icons/camera-icon.svg'
import Cross from '../../assets/icons/cross-white.svg'

//hook
import { useEffect, useRef, useState } from 'react'
import { useAuth } from 'contexts/AuthContext'

//api
import { editPage} from 'api/edit' 

export default function EditModal ({ isOpen, isClose, userData, onSaveSuccess }) {

  const { updateCurrentMember, currentMember } = useAuth();
  const id = currentMember ? currentMember.id : null; 
  const [name, setName] = useState(userData && userData.name)
  const [introduction, setIntroduction] = useState(userData && userData.introduction)
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

  const handleAvatarChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  const handleCoverChange = (e) => {
    setNewCover(e.target.files[0]);
  };

  const handleTextChange = (e, setField, setExceeded, maxLength) => {
    const value = e.target.value;
    let exceeded = false;
    if (value.length <= maxLength) {
      setField(value);
    } else {
      exceeded = true;
    }
    setExceeded(exceeded);
    setFormValid(!isNameExceeded && !isIntroductionExceeded);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      Swal.fire({
        icon: 'success',
        title: '儲存成功！',
        text: '你的資料已成功更新。',
        confirmButtonText: '確定',
      });
      onSaveSuccess();

      if (!id) {
        console.error('ID is null or undefined.');
        return;
      }

      const textData = { name, introduction, avatar: newAvatar, cover: newCover};
      const updatedTextInfo = await editPage(token, id, textData);

      const fileData = new FormData();
   
      if (newAvatar) {
        fileData.append('avatar', newAvatar);
      }
      if (newCover) {
        fileData.append('cover', newCover);
      }

      const updatedFiles = await editPage(token, id, fileData);

      updateCurrentMember({
        name: updatedTextInfo.name,
        introduction: updatedTextInfo.introduction,
        avatar: updatedFiles.avatar,
        cover: updatedFiles.cover,
      });
      localStorage.setItem('name', name);
      localStorage.setItem('introduction', introduction);
    } catch (error) {
      console.log('Failed to update user:', error);
      Swal.fire({
        icon: 'error',
        title: '儲存失敗',
        text: '無法更新你的資料，請稍後再試。',
        confirmButtonText: '確定',
      });
      console.log('Failed to update user:', error);
    }
  };

  useEffect(() => {
  if (newAvatar) {
    return () => URL.revokeObjectURL(newAvatar);
  }
  }, [newAvatar]);

  useEffect(() => {
  if (newCover) {
    return () => URL.revokeObjectURL(newCover);
  }
  }, [newCover]);

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
          id='avatar'
          type="file"
          accept="image/*"
          ref={avatarInputRef}
          style={{ display: 'none' }}
          onChange={handleAvatarChange}
        />
        <input 
          id='cover'
          type="file"
          accept="image/*"
          ref={coverInputRef}
          style={{ display: 'none' }}
          onChange={handleCoverChange}
        />
          <img width="634px" height="200px" src={newCover ? URL.createObjectURL(newCover) : Banner} alt='default-banner' />
          <img className={styles.updateBanner} src={Camera} alt='update-banner' onClick={handleCoverClick} htmlFor="cover"/>
          <img className={styles.deleteBanner} src={Cross} alt='delete-banner' onClick={handleDeleteCover} />
        </div>
        <div>
          <img className={styles.avatar} src={newAvatar ? URL.createObjectURL(newAvatar) : Avatar} alt='default-avatar' htmlFor="avatar" />
          <img className={styles.updateAvatar} src={Camera} alt='update-avatar' onClick={handleAvatarClick} />
        </div>
        <div className={styles.editContainer}>
            <label className={`${styles.editName} ${isNameExceeded ? styles.errorLine :''}`}>
              <div className={styles.nameTitle}>名稱</div>
              <textarea value={name} placeholder="請輸入名稱..." onChange={(e) => handleTextChange(e, setName, setNameExceeded, 50)} className={styles.nameTextArea}></textarea>
            </label>
              <div className={styles.nameLength}>{isNameExceeded && <span className={styles.exceededStyle}>字數超出上限！</span>}{name.length}/50</div>
            <label className={`${styles.editIntroduction} ${isIntroductionExceeded ? styles.errorLine :''}`} >
              <div className={styles.introductionTitle}>自我介紹</div>
              <textarea value={introduction} placeholder="請輸入自我介紹..." onChange={(e) => handleTextChange(e, setIntroduction, setIsIntroductionExceeded, 160)} className={styles.introductionTextArea}></textarea>
            </label>
             <div className={styles.introductionLength}>{isIntroductionExceeded && <span className={styles.exceededStyle}>字數超出上限！</span>}{introduction?.length}/160</div>
        </div>
      </div>
    </div>
    )
}

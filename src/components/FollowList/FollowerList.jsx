// import styles from "./FollowerList.module.scss";
// import Button from "components/Button/Button";
// import Avatar from "../../assets/icons/default-avatar.svg";

// export function FollowerList({ followList, isLoading }) {
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       {followList.map((user) => {
//         console.log("User:", user);
//         return (
//           <div className={styles.content}>
//             <div className={styles.top}>
//               <div className={styles.avatar}>
//                 <img src={user.avatar || Avatar} alt="avatar" />
//               </div>
//               <div className={styles.followerName}>{user.name}</div>
//               <div className={styles.button}>
//                 <Button
//                   title={user.isFollowed ? "正在跟隨" : "追隨"}
//                   size="middle"
//                   isAction
//                 />
//               </div>
//             </div>
//             <div className={styles.introduction}>{user.introduction}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export function FollowingList({ followList, isLoading }) {
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className={styles.container}>
//       {followList.map((user) => {
//         console.log("User:", user);
//         return (
//           <div className={styles.content}>
//             <div className={styles.top}>
//               <div className={styles.avatar}>
//                 <img src={user.avatar || Avatar} alt="avatar" />
//               </div>
//               <div className={styles.followerName}>{user.name}</div>
//               <div className={styles.button}>
//                 <Button
//                   title={user.isFollowed ? "正在跟隨" : "追隨"}
//                   size="middle"
//                 />
//               </div>
//             </div>
//             <div className={styles.introduction}>{user.introduction}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
import styles from "./FollowerList.module.scss";
import Button from "components/Button/Button";
import Avatar from "../../assets/icons/default-avatar.svg";

export function FollowerList({ avatar, name, introduction }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <img src={avatar || Avatar} alt="avatar" />
          </div>
          <div className={styles.followerName}>{name}</div>
          <div className={styles.button}>
            <Button title="正在跟隨" size="middle" isAction />
          </div>
        </div>
        <div className={styles.introduction}>{introduction}</div>
      </div>
    </div>
  );
}
export function FollowingList({ avatar, name, introduction }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <img src={avatar || Avatar} alt="avatar" />
          </div>
          <div className={styles.followerName}>{name}</div>
          <div className={styles.button}>
            <Button title="正在跟隨" size="middle" isAction />
          </div>
        </div>
        <div className={styles.introduction}>{introduction}</div>
      </div>
    </div>
  );
}

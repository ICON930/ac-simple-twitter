import SuggestUserItem from "../SuggestUserItem/SuggestUserItem.jsx";
import styles from "./SuggestUserContainer.module.scss";

export default function SuggestUserContainer() {
    return (
        <div className={styles.container}>
            <h4 className={styles.title}>推薦跟隨</h4>
            <div className={styles.list}>
                <SuggestUserItem />
                <SuggestUserItem />
                <SuggestUserItem />
                <SuggestUserItem />
                <SuggestUserItem />
                <SuggestUserItem />
                <SuggestUserItem />
                <SuggestUserItem />
                <SuggestUserItem />
                <SuggestUserItem />
                <SuggestUserItem />
                <SuggestUserItem />
            </div>
        </div>
    );
}
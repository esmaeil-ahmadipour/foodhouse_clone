import styles from "./Header.module.css";
import FoodImage from "../../assets/food.png";
import HeaderCardButton from "./HeaderCardButton.jsx";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles["logo-container"]}>
          <span className={styles["logo-icon"]}>🍔</span>
          <h1>QuickFood</h1>
        </div>
        <HeaderCardButton onClick={props.onshowCart} />
      </header>

      <div className={styles["main-image"]}>
        <div className={styles["image-overlay"]}></div>
        <img src={FoodImage} alt="Delicious meals prepared fresh" />
        <div className={styles["image-text"]}>
          <span>Fresh • Fast • Delicious</span>
        </div>
      </div>
    </>
  );
};

export default Header;
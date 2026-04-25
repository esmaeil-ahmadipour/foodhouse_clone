import styles from "./Header.module.css";
import FoodImage from "../../assets/food.png";
import HeaderCardButton from "./HeaderCardButton.jsx";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Quick Food</h1>
        <HeaderCardButton onClick={props.onshowCart} />
      </header>

      <div className={styles["main-image"]}>
        <img src={FoodImage} alt="Best Foods" />
      </div>
    </>
  );
};

export default Header;

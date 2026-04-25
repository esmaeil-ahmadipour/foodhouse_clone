import styles from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CartIcon.jsx";
import { useContext } from "react";
import CartContext from "../../store/cart-context.js";

const HeaderCardButton = (props) => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce(
    (prevValue, item) => prevValue + item.amount,
    0,
  );
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;

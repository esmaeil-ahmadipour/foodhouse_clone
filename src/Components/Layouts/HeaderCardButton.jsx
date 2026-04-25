import styles from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CartIcon.jsx";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context.js";

const HeaderCardButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isJumping, setIsJumping] = useState(false);
  const [prevCount, setPrevCount] = useState(0);
  
  const numberOfCartItems = cartCtx.items.reduce(
    (prevValue, item) => prevValue + item.amount,
    0,
  );

  // Trigger jump when item is added
  useEffect(() => {
    if (numberOfCartItems > prevCount && numberOfCartItems > 0) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 300);
    }
    setPrevCount(numberOfCartItems);
  }, [numberOfCartItems, prevCount]);

  return (
    <button 
      className={`${styles.button} ${isJumping ? styles.jump : ''}`} 
      onClick={props.onClick}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles.cartText}>Cart</span>
      <span className={`${styles.badge} ${numberOfCartItems > 0 ? styles.hasItems : ''}`}>
        {numberOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCardButton;
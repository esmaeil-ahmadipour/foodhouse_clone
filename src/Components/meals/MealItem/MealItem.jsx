import { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  const cartContext = useContext(CartContext);
  let price = `${props.price} تومان`;
  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price  
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>
          {props.name}
          <div className={styles.description}>{props.description} </div>
          <div className={styles.price}>{price}</div>
        </h3>
      </div>
      <MealItemForm id={props.key} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealItem;

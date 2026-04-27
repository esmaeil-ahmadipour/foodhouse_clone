import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useCartStore } from "../../../store/useCartStore";

const MealItem = (props) => {
  const addItem = useCartStore((state) => state.addItem);
  let price = `${props.price} USD`;

  const addToCartHandler = (amount) => {
    addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
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
      <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealItem;

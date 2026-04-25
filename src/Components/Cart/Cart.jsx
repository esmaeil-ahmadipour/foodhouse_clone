import { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItemAddHandler = (item) => {
    cartCtxt.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtxt.removeItem(id);
  };

  const cartCtxt = useContext(CartContext);
  const totalAmounts = ` ${cartCtxt.totalAmount} تومان`;
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtxt.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        ></CartItem>
      ))}
    </ul>
  );

  const isEmptyCart = cartCtxt.items.length < 1;
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>قیمت کل</span>

        <span>{totalAmounts}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["cart-button-alt"]} onClick={props.onClose}>
          بستن
        </button>

        {!isEmptyCart && <button className={styles.button}>سفارش</button>}
      </div>
    </Modal>
  );
};

export default Cart;

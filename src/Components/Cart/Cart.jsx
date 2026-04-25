import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/useHttp";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const { loading, error, sendRequest } = useHttp();
  const [requestResult, setRequestResult] = useState();

  const cartItemAddHandler = (item) => {
    cartCtxt.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtxt.removeItem(id);
  };

  const cartCtxt = useContext(CartContext);
  const totalAmounts = ` ${cartCtxt.totalAmount} USD`;
  const hasItem = cartCtxt.items.length > 0;
  const orderClickHandler = () => {
    setIsCheckout(true);
  };

  const checkoutConfirmHandler = (userInfo) => {
    sendRequest(
      {
        url: "http://localhost:3002/order",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: {
          order: {
            user: userInfo,
            meals: cartCtxt.items,
          },
        },
      },
      (data) => {
        setRequestResult(data.result);
        if (data.result === "ok") {
          cartCtxt.clear();
        }
      },
    );
  };

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["cart-button-alt"]} onClick={props.onClose}>
        Close
      </button>

      {hasItem && (
        <button className={styles.button} onClick={orderClickHandler}>
          Place Order
        </button>
      )}
    </div>
  );

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

  const modalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Price</span>

        <span>{totalAmounts}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.onClose}
          onConfirm={checkoutConfirmHandler}
        ></Checkout>
      )}
      {!isCheckout && modalActions}
    </>
  );
  const modalLoading = <p>Sending request...</p>;
  const modalError = <p> Failed to send request </p>;
const modalSucceedMessage = (
  <div className={styles.successContainer}>
    <div className={styles.successIcon}>✅</div>
    <h3 className={styles.successTitle}>Order Confirmed! 🎉</h3>
    <p className={styles.successMessage}>Your order has been successfully submitted</p>
    <p className={styles.successDetails}>We'll send you a confirmation email shortly</p>
    <button className={styles.successButton} onClick={props.onClose}>
      Continue Shopping
    </button>
  </div>
);
  return (
    <Modal onClose={props.onClose}>
      {!loading && !error && requestResult !== "ok" && modalContent}
      {loading && modalLoading}
      {error && modalError}
      {requestResult === "ok" && modalSucceedMessage}
    </Modal>
  );
};

export default Cart;

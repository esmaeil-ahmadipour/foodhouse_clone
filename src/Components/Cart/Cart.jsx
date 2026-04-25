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
  const totalAmounts = ` ${cartCtxt.totalAmount} تومان`;
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
        بستن
      </button>

      {hasItem && (
        <button className={styles.button} onClick={orderClickHandler}>
          سفارش
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
        <span>قیمت کل</span>

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
  const modalLoading = <p>در حال ارسال درخواست</p>;
  const modalError = <p> خطا در ارسال درخواست </p>;
  const modalSucceedMessage = <p> درخواست شما ثبت گردید </p>;
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

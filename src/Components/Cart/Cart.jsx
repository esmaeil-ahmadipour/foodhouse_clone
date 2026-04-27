import { useState } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/useHttp";
import { useModalStore } from "../../store/useModalStore";
import { useCartStore } from "../../store/useCartStore";

const Cart = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const [isCheckout, setIsCheckout] = useState(false);
  const { loading, error, sendRequest } = useHttp();
  const [requestResult, setRequestResult] = useState();

  // Migrated from CartContext to useCartStore (Zustand)
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clear);

  const totalAmounts = `${totalAmount} USD`;
  const hasItem = items.length > 0;

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

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
            meals: items,
          },
        },
      },
      (data) => {
        setRequestResult(data.result);
        if (data.result === "ok") {
          clearCart();
        }
      },
    );
  };

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["cart-button-alt"]} onClick={closeModal}>
        Close
      </button>
      {hasItem && (
        <button className={styles.button} onClick={orderClickHandler}>
          Place Order
        </button>
      )}
    </div>
  );

  const cartItemsList = (
    <ul className={styles["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalContent = (
    <>
      {items.length > 0 && cartItemsList}
      {items.length === 0 && (
        <div className={styles.emptyCart}>
          <p>Your cart is empty 😢</p>
          <p>Add some delicious meals!</p>
        </div>
      )}
      {items.length > 0 && (
        <div className={styles.total}>
          <span>Total Price</span>
          <span>{totalAmounts}</span>
        </div>
      )}
      {isCheckout && (
        <Checkout onCancel={closeModal} onConfirm={checkoutConfirmHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const modalLoading = <p>Sending request...</p>;
  const modalError = <p>Failed to send request</p>;
  const modalSucceedMessage = (
    <div className={styles.successContainer}>
      <div className={styles.successIcon}>✅</div>
      <h3 className={styles.successTitle}>Order Confirmed! 🎉</h3>
      <p className={styles.successMessage}>
        Your order has been successfully submitted
      </p>
      <p className={styles.successDetails}>
        We'll send you a confirmation email shortly
      </p>
      <button className={styles.successButton} onClick={closeModal}>
        Continue Shopping
      </button>
    </div>
  );

  return (
    <>
      {!loading && !error && requestResult !== "ok" && modalContent}
      {loading && modalLoading}
      {error && modalError}
      {requestResult === "ok" && modalSucceedMessage}
    </>
  );
};

export default Cart;

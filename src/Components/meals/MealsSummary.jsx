import styles from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={styles.summary}>
      <div className={styles["offer-badge"]}>
        ⚡ LIMITED TIME OFFER - 20% OFF YOUR FIRST ORDER ⚡
      </div>
      
      <div className={styles["main-content"]}>
        <div className={styles["text-section"]}>
          <h2 className={styles.title}>
            Delicious Meals, <span className={styles.highlight}>Delivered Fast</span>
          </h2>
          <p className={styles.subtitle}>
            Choose your favorite dishes and get them in under 30 minutes
          </p>
        </div>
        
        <button className={styles["order-btn"]}>
          Order Now & Save 20% 🍕
        </button>
      </div>

      <div className={styles["features"]}>
        <div className={styles["feature"]}>
          <span className={styles["feature-icon"]}>🚚</span>
          <span>Free Delivery</span>
        </div>
        <div className={styles["feature"]}>
          <span className={styles["feature-icon"]}>⭐</span>
          <span>4.9 Rating</span>
        </div>
        <div className={styles["feature"]}>
          <span className={styles["feature-icon"]}>💰</span>
          <span>Best Prices</span>
        </div>
      </div>
    </section>
  );
};

export default MealsSummary;

import styles from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={styles.summary}>
      <h2>با لذیذترین غذاها در خدمت شما هستیم</h2>
      <p>
        غذای مورد علاقه خود را انتخاب کنید و در کمترین زمان نحویل گرفته و از آن
        لذت ببرید
      </p>
      <p>سریعتر از همه و با کیفیت عالی</p>
    </section>
  );
};

export default MealsSummary;

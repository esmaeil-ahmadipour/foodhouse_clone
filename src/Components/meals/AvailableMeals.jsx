import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const { loading, error, sendRequest } = useHttp();
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    sendRequest(
      {
        url: "http://localhost:3002/meals",
      },
      (data) => setMeals(data),
    );
  }, [sendRequest]);

  if (loading) {
    return (
      <section className={styles.loaidn}>
        <p>Loading ...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.error}>
        <p>Error !</p>
        <p>{error}</p>
      </section>
    );
  }

  let mealsList = meals.map((m) => (
    <MealItem
      name={m.name}
      price={m.price}
      description={m.description}
      id={m.id}
    ></MealItem>
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

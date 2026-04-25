import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const MealsList = [
  {
    id: 1,
    name: "قرمه سبزی",
    description: "یکی از پر طرفدار ترین غذا های ایرانی",
    price: 60000,
  },
  {
    id: 2,
    name: "ماکارونی",
    description: "یکی از بدون طرفدار ترین غذا های ایرانی",
    price: 85000,
  },
  {
    id: 3,
    name: "ناگت مرغ",
    description: "یکی از کم طرفدار ترین غذا های ایرانی",
    price: 45000,
  },
];

const AvailableMeals = () => {
  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {MealsList.map((m) => (
            <MealItem 
            name={m.name}
                        price={m.price}

                                    description={m.description}

                        id={m.id}

            ></MealItem>
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

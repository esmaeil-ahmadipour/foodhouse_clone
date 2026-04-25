import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef } from "react";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumberic= +enteredAmount;
    props.onAddToCart(enteredAmountNumberic);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        lable="تعداد"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>

      <button type="submit">+ افزودن</button>
    </form>
  );
};

export default MealItemForm;

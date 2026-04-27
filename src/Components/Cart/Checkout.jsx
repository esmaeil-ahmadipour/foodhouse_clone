import styles from "./Checkout.module.css";
import { useCheckoutStore } from "../../store/useCheckoutStore";

const Checkout = (props) => {
  const form = useCheckoutStore((state) => state.form);
  const errors = useCheckoutStore((state) => state.errors);
  const setField = useCheckoutStore((state) => state.setField);
  const validate = useCheckoutStore((state) => state.validate);
  const reset = useCheckoutStore((state) => state.reset);

  const controlClass = (hasError) =>
    [styles.control, hasError && styles.invalid].filter(Boolean).join(" ");

  const changeHandler = (event) => {
    const { id, value } = event.target;
    setField(id, value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const result = validate();

    if (!result.success) return;

    props.onConfirm(result.data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={controlClass(!!errors.name)}>
        <label htmlFor="name">Name:</label>
        <input id="name" value={form.name} onChange={changeHandler} />
        {errors.name && <p className={styles.invalid}>{errors.name}</p>}
      </div>

      <div className={controlClass(!!errors.street)}>
        <label htmlFor="street">Street:</label>
        <input id="street" value={form.street} onChange={changeHandler} />
        {errors.street && <p className={styles.invalid}>{errors.street}</p>}
      </div>

      <div className={controlClass(!!errors.code)}>
        <label htmlFor="code">Code:</label>
        <input id="code" value={form.code} onChange={changeHandler} />
        {errors.code && <p className={styles.invalid}>{errors.code}</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;

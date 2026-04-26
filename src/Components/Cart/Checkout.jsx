import { useState } from "react";
import { checkoutSchema } from "../../validation/checkoutSchema";
import styles from "./Checkout.module.css";

const controlClass = (hasError) =>
  `${styles.control} ${hasError ? styles.invalid : ""}`;

const Checkout = (props) => {
  const [form, setForm] = useState({
    name: "",
    street: "",
    code: "",
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    const { id, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const result = checkoutSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};

      // Zod v4 uses .issues array
      result.error.issues.forEach((err) => {
        const fieldPath = err.path[0];
        fieldErrors[fieldPath] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    props.onConfirm(result.data);
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
        <button type="submit" className={styles.submit}>
          Confirm
        </button>

        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;

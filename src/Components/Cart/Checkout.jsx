import styles from "./Checkout.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../../validation/checkoutSchema";

const Checkout = ({ onCancel, onConfirm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const submitHandler = (data) => {
    onConfirm(data);
  };

  const controlClass = (hasError) =>
    [styles.control, hasError && styles.invalid].filter(Boolean).join(" ");

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={controlClass(errors.name)}>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className={controlClass(errors.street)}>
        <label htmlFor="street">Street:</label>
        <input id="street" {...register("street")} />
        {errors.street && <p>{errors.street.message}</p>}
      </div>

      <div className={controlClass(errors.code)}>
        <label htmlFor="code">Code:</label>
        <input id="code" {...register("code")} />
        {errors.code && <p>{errors.code.message}</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel}>
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

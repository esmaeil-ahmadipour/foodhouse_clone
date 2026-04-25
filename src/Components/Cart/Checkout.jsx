import useInput from "../../hooks/useInput";
import styles from "./Checkout.module.css";



const controlClass = (hasSomeError) =>
  `${styles.control} ${hasSomeError ? styles.invalid : ""}`;

const Checkout = (props) => {
  const isFilled = (value) => `${value}`.trim().length > 0;
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput(isFilled);

  const {
    value: street,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
  } = useInput(isFilled);

  const {
    value: code,
    isValid: codeIsValid,
    hasError: codeHasError,
    valueChangeHandler: codeChangeHandler,
    blurHandler: codeBlurHandler,
  } = useInput(isFilled);


  const submitHandler = (event) => {
  event.preventDefault();
  let formIsValid = nameIsValid && streetIsValid && codeIsValid;
  if (!formIsValid) return;
  let userInfo = { name, street, code };
  props.onConfirm(userInfo);
};

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={controlClass(nameHasError)}>
        <label htmlFor="name"> نام :</label>
        <input
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          type="text"
          id="name"
        ></input>
        {nameHasError && <p className={styles.invalid}>فیلد نام پر شود</p>}
      </div>

      <div className={controlClass(streetHasError)}>
        <label htmlFor="street"> خیابان :</label>
        <input
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          type="text"
          id="street"
        ></input>
        {streetHasError && <p className={styles.invalid}>فیلد خیابان پر شود</p>}
      </div>

      <div className={controlClass(codeHasError)}>
        <label htmlFor="code"> پلاک :</label>
        <input
          onChange={codeChangeHandler}
          onBlur={codeBlurHandler}
          type="text"
          id="code"
        ></input>
        {codeHasError && <p className={styles.invalid}>فیلد پلاک پر شود</p>}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          تایید
        </button>

        <button type="button" onClick={props.onCancel}>
          انصراف
        </button>
      </div>
    </form>
  );
};

export default Checkout;

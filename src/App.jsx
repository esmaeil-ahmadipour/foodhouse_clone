import { useState } from "react";
import "./App.css";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layouts/Header";
import Meals from "./Components/meals/Meals";
import CartProvider from "./store/cart-provider";


function App() {
  const [isShowCart, setIsShowCart] = useState(false);
  const showCartHandler = () => {
    setIsShowCart(true);
  };

  const hideCartHandler = () => {
    setIsShowCart(false);
  };

  return (
    <CartProvider>
      <Header onshowCart={showCartHandler} />
      <main>
        <Meals></Meals>
      </main>
      {isShowCart && <Cart onClose={hideCartHandler}></Cart>}
    </CartProvider>
  );
}
export default App;

import Header from "./Components/Layouts/Header";
import Meals from "./Components/meals/Meals";
import { useModalStore } from "./store/useModalStore";
import GlobalModalHost from "./Components/UI/GlobalModalHost";

function App() {
  const openModal = useModalStore((state) => state.openModal);

  const showCartHandler = () => {
    openModal({ type: "cart" });
  };

  return (
    <>
      <Header onshowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
      <GlobalModalHost />
    </>
  );
}

export default App;

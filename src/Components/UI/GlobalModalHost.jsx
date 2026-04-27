import { useModalStore } from "../../store/useModalStore";
import Modal from "./Modal";
import Cart from "../Cart/Cart";

const GlobalModalHost = () => {
  const isOpen = useModalStore((s) => s.isOpen);
  const type = useModalStore((s) => s.type);
  const content = useModalStore((s) => s.content);
  const closeModal = useModalStore((s) => s.closeModal);

  if (!isOpen) return null;

  let body = null;

  switch (type) {
    case "cart":
      body = <Cart onClose={closeModal} />;
      break;

    case "custom":
      body = content;
      break;
  }

  return <Modal onClose={closeModal}>{body}</Modal>;
};

export default GlobalModalHost;

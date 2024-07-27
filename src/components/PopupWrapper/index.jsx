import ReactDOM from "react-dom";

import "./styles.css";

const PopupWrapper = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="fixed z-[999] top-0 bottom-0 right-0 left-0 bg-bgDialogColor">
      {children}
    </div>,
    document.querySelector("body")
  );
};
export default PopupWrapper;

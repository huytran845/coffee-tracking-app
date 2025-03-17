// Node Modules
import ReactDom from "react-dom";

// Using the reactDom.createPortal to render components outside the main parent components, while retaining its React components.
const Modal = (props) => {
  const { children, handleCloseModal } = props;

  return ReactDom.createPortal(
    <div className="modal-container">
      <button onClick={handleCloseModal} className="modal-underlay" />
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;

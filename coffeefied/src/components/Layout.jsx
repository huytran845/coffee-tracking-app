// Node Modules
import { useState } from "react";

// Components
import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";

// The layout component defines the header and the footer section of the application.
const Layout = (props) => {
  const { children } = props;
  const { globalUser, signout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const header = (
    <header>
      <div>
        <h1 className="text-gradient">COFFEEFIED</h1>
        <p>For Coffee Enthusiasts</p>
      </div>
      {globalUser ? (
        <button
          onClick={() => {
            signout();
          }}
        >
          <p>Logout</p>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      ) : (
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          <p>Sign up for free today!</p>
          <i className="fa-solid fa-mug-hot"></i>
        </button>
      )}
    </header>
  );
  const footer = (
    <footer>
      <p>
        <span className="text-gradient">Coffeefied</span> was made by{" "}
        <a target="_blank" href="https://huy-tran.netlify.app">
          Huy Tran
        </a>{" "}
        utilzing{" "}
        <a target="_blank" href="https://www.fantacss.smoljames.com">
          FantaCSS
        </a>{" "}
        design library.
      </p>
    </footer>
  );

  // If the Modal is needed, it will be displayed above all the other components, but otherwise just wraps the footer and header around the children components.
  return (
    <>
      {showModal && (
        <Modal
          handleCloseModal={() => {
            setShowModal(false);
          }}
        >
          <Authentication
            handleCloseModal={() => {
              setShowModal(false);
            }}
          />
        </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
};

export default Layout;

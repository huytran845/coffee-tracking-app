// Node Modules
import { useState } from "react";

// Components
import Modal from "./Modal";
import Authentication from "./Authentication";

const Layout = (props) => {
  const { children } = props;
  const [showModal, setShowModal] = useState(false);

  const header = (
    <header>
      <div>
        <h1 className="text-gradient">COFFEEFIED</h1>
        <p>For Coffee Enthusiasts</p>
      </div>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        <p>Sign up for free today!</p>
        <i className="fa-solid fa-mug-hot"></i>
      </button>
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

  return (
    <>
      {showModal && (
        <Modal
          handleCloseModal={() => {
            setShowModal(false);
          }}
        >
          <Authentication />
        </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
};

export default Layout;

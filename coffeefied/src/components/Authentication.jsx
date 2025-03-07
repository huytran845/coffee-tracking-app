// Node Modules
import { useState } from "react";

const Authentication = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false);

  async function handleAuthentication() {}

  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
      <p>{isRegistration ? "Create an account!" : "Login to your account!"}</p>
      <input
        value={email}
        onChange={(emailEvent) => {
          setEmail(emailEvent.target.value);
        }}
        placeholder="example@gmail.com"
      />
      {/* {isRegistration && (
        <input
          value={email}
          onChange={(emailEvent) => {
            setEmail(emailEvent.target.value);
          }}
          placeholder="confirm@gmail.com"
        />
      )} */}
      <input
        value={password}
        onChange={(passwordEvent) => {
          setPassword(passwordEvent.target.value);
        }}
        placeholder="*******"
        type="password"
      />
      {/* {isRegistration && (
        <input
          value={password}
          onChange={(passwordEvent) => {
            setPassword(passwordEvent.target.value);
          }}
          placeholder="Confirm Password"
          type="password"
        />
      )} */}
      <button onClick={handleAuthentication()}>
        <p>Submit</p>
      </button>
      <hr />
      <div className="register-content">
        <p>
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account? Sign up today!"}
        </p>
        <button
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          <p>{!isRegistration ? "Sign Up" : "Login"}</p>
        </button>
      </div>
    </>
  );
};

export default Authentication;

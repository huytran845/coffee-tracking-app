// Node Modules
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Authentication = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login, signout } = useAuth();

  const specialChars = [
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "_",
    "-",
    "+",
    "=",
    "`",
    "|",
    "()",
    "(",
    ")",
    "{}",
    "{",
    "}",
    "[]",
    "[",
    "]",
    ":",
    ";",
    "'",
    "<>",
    ",",
    ".",
    "?",
    "/",
  ];

  function hasNumber(checkWord) {
    return /\d/.test(checkWord); //Checks through word for number and checks for metacharacter d = digit
  }

  // Function to check if there is an uppercase and lowercase value in the password
  function hasProperCases(checkWord) {
    if (checkWord === checkWord.toLowerCase()) {
      return false;
    } else if (checkWord === checkWord.toUpperCase()) {
      return false;
    } else {
      return true;
    }
  }

  async function handleAuthentication() {
    if (
      !email ||
      !email.includes("@") ||
      password.length < 8 ||
      authenticating
    ) {
      return;
    }

    try {
      setAuthenticating(true);

      if (isRegistration) {
        // if (
        //   email != confirmEmail ||
        //   !hasProperCases(password) ||
        //   !hasNumber(password) ||
        //   !specialChars.some((char) => password.includes(char)) ||
        //   password != confirmPassword
        // ) {
        // Fails to meet requirements
        // } else {
        // Registering the user
        await signup(email, password);
        // }
      } else {
        // Login the user
        await login(email, password);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAuthenticating(false);
    }
  }

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
      {isRegistration && (
        <input
          value={confirmEmail}
          onChange={(emailEvent) => {
            setConfirmEmail(emailEvent.target.value);
          }}
          placeholder="confirm@gmail.com"
        />
      )}
      <input
        value={password}
        onChange={(passwordEvent) => {
          setPassword(passwordEvent.target.value);
        }}
        placeholder="*******"
        type={showPassword ? "text" : "password"}
      />
      {isRegistration && (
        <input
          className="password"
          value={confirmPassword}
          onChange={(passwordEvent) => {
            setConfirmPassword(passwordEvent.target.value);
          }}
          placeholder="Confirm Password"
          type={showPassword ? "text" : "password"}
        />
      )}
      <div>
        <input
          type="checkbox"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
        Show Password
      </div>
      <button onClick={() => handleAuthentication()}>
        <p>{authenticating ? "Authenticating" : "Submit"}</p>
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

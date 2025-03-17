// Node Modules
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// Authentication takes in the handleCloseModal prop to close the modal upon proper form completion.
// It houses inputs from the users required for registration such as password and email.
// There are authenticating, error, and registration states to dynamically change the form for the user.
const Authentication = (props) => {
  const { handleCloseModal } = props;
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState(null);
  const { signup, login } = useAuth();

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

  // Function to check if the provided word has a number.
  function hasNumber(checkWord) {
    return /\d/.test(checkWord); //Checks through word for metacharacter d = digit
  }

  // Function to check if there is an uppercase and lowercase value in the password.
  function hasProperCases(checkWord) {
    if (checkWord === checkWord.toLowerCase()) {
      return false;
    } else if (checkWord === checkWord.toUpperCase()) {
      return false;
    } else {
      return true;
    }
  }

  // Function that checks if a given word contains a special character with an array of special characters.
  function hasSpecialChar(checkWord) {
    if (specialChars.some((char) => checkWord.includes(char))) {
      return true;
    } else {
      return false;
    }
  }

  // checkForm validates the form for each case to ensure that the user properly creates a password associated with their email.
  function checkForm() {
    if (!email.includes("@")) {
      setError("Invalid Email!");
      return false;
    } else if (email != confirmEmail) {
      setError("Emails Don't Match!");
      return false;
    } else if (!hasProperCases(password)) {
      setError("Missing Uppercase/Lowercase!");
      return false;
    } else if (!hasNumber(password)) {
      setError("Missing Number!");
      return false;
    } else if (!specialChars.some((char) => password.includes(char))) {
      setError("Missing Special Character!");
      return false;
    } else if (password != confirmPassword) {
      setError("Passwords Don't Match!");
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  // Main function that returns the HTML for the user to submit their credentials.
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
        // Checks forms for errors, if there is none, sign up user.
        if (checkForm() == true) {
          // Registering the user
          await signup(email, password);
        } else {
          return;
        }
      } else {
        // Login the user
        await login(email, password);
      }
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
      <p>{isRegistration ? "Create an account!" : "Login to your account!"}</p>
      {error && <p>❌ {error}</p>}
      {isRegistration && (
        <p>
          Password Requirements: <br />
          {hasProperCases(password) && "✅ "}1 Uppercase/Lowercase <br />{" "}
          {hasNumber(password) && "✅ "}1 Number
          <br /> {hasSpecialChar(password) && "✅ "} Special Character
          (!,?,etc.) <br /> {password.length > 8 && "✅ "} Greater Than 8
          Characters
        </p>
      )}
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

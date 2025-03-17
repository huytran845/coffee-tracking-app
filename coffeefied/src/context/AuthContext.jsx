// Node Modules
import { useState, useEffect, useContext, createContext, useMemo } from "react";
import {
  login as loginService,
  signup as signupService,
  resetPassword as resetPasswordService,
  signout as singoutService,
} from "../service/AuthService";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

// The createContext creates a Context object that allows us to pass data without manually passing it as a property.
const AuthContext = createContext();

// Node module to call in order to reference the data in the authentication.
function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider is the component that houses the global variables for all the other components, such as a user and their data.
const AuthProvider = (props) => {
  const { children } = props;
  const [globalUser, setGlobalUser] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Signup function that calls the service and throws an error if it the process fails, otherwise it signs in the new user.
  async function signup(email, password) {
    setIsLoading(true);
    try {
      const userCredential = await signupService(email, password);
      setGlobalUser(userCredential.user);
    } catch (error) {
      console.error(error);
      throw new Error("An account with this email already exists!");
    } finally {
      setIsLoading(false);
    }
  }

  // Login function that calls the service and throws an error if it the process fails, sets user as global user if success.
  async function login(email, password) {
    setIsLoading(true);
    try {
      const userCredential = await loginService(email, password);
      setGlobalUser(userCredential.user);
    } catch (error) {
      console.error(error);
      throw new Error("Incorrect Login Credentials!");
    } finally {
      setIsLoading(false);
    }
  }

  // Reset Password function that calls the service and throws an error if it the process fails.
  async function resetPassword(email) {
    setIsLoading(true);
    try {
      await resetPasswordService(email);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Signout function that calls the service and throws an error if it the process fails, otherwise it clears out the current user and their data.
  async function signout() {
    setIsLoading(true);
    try {
      await singoutService();
      setGlobalUser(null);
      setGlobalData(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // The varibles that are getting cached with memoization from React, until any of the variables change.
  const value = useMemo(
    () => ({
      globalUser,
      globalData,
      setGlobalData,
      isLoading,
      login,
      signup,
      resetPassword,
      signout,
    }),
    [globalUser, globalData, isLoading]
  );

  // useEffect runs once with the empty array when the component renders.
  // Wraps around the App to handle the api calls to firebase once the user is logged on.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Current User: ", user);
      setGlobalUser(user);

      // If there's no user, then empty user state and return from listener
      if (!user) {
        console.log("No Active User Found!");
        return;
      }

      // If there is a user , check database for user and if they exist, then fetch their data and update global state
      try {
        setIsLoading(true);

        // Get the document reference from firebase and then snapshot it to see if it exists.
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        let firebaseData = {};
        if (docSnap.exists()) {
          firebaseData = docSnap.data();
          console.log("User data found!", firebaseData);
        }
        setGlobalData(firebaseData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { useAuth };

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

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = (props) => {
  const { children } = props;
  const [globalUser, setGlobalUser] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Signup
  async function signup(email, password) {
    setIsLoading(true);
    try {
      const userCredential = await signupService(email, password);
      setGlobalUser(userCredential.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Login
  async function login(email, password) {
    setIsLoading(true);
    try {
      const userCredential = await loginService(email, password);
      setGlobalUser(userCredential.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Reset Password
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

  // Signout
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
          console.log("User data found!");
          firebaseData = docSnap.data();
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

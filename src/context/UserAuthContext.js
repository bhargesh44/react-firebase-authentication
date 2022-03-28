import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      setUser(currentUser);
      // if user is login so wqe c an not move to login page
      if (currentUser !== null) {
        navigate("/");
      }
      //......
    });
    return () => {
      unSubscribe();
    };
  }, []);
  return (
    <userAuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logOut,
        googleSignIn,
        setUpRecaptcha,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

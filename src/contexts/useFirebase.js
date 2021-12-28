import React, { useEffect, useState, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../helpers/Firebase";

const FirebaseContext = createContext({});

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.error(error);
    });
  };

  const signUpUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password).catch(
      (error) => {
        console.error(error);
      }
    );
  };

  const logout = () => {
    signOut(auth).catch((error) => {
      console.error(error);
    });
  };

  return (
    <FirebaseContext.Provider value={{ user, signInUser, signUpUser, logout }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default useFirebase = () => {
  return useContext(FirebaseContext);
};

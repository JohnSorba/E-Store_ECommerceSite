import { createContext, useContext } from "react";
import db from "../App"; // Import your App component

export const FirebaseContext = createContext();

export function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={{ db }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}

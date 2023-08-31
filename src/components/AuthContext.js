import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

// The child is the APP component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    // Add your logout logic here
    const auth = getAuth();

    try {
      await signOut(auth);
      setCurrentUser(null); // clear the current user state
    } catch {
      console.error("Logout error", error);
    }
  };

  const contextValue = {
    currentUser,
    logout,
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <AuthContext.Provider value={contextValue}>
        {!loading && children}
      </AuthContext.Provider>
    </>
  );
}

// useAuth Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}

// HANDLE USER CONTEXT
export const UserContext = createContext();

// UseContext Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// useUser Custom Hook
export function useUser() {
  return useContext(UserContext);
}

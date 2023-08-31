import { createContext, useContext, useState, useEffect } from "react";

// Create a context for user-specific data
export const UserContext = createContext();

// Context provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Simulate fetching user data from an API
  useEffect(() => {
    // Fetch user data (e.g., cart, orders, addresses) and update the state
    const fetchedUserData = fetchUserDataFromAPI();
    setUser(fetchedUserData);
  }, []);

  // Update user data in context
  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  // Context value includes user data and the updateUser function
  const contextValue = {
    user,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

// Custom hook to use user data and updateUser function
export function useUser() {
  return useContext(UserContext);
}

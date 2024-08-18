import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
export const AuthContext = createContext({
  user: null,
  updateUser: () => {},
});
export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (userdata) => {
      if (userdata) {
        setUser(userdata.providerData[0]);
      } else {
        setUser(null);
      }
    });
  }, []);
  function updateUser(userdata) {
    setUser(userdata);
  }
  const ctxValue = {
    user,
    updateUser,
  };
  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

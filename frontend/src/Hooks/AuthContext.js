// AuthContext.js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useContext } from "react";
import { auth } from "../firebase";
const authContext = createContext();

export function ProvideAuth({ children = null }) {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const result = signInWithPopup(auth, provider).catch((error) => {
      console.log(error);
    });
    // const body = {
    //   email: result.user.email,
    //   name: result.user.displayName,
    //   signIn: result.user.signIn,
    // };
    return result;
  };

  return (
    <authContext.Provider value={{ googleSignIn }}>
      {children}
    </authContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(authContext);
};

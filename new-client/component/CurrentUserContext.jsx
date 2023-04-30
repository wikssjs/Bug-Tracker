import { createContext, useState, useContext, useEffect } from "react";
import jwt from "jsonwebtoken";

const CurrentUserContext = createContext(null);

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setCurrentUser(jwt.decode(token));
      }
    }, []);
  
    return (
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </CurrentUserContext.Provider>
    );
  };
  

 export default CurrentUserProvider;

// ArticlesContext.js
import  { createContext, useState } from 'react';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [loginUser, setLoginUser] = useState(null);

    const logout = () => {
        setLoginUser(null);  // Clear the logged-in user data
      }; 

    return (
        <UserContext.Provider value={{ loginUser,setLoginUser,logout }}>
            {children}
        </UserContext.Provider>
    );
};
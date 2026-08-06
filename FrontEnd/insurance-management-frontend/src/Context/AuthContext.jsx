import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );

    const [fullName, setFullName] = useState(
        localStorage.getItem("fullName")
    );

    const login = (jwtToken, userRole, userFullName) => {

        localStorage.setItem("token", jwtToken);

        localStorage.setItem("role", userRole);

        localStorage.setItem("fullName", userFullName);

        setToken(jwtToken);

        setRole(userRole);

        setFullName(userFullName);

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        localStorage.removeItem("fullName");

        setToken(null);

        setRole(null);

        setFullName(null);

    };

    return (

        <AuthContext.Provider
            value={{
                token,
                role,
                fullName,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);
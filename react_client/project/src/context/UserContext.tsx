import { User } from "../types/User";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type userContextType = {
    user: User | null;
    setMyUser: (user: User | null) => void;  // אפשר לקבל גם null כדי להתנתק
};

const defaultContextValue: userContextType = {
    user: null,
    setMyUser: () => {},
};

const UserContext = createContext<userContextType>(defaultContextValue);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // טוען מה-sessionStorage בהתחלה (אם קיים)
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // שומר/מנקה את ה-sessionStorage בכל שינוי של user
    useEffect(() => {
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user");
        }
    }, [user]);

    const setMyUser = (newUser: User | null) => {
        setUser(newUser);
        console.log("משתמש עודכן:", newUser);
    };

    return (
        <UserContext.Provider value={{ user, setMyUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export default UserProvider;

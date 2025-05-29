import { User } from "../types/User";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type userContextType = {
    user: User | null;
    setMyUser: (user: User) => void;
};

const defaultContextValue: userContextType = {
    user: null,
    setMyUser: () => {},
};

const UserContext = createContext<userContextType>(defaultContextValue);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const setMyUser = (newUser: User) => {
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

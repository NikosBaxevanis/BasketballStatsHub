import React, { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "./types";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  console.log(localStorage.getItem("user"));

  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "")
    : null;
  const [user, setUser] = useState<User | null>(storedUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

import { User } from "@supabase/supabase-js";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import supabase from "../lib/supabase-client";

type LoginOptions = {
  email: string;
  password: string;
};

type Login = (options: LoginOptions) => void;

type Logout = () => void;

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: Login;
  logout: Logout;
}

const defaultValue: AuthContextValue = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = React.createContext<AuthContextValue>(defaultValue);

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const login = useCallback<Login>(
    async ({ email, password }) => {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (user) {
        setUser(user);
        history.replace("/");
      }
      if (error) {
        toast.error(error.message);
      }
    },
    [history]
  );

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      setUser(null);
      history.replace("/login");
    }
  }, [history]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await supabase.auth.session();
      console.log(session);
      if (session) {
        setUser(session.user);
      }
      setSessionLoaded(true);
    };
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {sessionLoaded ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

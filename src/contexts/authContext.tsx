import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from "next/router";

import { userInformationAPI } from "../services/user.information.api";
import { ResponseUserInformation } from "../types/ResponseUserInformation";
import { loginUserAPI } from "../services/login.user.api";
import { useNotification } from "../hooks/useNotification";

type AuthContextType = {
  isAuthenticated: boolean;
  user: ResponseUserInformation;
  loading: boolean;
  handleLogin: (data: SignInData) => Promise<void>;
  handleLogout: () => void;
}

type SignInData = {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const { notificationError, notificationSuccess } = useNotification();
  
  const [user, setUser] = useState<ResponseUserInformation | null>(null)
  const [loading, setLoading] = useState(false);

  let isAuthenticated = !!user;

  const handleLogin = useCallback(async ({ email, password }: SignInData) => {
    setLoading(true);

    try {
      setLoading(true);
      const { user, token } = await loginUserAPI({
        email,
        password,
      })
      setUser(user)

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })
  
      Router.push('/app');
      
      notificationSuccess({ message: 'Cadastro realizado com sucesso' })
    } catch (error) {
      notificationError({ message: error.message });
    }
    finally {
      setLoading(false);
    }
  }, [notificationSuccess, notificationError])

  const handleLogout = useCallback(() => {
    destroyCookie(null, 'nextauth.token');
    setUser(null);
    Router.push('/');
  }, [])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      userInformationAPI({ 'Authorization': `Bearer ${token}` }).then(response => {
        setUser(response);
        Router.push('/app');
      })
    }
  }, []);

  const values = useMemo(() => {
    return {
      user,
      isAuthenticated,
      loading,
      handleLogin,
      handleLogout,
    }
  }, [user, isAuthenticated, loading, handleLogin, handleLogout]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}
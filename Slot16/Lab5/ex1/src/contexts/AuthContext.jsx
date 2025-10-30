// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import movieApi from '../api/movieAPI';

const AuthStateContext = createContext(null);
const AuthDispatchContext = createContext(null);

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
      const { data } = await movieApi.get('/accounts', { params: { username, password } });
      if (Array.isArray(data) && data.length > 0) {
        const u = data[0];
        setUser(u);
        localStorage.setItem('auth_user', JSON.stringify(u));
        return { ok: true, user: u };
      }
      return { ok: false, message: 'Sai tài khoản hoặc mật khẩu' };
    } catch {
      return { ok: false, message: 'Không thể kết nối server' };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
  }, []);

  return (
    <AuthStateContext.Provider value={{ user, loading }}>
      <AuthDispatchContext.Provider value={{ login, logout }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

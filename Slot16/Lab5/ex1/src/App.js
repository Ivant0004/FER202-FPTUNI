// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuthState } from "./contexts/AuthContext";
import { MovieProvider } from "./contexts/MovieContext";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import MovieManager from "./pages/MovieManager";

function PrivateRoute({ children }) {
  const { user } = useAuthState();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  console.log("✅ App loaded");
  return (
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/movies"
              element={
                <PrivateRoute>
                  <MovieManager />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

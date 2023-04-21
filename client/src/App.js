import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import AdminTable from "./components/AdminTable";
import Quiz from "./components/Questions";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute/AdminProtectedRoute";

import "./index.css";
import Cookies from "js-cookie";

function App() {
  const role = Cookies.get("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            role !== "admin" ? (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ) : (
              <AdminProtectedRoute>
                <Home />
              </AdminProtectedRoute>
            )
          }
        />
        <Route path="/login" exact element={<LoginPage />} />
        <Route
          path="/admintable"
          exact
          element={
            role !== "admin" ? (
              <ProtectedRoute>
                <AdminTable />
              </ProtectedRoute>
            ) : (
              <AdminProtectedRoute>
                <AdminTable />
              </AdminProtectedRoute>
            )
          }
        />
        <Route
          path="/quiz"
          exact
          element={
            role !== "admin" ? (
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            ) : (
              <AdminProtectedRoute>
                <Quiz />
              </AdminProtectedRoute>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


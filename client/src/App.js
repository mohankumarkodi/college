import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import AdminTable from "./components/AdminTable";
import Quiz from "./components/Questions";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/admintable" exact element={<AdminTable/>}/>
        <Route path="/quiz" exact element={<Quiz/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

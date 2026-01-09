import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext.tsx";

export default function AppRoutes() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

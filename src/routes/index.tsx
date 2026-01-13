import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext.tsx";
import Feed from "../components/Feed.tsx";
import MyUserProfile from "../components/MyUserProfile.tsx";

export default function AppRoutes() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/user/my-profile" element={<MyUserProfile />} />          
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

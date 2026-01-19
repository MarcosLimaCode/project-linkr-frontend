import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp.tsx";
import SignIn from "../pages/SignIn.tsx";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext.tsx";
import FeedPage from "../pages/Feed/FeedPage.tsx";
import MyUserProfile from "../components/MyUserProfile.tsx";
import UsersProfile from "../pages/UserProfile/UsersProfile.tsx";

export default function AppRoutes() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/user/my-profile" element={<MyUserProfile />} />
          <Route path="/user/:id" element={<UsersProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

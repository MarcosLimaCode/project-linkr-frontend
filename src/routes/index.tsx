import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

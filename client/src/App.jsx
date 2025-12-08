import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";

export default function App(){

  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element = {<SignupPage />} />
        <Route path="/signin" element = {<SigninPage />} />
      </Routes>
    </BrowserRouter>
  </>
}
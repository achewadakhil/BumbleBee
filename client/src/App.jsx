import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import Home from "./pages/Home";



function Layout(){
  return <div className="h-screen bg-gray-900">
    <Outlet />
  </div>
}

export default function App(){

  return <>
    <BrowserRouter>
      <Routes>
          <Route element = {<Layout />}>
            <Route path = "/" element = { <Home />} />
            <Route path="/signup" element = {<SignupPage />} />
            <Route path="/signin" element = {<SigninPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </>
}
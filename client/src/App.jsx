import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";

export default function App(){

  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Signup />} />
      </Routes>
    </BrowserRouter>
  </>
}
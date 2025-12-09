import { BrowserRouter, Outlet, Route, Routes, useNavigate, Link } from "react-router-dom";
import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import Home from "./pages/Home";


function NavBar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <nav className="w-full bg-gray-800 text-white shadow-md px-8 py-4 flex items-center justify-between">

      <div className="flex items-center gap-8">
        <h1 className="text-3xl font-extrabold tracking-wide select-none">
          Bumble<span className="text-yellow-400">Bee</span>
        </h1>

        <Link 
          to="/buy" 
          className="text-lg font-medium hover:text-blue-400 transition"
        >
          Buy
        </Link>

        {role === "admin" && (
          <Link 
            to="/post" 
            className="text-lg font-medium hover:text-blue-400 transition"
          >
            Post
          </Link>
        )}
      </div>

      <div className="flex items-center gap-6">

        <Link 
          to="/" 
          className="text-lg font-medium hover:text-blue-400 transition"
        >
          Home
        </Link>

        {!token && (
          <>
            <Link 
              to="/signup" 
              className="text-lg font-semibold hover:text-blue-400 transition"
            >
              Sign Up
            </Link>

            <Link 
              to="/signin" 
              className="text-lg font-semibold hover:text-blue-400 transition"
            >
              Sign In
            </Link>
          </>
        )}
        {token && (
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="text-lg font-semibold hover:text-red-400 transition"
          >
            Sign Out
          </button>
        )}
      </div>

    </nav>
  );
}



function Layout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

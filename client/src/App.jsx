import { BrowserRouter, Outlet, Route, Routes, useNavigate, Link } from "react-router-dom";

import SigninPage from "./pages/Signin";
import SignupPage from "./pages/Signup";
import Home from "./pages/Home";
import PostAd from "./pages/PostAd";
import BuyAd from "./pages/BuyAd";
import BuyAdForm from "./pages/BuyAdForm";
import { useState } from "react";
import FeedbackForm from "./pages/FeedbackForm";


function NavBar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // console.log("token",token);

  // console.log(typeof(token));

  return (
    <nav className="w-full bg-gray-800 text-white shadow-md px-8 py-4 flex items-center justify-between">

      <div className="flex items-center gap-8">
        <h1 className="text-3xl font-extrabold tracking-wide select-none">
          Bumble<span className="text-yellow-400">Bee</span>
        </h1>

        {
          (token && token !== "undefined" && token !== "null") &&
          (
            <>
              <Link 
                to="/buy" 
                className="text-lg font-medium hover:text-blue-400 transition"
              >
                Buy
              </Link>

              {role === "vendor" && (
                <Link 
                  to="/post" 
                  className="text-lg font-medium hover:text-blue-400 transition"
                >
                  Post
                </Link>
              )}

              <Link 
                to="/questions" 
                className="text-lg font-medium hover:text-blue-400 transition"
              >
                FeedBack
              </Link>
            </>
          )
        }

        
      </div>

      <div className="flex items-center gap-6">

        <Link 
          to="/" 
          className="text-lg font-medium hover:text-blue-400 transition"
        >
          Home
        </Link>

        {(!token || token === "undefined" || token === "null") && (
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
        {(token && token !== "undefined" && token !== "null") && (
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

function MVPBanner() {
  return (
    <div className="bg-yellow-600 text-black text-sm px-4 py-2 text-center">
      ⚠️ This is an MVP (early prototype) built only to validate market fit.
      Features may be incomplete and data may reset.
      Please share your feedback using the chat button at the bottom-left.
    </div>
  );
}

function ChatBox({ onClose }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const token = localStorage.getItem("token");

  async function handleSend() {
    if (!message.trim()) return;

    try {
      setSending(true);

      const res = await fetch("http://localhost:8080/feedback", {
        method: "POST",
        credentials : "include",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          message,
        }),
      });

      if (!res.ok) {
        console.error("Failed to send message");
        return;
      }

      setMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="w-80 h-96 bg-gray-800 rounded-xl shadow-xl flex flex-col border border-gray-700">

      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 rounded-t-xl">
        <h3 className="font-semibold">Messages</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
        This chat is part of an MVP and is only for testing and feedback.
      </div>

      <div className="flex-1 p-3 overflow-y-auto text-sm text-gray-300">
        <p className="text-gray-400">
          👋 Hi! This is an early prototype chat.
            Your feedback is extremely important to us and helps shape the future of this product.
            Please share any thoughts, suggestions, or issues you notice.
        </p>
      </div>
      <div className="p-3 border-t border-gray-700 flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Any suggestions from your side"
          className="flex-1 p-2 rounded bg-gray-700 outline-none text-sm"
        />
        
        <button
          onClick={handleSend}
          disabled={sending || !message.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-3 rounded text-sm font-semibold transition"
        >
          {sending ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}


function Layout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      
      <MVPBanner />

      <NavBar />

      <main>
        <Outlet />
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <ChatBox onClose={() => setIsChatOpen(false)} />
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition"
          >
            💬 Feedback
          </button>
        )}
      </div>
    </div>
  );
}




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path = "/" element={<Home />} />
          <Route path = "/signup" element={<SignupPage />} />
          <Route path = "/signin" element={<SigninPage />} />
          <Route path = "/post" element = {<PostAd />} />
          <Route path = "/buy" element = {<BuyAd />} />
          <Route path = "/buy/:adId" element = {<BuyAdForm />} />
          <Route path = "/questions" element = {<FeedbackForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

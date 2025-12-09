import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-white px-4 mt-32">
      
      <h1 className="text-5xl font-extrabold mb-8 text-center">
        BumbleBee
      </h1>

      <div className="flex gap-6">

        <Link
          to="/signup"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-semibold transition"
        >
          Sign Up
        </Link>

        <Link
          to="/signin"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-lg font-semibold transition"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

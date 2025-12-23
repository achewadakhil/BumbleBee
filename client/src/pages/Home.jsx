import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-white px-4 mt-16">
      
      <h1 className="text-5xl font-extrabold mb-6 text-center">
        BumbleBee
      </h1>

      <p className="max-w-2xl text-center text-lg text-gray-300 leading-relaxed mb-6">
        BumbleBee is an early-stage application (MVP) built to help the users to invest in the nearby shops easily.
        This product is still under development and may not be perfect.
        Your feedback will directly influence how it improves.
      </p>

      <p className="max-w-2xl text-center text-base text-gray-400 leading-relaxed mb-8">
        <span className="font-semibold text-gray-200">Example scenario:</span>{" "}
        Imagine I have 5000 rupees which are staying with me ideally, if I have knowledge about the big companies like Infosys,TATA.I prefer to invest in them, but lets say I dont have much knowledge about it rather I know a shop near me which is profitable and trusted then I prefer to invest my 5000 in the shop which is in front of me.
      </p>

      <p className="text-sm text-gray-500 text-center mb-6">
        This is not a finished product. Honest feedback — including what doesn’t work —
        is more valuable than praise.
        Login with 
      </p>

      <Link
        to="/feedback"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
      >
        Share Feedback
      </Link>
    </div>
  );
}

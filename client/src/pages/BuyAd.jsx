import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL;



function AdCard({ data, onBuy }) {
  return (
    <div className="bg-gray-800 text-white rounded-xl p-5 shadow-md hover:shadow-lg transition flex flex-col justify-between">
      
      <div>
        <h2 className="text-xl font-semibold mb-2">
          {data.company_name}
        </h2>

        <p className="text-sm text-gray-300">
          Equity: {data.equity_share}%
        </p>

        <p className="text-sm text-gray-300">
          Expected Cash: ₹{data.expected_cash}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Valid till: {new Date(data.validity).toDateString()}
        </p>
      </div>

      <button
        onClick={() => onBuy(data._id)}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
      >
        Buy Ad
      </button>

    </div>
  );
}

export default function BuyAd() {
  const [ads, setAds] = useState([]);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  async function handleBuy(adId) {
    navigate(`/buy/${adId}`);
  }

  useEffect(() => {
    if (!token || token === "null" || token === "undefined") {
      console.log("Token not found");
      return;
    }

    async function fetchPosts() {
      try {
        const res = await fetch(`${API}/buy/allPosts`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });

        const data = await res.json();
        console.log(data.allPosts);
        setAds(data.allPosts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, [token]);

  return (
    <div className="min-h-screen bg-inherit px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        Available Ads
      </h1>

      {ads.length === 0 ? (
        <p className="text-gray-400">No ads available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <AdCard key={ad._id} data={ad} onBuy={handleBuy}/>
          ))}
        </div>
      )}
    </div>
  );
}



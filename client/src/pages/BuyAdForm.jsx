import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BuyAdForm() {
  const { adId } = useParams();
  const [ad, setAd] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchAdDetails() {
      try {
        const res = await fetch(`http://localhost:8080/buy/ad/${adId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token,
          },
        });

        if (!res.ok) {
          console.log("Error fetching ad details");
          return;
        }

        const data = await res.json();
        setAd(data.foundAd);
      } catch (err) {
        console.error(err);
      }
    }

    fetchAdDetails();
  }, [adId, token]);

  if (!ad) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading ad details...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-inherit px-6 py-10 flex justify-center">
    <div className="w-full max-w-6xl bg-gray-800 text-white p-6 rounded-xl shadow-lg">

      <h2 className="text-3xl font-bold mb-6">
        {ad.company_name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-6 text-sm text-gray-300">

          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-3 text-base">
              Company Financials
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <p><span className="font-semibold">Total Assets:</span> ₹{ad.curr_cap}</p>
              <p><span className="font-semibold">Inventory Value:</span> ₹{ad.prod_val}</p>
              <p><span className="font-semibold">Current Debts:</span> ₹{ad.curr_debts}</p>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-3 text-base">
              Fundraising Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <p><span className="font-semibold">Equity Offered:</span> {ad.equity_share}%</p>
              <p><span className="font-semibold">Expected Valuation:</span> ₹{ad.expected_cash}</p>
              <p><span className="font-semibold">Equity Remaining:</span> {ad.equity_remaining}%</p>
              <p><span className="font-semibold">Funds Received:</span> ₹{ad.received_cash}</p>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-3 text-base">
              Monthly Expenses
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <p><span className="font-semibold">Monthly Rents:</span> ₹{ad.monthly_rents}</p>
              <p><span className="font-semibold">Monthly Wages:</span> ₹{ad.monthly_wages}</p>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-3 text-base">
              Listing Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <p><span className="font-semibold">Valid Till:</span> {new Date(ad.validity).toDateString()}</p>
            </div>
          </div>

        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Buy This Equity
          </h3>

          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Amount to Invest (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 100000"
                className="w-full p-2 rounded bg-gray-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Equity Required (%)
              </label>
              <input
                type="number"
                placeholder="e.g. 5"
                className="w-full p-2 rounded bg-gray-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Message to Founder (optional)
              </label>
              <textarea
                rows="3"
                placeholder="Why are you interested?"
                className="w-full p-2 rounded bg-gray-700 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
            >
              Submit Purchase Request
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>

  );
}

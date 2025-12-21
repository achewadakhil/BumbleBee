import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function BuyEquity({ cash_remaining, equity_share, expected_cash }) {
  const [amount, setAmount] = useState("");
  const [equity, setEquity] = useState(0);
  const [error, setError] = useState("");

  const {adId} = useParams();

  function handleAmountChange(e) {
    const value = Number(e.target.value);
    setAmount(value);

    if (value > cash_remaining) {
      setError(`Amount cannot exceed ₹${cash_remaining}`);
      setEquity(0);
      return;
    }

    if (value <= 0) {
      setError("Amount must be greater than 0");
      setEquity(0);
      return;
    }

    setError("");
    const calculatedEquity = (value * equity_share) / expected_cash;
    setEquity(Number(calculatedEquity.toFixed(2)));
  }

  async function handleSubmit(e) {

    e.preventDefault();
    if (error || !amount) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/buy/ad/${adId}`,{
      method : "POST",
      headers : {
        token,
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
          amount,
          equity
      })
    });

    console.log({
      invested_amount: amount,
      equity_requested: equity,
    });
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 sticky top-6">
      <h3 className="text-xl font-semibold mb-1">Buy Equity</h3>
      <p className="text-sm text-gray-400 mb-4">
        Remaining funding: ₹{cash_remaining}
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Investment Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder={`Max ₹${cash_remaining}`}
            className="w-full p-2 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-blue-600"
          />
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Equity You’ll Receive (%)
          </label>
          <input
            type="number"
            value={equity}
            readOnly
            className="w-full p-2 rounded bg-gray-700 text-gray-300 cursor-not-allowed"
          />
        </div>

        <div className="bg-gray-800 p-3 rounded text-xs text-gray-300 leading-relaxed">
          ⚠️ This investment is based on mutual trust.  
          Please review all company details carefully before proceeding.
        </div>

        <button
          type="submit"
          disabled={!!error || !amount}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-2 rounded-lg font-semibold transition"
        >
          Submit Purchase Request
        </button>
      </form>
    </div>
  );
}


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

        console.log(data);
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
    <div className="min-h-screen bg-gray-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-8 text-white">
          {ad.company_name}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6 text-sm text-gray-300">

            <Section title="Company Financials">
              <Item label="Total Assets" value={`₹${ad.curr_cap}`} />
              <Item label="Inventory Value" value={`₹${ad.prod_val}`} />
              <Item label="Current Debts" value={`₹${ad.curr_debts}`} />
            </Section>

            <Section title="Fundraising Details">
              <Item label="Equity Offered" value={`${ad.equity_share}%`} />
              <Item label="Target Raise" value={`₹${ad.expected_cash}`} />
              <Item label="Funds Received" value={`₹${ad.received_cash}`} />
              <Item label="Remaining Funds" value={`₹${ad.cash_remaining}`} />
            </Section>

            <Section title="Monthly Expenses">
              <Item label="Monthly Rent" value={`₹${ad.monthly_rents}`} />
              <Item label="Monthly Wages" value={`₹${ad.monthly_wages}`} />
            </Section>

            <Section title="Listing Info">
              <Item
                label="Valid Till"
                value={new Date(ad.validity).toDateString()}
              />
            </Section>

          </div>

          <BuyEquity
            cash_remaining={ad.cash_remaining}
            equity_share={ad.equity_share}
            expected_cash={ad.expected_cash}
          />

        </div>
      </div>
    </div>
  );
}

/* ================= SMALL UI HELPERS ================= */

function Section({ title, children }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Item({ label, value }) {
  return (
    <p>
      <span className="font-semibold text-gray-200">{label}:</span>{" "}
      <span className="text-gray-300">{value}</span>
    </p>
  );
}

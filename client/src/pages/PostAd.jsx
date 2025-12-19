import { useState } from "react";

export default function PostAd() {

  const [form, setForm] = useState({
    company_name: "",
    curr_cap: "",
    prod_val: "",
    curr_debts: "",
    monthly_rents: "",
    monthly_wages: "",
    expected_cash: "",
    equity_share: "",
    validity: ""
  });

  const token = localStorage.getItem("token");
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(`token at post : ${token}`);

    const res = await fetch("http://localhost:8080/v/postAd",{
        method : "POST",
        credentials : "include",
        headers : {
            "Content-Type" : "application/json",
            token
        },
        body : JSON.stringify(form)
    });
    console.log("Submitted form:", form);
  }

  return (
    <div className="flex justify-center w-full mt-8">
      <div className="w-full max-w-lg rounded-xl border border-gray-700 bg-white/5 backdrop-blur p-8">

        <h1 className="text-3xl font-semibold text-white tracking-wide">
          Advertisement
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">

          <Input label="Company Name" name="company_name" value={form.company_name} onChange={handleChange} />
          <Input label="Current Capacity" name="curr_cap" value={form.curr_cap} onChange={handleChange} />
          <Input label="Product Value" name="prod_val" value={form.prod_val} onChange={handleChange} />
          <Input label="Current Debts" name="curr_debts" value={form.curr_debts} onChange={handleChange} />
          <Input label="Monthly Rent" name="monthly_rents" value={form.monthly_rents} onChange={handleChange} />
          <Input label="Monthly Wages" name="monthly_wages" value={form.monthly_wages} onChange={handleChange} />

          <div className="flex gap-4">
            <Input label="Expected Cash" name="expected_cash" value={form.expected_cash} onChange={handleChange} />
            <Input label="Equity Share (%)" name="equity_share" value={form.equity_share} onChange={handleChange} />
          </div>

          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Valid Until
            <input
              type="datetime-local"
              name="validity"
              value={form.validity}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent text-white focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-400">
              The ad will expire automatically at this time.
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <label className="flex flex-col gap-2 text-sm text-gray-300">
      {label}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent text-white focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
}

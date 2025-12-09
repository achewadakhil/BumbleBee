import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "", role: "buyer" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: "" }));
    setMessage("");
  }

  function validate() {
    const errs = {};
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password || form.password.length < 6) errs.password = "Password must be at least 6 chars";
    if (form.confirmPassword !== form.password) errs.confirmPassword = "Passwords do not match";
    return errs;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);

    try {
      
      const res = await fetch("http://localhost:8080/auth/signup",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(form)
      });
      if(!res.ok)   console.log("Error in f/signup");
      const data = await res.json();
      console.log(data);
      setMessage(`Account created for ${form.email} as ${form.role}`);
        navigate("/signin");
    } catch (err) {
      setMessage("Failed to create account");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-100 mb-4">Create account</h1>
        <form onSubmit={onSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg" noValidate>
          <label className="block text-gray-200 text-sm mb-2">Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com" className="w-full bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          {errors.email && <p className="text-red-400 text-xs mb-2">{errors.email}</p>}

          <label className="block text-gray-200 text-sm mt-2 mb-2">Password</label>
          <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="••••••" className="w-full bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          {errors.password && <p className="text-red-400 text-xs mb-2">{errors.password}</p>}

          <label className="block text-gray-200 text-sm mt-2 mb-2">Confirm password</label>
          <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" placeholder="Repeat password" className="w-full bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          {errors.confirmPassword && <p className="text-red-400 text-xs mb-2">{errors.confirmPassword}</p>}

          <div className="mt-3 mb-4">
            <label htmlFor="role" className="block text-gray-200 text-sm mb-2">Role</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="buyer">Buyer</option>
              <option value="vendor">Vendor</option>
            </select>
            {errors.role && <p className="text-red-400 text-xs">{errors.role}</p>}
          </div>

          <button type="submit" className="w-full py-2 rounded-md mt-2 bg-teal-600 text-white font-medium hover:opacity-95">Create account</button>

          {message && <div className="mt-4 text-sm text-gray-100 bg-gray-800 border border-gray-700 rounded-md p-3">{message}</div>}
        </form>

        <p className="mt-4 text-xs text-gray-400">Already have an account? <a href="/signin" className="text-teal-400 underline">Sign in</a></p>
      </div>
    </div>
  );
}




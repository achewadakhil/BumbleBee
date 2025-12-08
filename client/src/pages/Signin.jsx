import React, { useState } from "react";

export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: "" }));
    setMessage("");
  }

  function validate() {
    const errs = {};
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Enter your password";
    return errs;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);

    try {
      setMessage(`Signed in as ${form.email} (${form.role})`);
      setForm({ email: "", password: "", role: "student" });
    } catch (err) {
      setMessage("Sign in failed");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-100 mb-4">Sign in</h1>
        <form onSubmit={onSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg" noValidate>
          <label className="block text-gray-200 text-sm mb-2">Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com" className="w-full bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          {errors.email && <p className="text-red-400 text-xs mb-2">{errors.email}</p>} 

          <label className="block text-gray-200 text-sm mt-2 mb-2">Password</label>
          <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="••••••" className="w-full bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          {errors.password && <p className="text-red-400 text-xs mb-2">{errors.password}</p>}

          <button type="submit" className="w-full py-2 rounded-md mt-2 bg-teal-600 text-white font-medium hover:opacity-95">Sign in</button>

          {message && <div className="mt-4 text-sm text-gray-100 bg-gray-800 border border-gray-700 rounded-md p-3">{message}</div>}
        </form>

        <p className="mt-4 text-xs text-gray-400">Don't have an account? <a href="/signup" className="text-teal-400 underline">Create one</a></p>
      </div>
    </div>
  );
}


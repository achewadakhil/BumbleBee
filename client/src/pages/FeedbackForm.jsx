import { useState } from "react";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    problemBefore: "",
    seriousness: "",
    mostUseful: "",
    annoyingPart: "",
    removableFeature: "",
    usageFrequency: "",
    willingToPay: "",
    mustHaveChange: "",
    disappointmentLevel: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/feedbackform",{
        method : "POST",
        credentials : "include",
        headers : {
            "Content-Type" : "application/json",
            token
        },
        body : JSON.stringify(form)
    });

    const data = await res.json();

    console.log(data);
    // console.log("MVP Feedback:", form);
    // alert("Thanks for your feedback 🙌");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          MVP Feedback Form
        </h1>

        <textarea
          name="problemBefore"
          placeholder="What problem were you facing before using this app?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <input
          type="number"
          name="seriousness"
          placeholder="How serious is this problem? (1–10)"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <textarea
          name="mostUseful"
          placeholder="Which feature helped you the most?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <textarea
          name="annoyingPart"
          placeholder="What annoyed or confused you?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <input
          name="removableFeature"
          placeholder="Any feature we can remove?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <input
          name="usageFrequency"
          placeholder="How often would you use this app?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <input
          name="willingToPay"
          placeholder="Would you pay for this? How much per month?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <textarea
          name="mustHaveChange"
          placeholder="What would make this app a must-have?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <select
          name="disappointmentLevel"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        >
          <option value="">If this app disappeared tomorrow…</option>
          <option value="very">Very disappointed</option>
          <option value="slightly">Slightly disappointed</option>
          <option value="not">Not disappointed</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

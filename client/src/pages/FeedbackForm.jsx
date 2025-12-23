import { useState } from "react";

const initialFormState = {
  problemBefore: "",
  seriousness: "",
  mostUseful: "",
  annoyingPart: "",
  removableFeature: "",
  usageFrequency: "",
  willingToPay: "",
  mustHaveChange: "",
  disappointmentLevel: "",
  overallReview: ""
};

export default function FeedbackForm() {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.problemBefore || !form.seriousness || !form.disappointmentLevel) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/feedbackform", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      const data = await res.json();
      console.log(data);

      alert("Thanks for your feedback 🙌");
      setForm(initialFormState);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          value={form.problemBefore}
          placeholder="What problem were you facing before using this app?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <input
          type="number"
          name="seriousness"
          value={form.seriousness}
          placeholder="How serious is this problem? (1–10)"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <textarea
          name="mostUseful"
          value={form.mostUseful}
          placeholder="Which feature helped you the most?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <textarea
          name="annoyingPart"
          value={form.annoyingPart}
          placeholder="What annoyed or confused you?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <input
          name="removableFeature"
          value={form.removableFeature}
          placeholder="Any feature we can remove?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <input
          name="usageFrequency"
          value={form.usageFrequency}
          placeholder="How often would you use this app?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <input
          name="willingToPay"
          value={form.willingToPay}
          placeholder="Would you pay for this? How much per month?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <textarea
          name="mustHaveChange"
          value={form.mustHaveChange}
          placeholder="What would make this app a must-have?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <select
          name="disappointmentLevel"
          value={form.disappointmentLevel}
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        >
          <option value="">If this app disappeared tomorrow…</option>
          <option value="very">Very disappointed</option>
          <option value="slightly">Slightly disappointed</option>
          <option value="not">Not disappointed</option>
        </select>

        <textarea
          name="overallReview"
          value={form.overallReview}
          placeholder="Any other suggestions or overall thoughts about the app?"
          className="w-full p-3 rounded bg-gray-700"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 p-3 rounded font-semibold"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

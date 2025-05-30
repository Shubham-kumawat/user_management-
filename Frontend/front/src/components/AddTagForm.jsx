import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddTagForm({ onTagAdded, onClose }) {
  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAddTag = async () => {
    if (!tagName.trim()) return;

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add tag");
      }

      setMessage("Tag added successfully!");
      setTagName("");
      onTagAdded?.(data);

      setTimeout(() => {
        setMessage(null);
        onClose?.();
      }, 2000);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Link
        to="/tags"
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
      >
        Go Back
      </Link>

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Tag</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter tag name"
            className="flex-1 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleAddTag}
            disabled={loading || !tagName.trim()}
            className={`flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {message && (
          <div
            className={`mt-4 px-4 py-2 rounded text-white text-sm ${
              message.includes("success") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

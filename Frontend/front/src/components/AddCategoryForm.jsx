import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddCategoryForm({ onCategoryAdded }) {
  const [newCategory, setNewCategory] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      setAdding(true);
      const response = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: newCategory }),
      });

      if (response.ok) {
        setNewCategory("");
        onCategoryAdded?.();
      } else {
        console.error("Failed to add category");
      }
    } catch (err) {
      console.error("Error adding category:", err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Link
        to="/categories"
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
      >
        Go Back
      </Link>

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Category</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter category name"
            className="flex-1 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={handleAddCategory}
            disabled={adding}
            className={`flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition ${
              adding ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            {adding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

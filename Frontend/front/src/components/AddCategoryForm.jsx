import { useState } from "react";
import { PlusCircle } from "lucide-react"; // Icon (optional)

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
        onCategoryAdded();
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
<div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-fit  max-w-xl mx-auto  p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Category</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter category name"
          className="flex-1 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 px-4 py-2 rounded-xl transition duration-200 outline-none"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={handleAddCategory}
          disabled={adding}
          className={`flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition duration-200 ${
            adding ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          {adding ? "Adding..." : "Add Category"}
        </button>
      </div>
    </div>
    </div>
  );
}

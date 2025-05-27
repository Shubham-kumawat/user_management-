import { useEffect, useState } from "react";
import { Link } from "react-router";
import AddCategoryForm from "./components/AddCategoryForm";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Top Bar with Home Button */}
      <div className="flex justify-between items-center px-8 mt-4">
        <Link
          to="/"
          className="w-40 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
        >
          Home Page
        </Link>

               <Link
          to="/addcategory"
          className="w-40 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
        >
          Add Category
        </Link>
      </div>

      {/* Category Manager */}
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-600"> Category Manager</h2>

          {/* Add Category Form */}
          {/* <AddCategoryForm onCategoryAdded={fetchCategories} /> */}

          {/* Category Table */}
          {loading ? (
            <p className="text-gray-500">Loading categories...</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="p-3 border border-blue-200">#</th>
                  <th className="p-3 border border-blue-200">Category Name</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center p-4 text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat, index) => (
                    <tr key={cat._id} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-200">{index + 1}</td>
                      <td className="p-3 border border-gray-200">{cat.categoryName}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
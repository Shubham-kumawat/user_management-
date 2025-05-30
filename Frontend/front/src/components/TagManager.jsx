// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // ✅ Make sure this is correct
// import TagIcon from "@mui/icons-material/Tag";

// export default function TagManager() {
//   const [tags, setTags] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTags();
//   }, []);

//   const fetchTags = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/tags");
//       const data = await response.json();
//       setTags(data);
//     } catch (error) {
//       console.error("Error fetching tags:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Top Bar with Navigation Buttons */}
//       <div className="flex justify-between items-center px-8 mt-4">
//         <Link
//           to="/"
//           className="w-40 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
//         >
//           Home Page
//         </Link>

//         <Link
//           to="/addtag"
//           className="w-40 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
//         >
//           Add Tags
//         </Link>
//       </div>

//       {/* Tag Manager */}
//       <div className="min-h-screen bg-gray-100 p-8">
//         <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
//           <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-2">
//             All Tags
//           </h2>

//           {/* Tag Table */}
//           {loading ? (
//             <p className="text-gray-500">Loading tags...</p>
//           ) : (
//             <table className="w-full table-auto border-collapse">
//               <thead>
//                 <tr className="bg-blue-100 text-left">
//                   <th className="p-3 border border-blue-200">#</th>
//                   <th className="p-3 border border-blue-200">Tag Name</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tags.length === 0 ? (
//                   <tr>
//                     <td colSpan="2" className="text-center p-4 text-gray-500">
//                       No tags found.
//                     </td>
//                   </tr>
//                 ) : (
//                   tags.map((tag, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="p-3 border border-gray-200">{index + 1}</td>
//                       <td className="p-3 border border-gray-200 capitalize text-blue-700">{tag.tagName}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";
import { Trash2, Pencil, Eye } from "lucide-react";

export default function TagManager() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:3000/tags");
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tag?")) return;
    setDeletingId(id);

    try {
      const response = await fetch(`http://localhost:3000/tags/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTags((prev) => prev.filter((tag) => tag._id !== id));
      } else {
        console.error("Failed to delete tag");
      }
    } catch (error) {
      console.error("Error deleting tag:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 mt-4">
        <Link
          to="/"
          className="w-40 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
        >
          Home Page
        </Link>
        <Link
          to="/addtag"
          className="w-40 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
        >
          Add Tags
        </Link>
      </div>

      {/* Table Section */}
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-2">
            <TagIcon /> All Tags
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading tags...</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="p-3 border border-blue-200">#</th>
                  <th className="p-3 border border-blue-200">Tag Name</th>
                  <th className="p-3 border border-blue-200 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tags.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center p-4 text-gray-500">
                      No tags found.
                    </td>
                  </tr>
                ) : (
                  tags.map((tag, index) => (
                    <tr key={tag._id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border border-gray-200">{index + 1}</td>
                      <td className="p-3 border border-gray-200 capitalize text-blue-700">{tag.tagName}</td>
                      <td className="p-3 border border-gray-200 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => navigate(`/tag/${tag._id}`)}
                            className="text-blue-500 hover:text-blue-700"
                            title="View"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/edittag/${tag._id}`)}
                            className="text-yellow-500 hover:text-yellow-600"
                            title="Edit"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(tag._id)}
                            className="text-red-500 hover:text-red-600"
                            title="Delete"
                            disabled={deletingId === tag._id}
                          >
                            {deletingId === tag._id ? (
                              <span className="text-xs">...</span>
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </td>
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

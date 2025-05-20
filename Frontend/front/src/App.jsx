
import { Link } from "react-router";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          🏠 Home Dashboard
        </h1>
        <ul className="space-y-4">
          <li>
            <Link
              to="/user"
              className="block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
            >
              User Table
            </Link>
          </li>
          <li>
            <Link
              to="/form"
              className="block bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
            >
              Add New User
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="block bg-purple-500 hover:bg-purple-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
            >
              Blog Table
            </Link>
          </li>
          <li>
            <Link
              to="/blogs/new"
              className="block bg-indigo-500 hover:bg-indigo-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
            >
              Create New Blog
            </Link>
          </li>
          <li>
            <Link
              to="/tags"
              className="block bg-pink-500 hover:bg-pink-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
            >
              Tag Manager
            </Link>
          </li>

          <li>
  <Link
    to="/categories"
    className="block bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 px-4 rounded-lg transition duration-200"
  >
    Category Manager
  </Link>
</li>

        </ul>
      </div>
    </div>
  );
}

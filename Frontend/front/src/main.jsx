import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
// import Register from "./Register.jsx";
import UserTable from "./UserTable.jsx";
import AddUserForm from "./AddUserForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

   {
     path:"/form",
     element:<AddUserForm/>
   },

  {
    path:"/user",
    element:<UserTable/>
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

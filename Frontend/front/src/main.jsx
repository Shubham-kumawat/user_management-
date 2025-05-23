import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
// import Register from "./Register.jsx";
import UserTable from "./UserTable.jsx";
import AddUserForm from "./AddUserForm.jsx";
import BlogForm from "./BlogForm.jsx";
import BlogTable from "./BlogTable.jsx";
import TagManager from "./TagManager.jsx";
import CategoryManager from "./CategoriesManager.jsx";
import AddTagForm  from "./AddTagForm.jsx";
import AddCategoryForm from "./components/AddCategoryForm.jsx";
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
{  path:"/blogs" ,element:<BlogTable />

} ,
{path:"/blogs/new" ,element:<BlogForm /> 
},
{ path:"/blogs/:id", element:<BlogForm  mode = "view"/>
} ,
{ path:"/blogs/edit/:id", element:<BlogForm mode = "edit" />
} ,


{ path:"/form/:id", element:<AddUserForm />
},

{ path:"/tags", element:<TagManager />
} ,

{
  path: "/categories",
  element: <CategoryManager />
},

{
  path:"/addtag",
  element:<AddTagForm/>
},
{
  path: "/addcategory",
  element: <AddCategoryForm />
},

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

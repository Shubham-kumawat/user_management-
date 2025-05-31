import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
// import Register from "./Register.jsx";
import UserTable from "./components/UserTable.jsx";
import AddUserForm from "./components/AddUserForm.jsx";
import BlogForm from "./components/BlogForm.jsx";
import BlogTable from "./components/BlogTable.jsx";
import TagManager from "./components/TagManager.jsx";
import CategoryManager from "./components/CategoriesManager.jsx";
import AddTagForm  from "./components/AddTagForm.jsx";
import AddCategoryForm from "./components/AddCategoryForm.jsx";
import Home from "./components/Home.jsx"
import FirstBlog from "./components/FirstBlog.jsx"
import AuthorInfo from "./components/AuthorInfo.jsx"

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

{
  path: "/user/:id",
  element: <Home />
},
{ path: "/user/:userId/blogs", element: <FirstBlog />  },


{path:"/blog/:blogId", 
  element:<AuthorInfo />}



]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

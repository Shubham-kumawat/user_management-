// // src/pages/Home.jsx
// import React, { useState } from "react";
// import "../index.css";
// import Footer from "./Footer";
// import Title from "./Title";
// import ImageL from "./ImageL";
// import HrBar from "./Hr";
// import SubTitle from "./SubTitle";
// import FirstBlog from "./FirstBlog";
// import UserName from "./UserName";

// function Home() {
//   const[userData , setUserData] = useState()



//   return (



//      <div className="bg-green-950 min-h-screen text-white">

//       <HrBar />
//       <UserName />
//       <Title />
//       <ImageL />
//       <SubTitle />
//       <FirstBlog />
//       <HrBar />
//       <Footer />
// </div>
//   );
// }

// export default Home;
// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import Footer from "./Footer";
import Title from "./Title";
import ImageL from "./ImageL";
import HrBar from "./Hr";
import SubTitle from "./SubTitle";
import FirstBlog from "./FirstBlog";
import UserName from "./UserName";
import axios from "axios";
import AuthorInfo from "./AuthorInfo";

function Home() {
  const { id } = useParams(); // userId from URL
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchUserWithBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/${id}`);
        setUserData(res.data);

        if (res.data.blogs) {
          setBlogs(res.data.blogs); // assuming blogs is an array inside user
        }
      } catch (err) {
        console.error("Error fetching user blogs:", err);
      }
    };

    fetchUserWithBlogs();
  }, [id]);

  return (
    <div className="bg-green-950 min-h-screen text-white">
      <HrBar />

      {/* Send dynamic user name */}
      <UserName name={userData?.fullName || "Loading..."} />
      <ImageL imageUrl={`http://localhost:3000${userData?.filePath}`} />

      <Title/>
      <SubTitle  />
    




      <FirstBlog blog={blogs[0]} />

      <HrBar />
      <Footer />
    </div>
  );
}

export default Home;

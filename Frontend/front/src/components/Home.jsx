import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Title from "./Title";
import ImageL from "./ImageL";
import HrBar from "./Hr";
import SubTitle from "./SubTitle";
import FirstBlog from "./FirstBlog";
import UserName from "./UserName";
import axios from "axios";

function Home() {
  const { id } = useParams(); // URL से user ID लें
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/${id}`);
        setUserData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <div className="bg-green-900 min-h-screen text-white p-8">Loading...</div>;
  }

  return (
    <div className="bg-green-950 min-h-screen text-white">
      <HrBar />
      <UserName name={userData?.fullName || "Guest"} />
      
     
      <ImageL imageUrl={userData?.filePath ? `http://localhost:3000${userData.filePath}` : null} />
      
      <Title />
      <SubTitle />
      
    
      <FirstBlog />
      
      <HrBar />
      <Footer />
    </div>
  );
}

export default Home;

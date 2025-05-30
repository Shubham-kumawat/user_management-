// src/pages/Home.jsx
import React from "react";
import "../index.css";
import Footer from "./Footer";
import Title from "./Title";
import ImageL from "./ImageL";
import HrBar from "./Hr";
import SubTitle from "./SubTitle";
import FirstBlog from "./FirstBlog";
import UserName from "./UserName";

function Home() {
  return (
   
     <div className="bg-green-950 min-h-screen text-white">
    
      <HrBar />
      <UserName />
      <Title />
      <ImageL />
      <SubTitle />
      <FirstBlog />
      <HrBar />
      <Footer />
</div>
  );
}

export default Home;

import React, { useState } from "react";
import "../index.css";

import AuthorInfo from "./AuthorInfo";
import { useParams } from "react-router-dom";

const Explore = () => {
 const [data ,setData] = useState([
        {   
            blogId : 1 ,
            date : "04-03-2025",
            image : "https://claw-blimp-item.figma.site/_assets/v8/e15ec6f64194cb05bc5a4b46d71d32fe843ac12b.png?w=256",
            title : "Plethora of Joy: A Taxonomy of Radiant Moments " , 
            button : "Explore Deeper"
            
        },
        {
            blogId : 2 ,
            date : "03-22-2025",
            image : "https://claw-blimp-item.figma.site/_assets/v8/0fe49dacf166491a1ecb6eeb2adb96212280d22c.png?w=256",
            title : "Coventry: The Butterfly Effect of Memory" ,
            button : "Explore Deeper"
        },

        {
            blogId : 3 ,
            date : "02-07-2025",
            image : "https://claw-blimp-item.figma.site/_assets/v8/95beb9b94bcc35db882b189b3e68b610574b33f0.png?w=256",
            title : "Ghost Forest: Whispers in the Obscured Wild" ,
            button : "Explore Deeper"
        },
           {
            blogId : 4 ,
            date : "12-10-2024",
            image : "https://claw-blimp-item.figma.site/_assets/v8/525da6a8d5d8bb8fcc28459449cdcb2d069f9a0c.png?w=256",
            title : "Outline: The Metamorphosis of Self" ,
            button : "Explore Deeper"
        },
        {   
            blogId : 5 ,
            date : "08-02-2024",
            image : "https://claw-blimp-item.figma.site/_assets/v8/0c89a2a8036239e56a3041f10a406e8c6b0053c6.png?w=256",
            title : "The Medium of Truth: Coral and the Collective Consciousness" ,
            button : "Explore Deeper"
        },
         {
            blogId : 6 ,
            date : "05-15-2024",
            image : "https://claw-blimp-item.figma.site/_assets/v8/64999a82756838c15927fbf24a47ac28508f7041.png?w=256",
            title : "Unknown Oeuvre: Cellular Structures of the Unseen" ,
            button : "Explore Deeper"
        },
    


      ])
    const {blogId} = useParams()

  
  return (
   <div className="bg-green-950 min-h-screen text-white py-10 px-4">
        {data.map((singleData)=>{
            console.log(blogId ==  singleData.blogId)
            return (
                blogId ==  singleData.blogId &&    <AuthorInfo title={singleData.title} date={singleData.date} />
            )
        })}
         
         
    </div>
  );
};

export default Explore;


import React from "react";
import "../index.css";
import UserName from "./UserName";
import Footer from "./Footer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BlogDetails from "./Blog";
import HrBar from "./Hr";

const AuthorInfo = ({ title, date, layoutDirection }) => {
  const { blogId } = useParams();
  const [data, setData] = useState([
    {
      blogId: 1,
      date: "04-03-2025",
      image:
        "https://claw-blimp-item.figma.site/_assets/v8/e15ec6f64194cb05bc5a4b46d71d32fe843ac12b.png?w=256",
      title: "Plethora of Joy: A Taxonomy of Radiant Moments ",
      button: "Explore Deeper",
    },
    {
      blogId: 2,
      date: "03-22-2025",
      image:
        "https://claw-blimp-item.figma.site/_assets/v8/0fe49dacf166491a1ecb6eeb2adb96212280d22c.png?w=256",
      title: "Coventry: The Butterfly Effect of Memory",
      button: "Explore Deeper",
    },

    {
      blogId: 3,
      date: "02-07-2025",
      image:
        "https://claw-blimp-item.figma.site/_assets/v8/95beb9b94bcc35db882b189b3e68b610574b33f0.png?w=256",
      title: "Ghost Forest: Whispers in the Obscured Wild",
      button: "Explore Deeper",
    },
    {
      blogId: 4,
      date: "12-10-2024",
      image:
        "https://claw-blimp-item.figma.site/_assets/v8/525da6a8d5d8bb8fcc28459449cdcb2d069f9a0c.png?w=256",
      title: "Outline: The Metamorphosis of Self",
      button: "Explore Deeper",
    },
    {
      blogId: 5,
      date: "08-02-2024",
      image:
        "https://claw-blimp-item.figma.site/_assets/v8/0c89a2a8036239e56a3041f10a406e8c6b0053c6.png?w=256",
      title: "The Medium of Truth: Coral and the Collective Consciousness",
      button: "Explore Deeper",
    },
    {
      blogId: 6,
      date: "05-15-2024",
      image:
        "https://claw-blimp-item.figma.site/_assets/v8/64999a82756838c15927fbf24a47ac28508f7041.png?w=256",
      title: "Unknown Oeuvre: Cellular Structures of the Unseen",
      button: "Explore Deeper",
    },
  ]);

  // const blogData = data.find(
  //   (singleData) => singleData.blogId === Number(blogId)
  // );
  // {blogData.map((singleData)=>{
  //   return(
  //     blogId == singleData.blogId && title={blogData.title}
  //   )
  // })}

  return (
    <>
      <div className="text-amber-50">
        <div className=" lg:w-auto text-[12px]  font-mono lg:text-[15px] lg:mr-auto">
          <UserName blogId={blogId} />
        </div>

        <div className="lg:flex lg:flex-col lg:justify-end ">
          <div className=" font-mono">
            <div className="hidden">AuthorDetail</div>
            <div>
              <div className="lg:text-[16px] mt-2 ml-2 text-[12px] font-mono lg:text-center leading-none">
                {date}
              </div>
              <div className="lg:text-[16px] text-[12px] ml-2 font-mono lg:text-center">
                Written by Laura Kim
              </div>
            </div>
          </div>

          <div className="lg:ml-auto animate-fade-in h-20 m-2 p-2 lg:mr-24 lg:p-4 mt-20 lg:text-3xl text-[22px] lg:w-138 lg:tracking-wider tracking-widest opacity-90">
            {title}
          </div>

          <div className="lg:ml-auto h-50 animate-fade-in  w-110 ml-4 flex items-center lg:w-150 lg:text-xl tracking-wider lg:mt-8 lg:mr-8 lg:mb-10 font-mono">
            Joy is a spectrum of radiant moments, each unique and
            interconnected. 'Plethora of Joy' catalogs these moments like a
            naturalist would classify a collection of rare creatures. Explore
            the diverse forms and textures of joy.
          </div>
        </div>

        <div className=" lg:ml-12 lg:mr-12 lg:mb-12 lg:mt-4 p-8 slide-up border border-l-0 border-r-0 border-t-0  ">
          <img src="	https://claw-blimp-item.figma.site/_assets/v8/e15ec6f64194cb05bc5a4b46d71d32fe843ac12b.png?w=1536" />
        </div>

        <div className="flex justify-center slide-up opacity-60 m-8 p-8">
          <img src="	https://claw-blimp-item.figma.site/_assets/v8/d0cdb1616db0798f591a344b7a7c9a2476550e90.png?w=512" />
        </div>

        <div className="p-4 m-4 font-mono tracking-normal  w-100vh text-xl">
          A symphony of shells, each a unique testament to the ocean's artistry.
        </div>

        <div className="p-4 m-4 font-mono tracking-normal text-xl">
          Their intricate forms echo the diverse facets of joy, a reminder that
          contentment comes in countless shades.
        </div>

        <div className="lg:flex lg:justify-between  font-mono lg:p-8 m-4">
          <div className="slide-up">
            <img
              src="https://claw-blimp-item.figma.site/_assets/v8/8e57fc8cd7079d9168bed9ed9c235bbb5dabc390.png"
              className="p-4 "
            />
            <div className="p-4 text-xs tracking-widest opacity-90">
              Fig. A: Crystallized Carbonite of Lime
            </div>
          </div>
          <div className="lg:pl-8 lg:text-xl text-[20px] animate-fade-in lg:p-2 lg:w-230 leading-12">
            <div className="ml-8 mb-12">
              Within the nautilus's spiraling form, each chamber represents a
              distinct moment of joy, a testament to the layered and
              multifaceted nature of contentment.
            </div>
            <div className="ml-8 mb-12">
              This bisection reveals the intricate architecture of happiness, a
              journey through the depths of fulfillment.
            </div>
          </div>
        </div>

        <div className="font-mono tracking-wider  slide-up ">
          <div className=" lg:p-4 lg:m-4  opacity-100">
            <img
              src="https://claw-blimp-item.figma.site/_assets/v8/cfc3f61a3a8a8db464f18314625034cd6d376be5.png?w=1536"
              className="p-8 pb-0"
            />
          </div>

          <div className=" lg:text-xs lg:ml-16 lg:mr-10  text-xs ml-16 mr-10 mt-8  opacity-90">
            Fig. B: Mountains range in 1760 from the coastline of Georgia
          </div>
        </div>

        <div className="font-mono lg:flex lg:flex-col   lg:mb-44">
          <div className="text-xl  text-center p-8 ">
            Just as the hills rise and fall, so too does the journey of joy.
          </div>
          <div className="lg:text-xl  text-[20px]  w-100 ml-14 lg:ml-100 lg:w-200">
            Each peak represents a moment of elation, while the valleys offer
            opportunities for reflection and growth.
          </div>
          <div className="lg:text-xl lg:ml-100 text-[20px]  w-100 ml-14 mt-8 lg:mt-8">
            This landscape is a testament to the dynamic nature of contentment.
          </div>
          <div className="flex justify-center items-center m-8">
            <img src="https://claw-blimp-item.figma.site/_assets/v8/4a1457ee508dcee50242109bcb6e14341aa0ad5e.png" />
          </div>
        </div>

        <div className="lg:flex font-mono">
          <div className="lg:pl-8 lg:pr-8 lg:text-xl text-[19px] lg:mt-4 w-100 p-4 ml-12 lg:w-200 lg:h-30 lg:ml-4 lg:mr-8 ">
            Each bird holds the potential for radiant moments, illustrating the
            harmonious blend of nature and emotion.
          </div>
          <div className=" lg:mr-16 m-8">
            <img
              src="https://claw-blimp-item.figma.site/_assets/v8/396a5100c2346f6a69b4c2f583646aad3ce3de37.png"
              className="lg:w-180 lg:h-80 w-100 h-45 ml-8 object-cover "
            />
            <div className="lg:mt-8 text-xs opacity-90 m-8 tracking-wider">
              Fig. C: Illustriertes Prachtwerk sämtlicher Taubenrassen
            </div>
          </div>
        </div>

        <div className="  flex flex-col flex-wrap leading-10 mt-12  justify-center items-center">
          <div className="text-5xl mt-8">End</div>
          <div className="text-[42px] mb-16 text-center">{title}</div>
          <div className=" h-20 mb-12 rotate-90  w-20 ">
            {" "}
            <img
              src="https://claw-blimp-item.figma.site/_assets/v8/70be472722c7b111a08e2dbbd876159732ef1ea1.png?w=128"
              className=" h-24 w-24 object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between lg:flex-row w-full ">
          {data.map((singleData) => {
            if (Number(blogId) + 4 === singleData.blogId) {
              return (
                <div className="w-full max-w-180 lg:w-1/1 p-4 slide-up " key={singleData.blogId}>
                  <BlogDetails
                    key={singleData.blogId}
                    blogId={singleData.blogId}
                    title={singleData.title}
                    date={singleData.date}
                    image={singleData.image}
                    button="Previous"
                  />
                </div>
              );
            } else if (Number(blogId) + 5 === singleData.blogId) {
              return (
                <div className="w-full max-w-180 slide-up  lg:w-1/1 p-4 " key={singleData.blogId}>
                  <BlogDetails
                    key={singleData.blogId}
                    blogId={singleData.blogId}
                    title={singleData.title}
                    date={singleData.date}
                    image={singleData.image}
                    button="Next"
                  />
                </div>
              );
            } else {
              return null; // Don't render other blogIds
            }
          })}
        </div>
        <HrBar />
        <Footer />
      </div>
    </>
  );
};

export default AuthorInfo;
// {
/* 
//  if (!blogData) { */
// }
//      <div>Blog is not found</div>
//   } else {

//       <>
//         <div>{blogData.title}</div>
//         <div>{blogData.date}</div>
//         <div>
//           <img src={blogData.image} />
//         </div>
//         <div>{blogData.button}</div>

//          <div>
//         <div>{Number(blogId) + 3}</div>
//         <div>{Number(blogId) + 4}</div>
//       </div>
//       </>

//   }

//  <div>
//           {data.map((singleData) => {
//             return (
//               (Number(blogId) + 4 == singleData.blogId ||
//                 Number(blogId) + 5 == singleData.blogId) && (
//                      <BlogDetails
//           key={singleData.blogId}
//           blogId={singleData.blogId}
//           title={singleData.title}
//           date={singleData.date}
//           image={singleData.image}
//           button={singleData.button}

//           // layoutDirection="flex-col"
//           // wrapperClass = "bg-green-950 border-b border-gray-600"
//           // titleClass="text-pink-400 hover:underline"
//           // imageClass="rounded-xl shadow-lg border-4 border-white"

//         />
//               )
//             );
//           })}
//         </div>

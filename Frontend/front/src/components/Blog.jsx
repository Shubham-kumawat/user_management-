import { useEffect, useRef, useState } from "react";
 import "../index.css";
import { Link } from "react-router-dom";

export default function BlogDetails({ blogId, date, title, image, button , wrapperClass = "" , imageClass = " ", titleClass= ""  ,layoutDirection = "col", label="" }) {
  const layoutMap = {
    col : "flex-col"    

  }
  return (
    
    <>
      <div className={` flex flex-col-reverse lg:flex-col ${layoutMap[layoutDirection]}  ${wrapperClass} `}>
        <div className="text-amber-50 slide-up delay-1000 duration-1000  lg:h-70 lg:w-190 lg:ml-auto lg:flex lg:p-2 lg:m-2 border border-l-0 border-r-0 border-b-0 border-gray-200 ">
          
          <div className="ml-auto ">
            <Link to={"/explore/" + blogId }>
              <div className="max-w-60 sm:m-2">
                <img
                  className={`lg:w-60 p-4  ml-45  lg:ml-0 cursor-pointer    sm:max-w-md md:max-w-lg lg:max-w-xl ${imageClass}`}
                  src={image}
                
                />
              </div>
            </Link>
          </div>
          
          
          <div className="lg:mb-2  lg:absolute m-4  ">
            <div className="hidden">{blogId}</div>
            <Link to={"/explore/" + blogId }>
              <div className="font-mono lg:flex lg:flex-start lg:mb-0 text-[12px] ml-4 cursor-pointer">
                {date}
              </div>
            </Link>
            <Link to={"/explore/" + blogId }>
              <div className={`text-3xl lg:mb-8 lg:mt-12 lg:max-w-120 text-gray-100 p-2 ml-2 cursor-pointer ${titleClass}`}>
                {title}
              </div>
            </Link>
            <Link to={"/explore/" + blogId }>
              <div className={`bg-green-900 hover:bg-green-700 text-[12px] p-2 ml-4 mb-8 ${label} text-center rounded font-mono w-fit  cursor-pointer`}>
                {button}
              </div>
            </Link>
          </div>

          
        </div>
      </div>
    </>
  );
}







{/* <div className={`flex flex-col-reverse lg:flex-col ${layoutMap[layoutDirection]}  ${wrapperClass} `}>
        <div className="text-amber-50  lg:w-200 lg:ml-auto lg:flex lg:p-4 lg:mt-4 border border-l-0 border-r-0 border-b-0 border-gray-200 ">
          <div className="lg:mt-auto  ">
            <div className="hidden">{blogId}</div>
            <Link to={"/explore/" + blogId }>
              <div className="font-mono lg:flex lg:flex-start lg:mb-8 text-[12px] lg:ml-8 cursor-pointer">
                {date}
              </div>
            </Link>
            <Link to={"/explore/" + blogId }>
              <div className={`text-2xl lg:mb-8 text-gray-100 p-4 ml-4 cursor-pointer ${titleClass}`}>
                {title}
              </div>
            </Link>
            <Link to={"/explore/" + blogId }>
              <div class={`bg-green-900 hover:bg-green-700 text-[12px] p-2 ml-4 mb-8 ${label} text-center rounded font-mono w-fit  cursor-pointer`}>
                {button}
              </div>
            </Link>
          </div>

          <div>
            <Link to={"/explore/" + blogId }>
              <div>
                <img
                  className={`lg:w-70 p-4 m-2  cursor-pointer   max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl ${imageClass}`}
                  src={image}
                />
              </div>
            </Link>
          </div>
        </div>
      </div> */}
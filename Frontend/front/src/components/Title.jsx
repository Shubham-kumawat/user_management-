// import React from "react";
// import '../index.css'
// import HrBar from "./Hr";
// import UserName from "./UserName";
// import { useEffect,useRef,useState } from "react";



// const Title = () =>{
//     const ref = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         console.log("isIntersecting:", entry.isIntersecting);
//         setIsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.1 }
//     );

//     if (ref.current) observer.observe(ref.current);

//     return () => {
//       if (ref.current) observer.unobserve(ref.current);
//     };
//   }, []);

//     return (
//         <>
           
//         <div  ref={ref} class="lg:flex animate-fade-in duration-500 delay-300 lg:flex-col">
//                 <div class=" lg:ml-130   lg:w-1/1 lg:p-2 ml-4  text-2xl  xl:max-w-250  xl:text-3xl lg:text-2xl text-amber-100  mt-4 ">
//                     Laura Kim is an illustrator and journalist who explores the relationship between the individual and the collective. Her photo essays, rendered in a style reminiscent of historic scientific illustrations, delve into complex emotions such as joy. 
//                 </div>
//                 <div class=" lg:relative h-[px] w-[43px] ml-4  lg:mx-auto lg:ml-96 lg:w-[43px] lg:h-[51px] ">
//                     <img src="	https://claw-blimp-item.figma.site/_assets/v8/4a1457ee508dcee50242109bcb6e14341aa0ad5e.png" className="lg:ml-40 lg:mt-12 lg:min-w-15" alt="leaf-image"/>
//                 </div>
//             </div>
       
//         </>
//     )
// }


// export default Title

// Title.jsx
import React from "react";
import "../index.css";

const Title = ({ text }) => {
  return (
    <div className="lg:flex animate-fade-in duration-500 delay-300 lg:flex-col">
      <div className="lg:ml-130 lg:w-1/1 lg:p-2 ml-4 text-2xl xl:max-w-250 xl:text-3xl lg:text-2xl text-amber-100 mt-4">
        {text}
      </div>
    </div>
  );
};

export default Title;

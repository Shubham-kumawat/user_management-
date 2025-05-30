import React from 'react';
import '../index.css';


const Footer = ()=>{
    return (
        <>
             <footer className=" flex  flex-wrap items-start   bg-green-950 text-white p-4 ">
                <div className="flex flex-col justify-baseline p-8 lg:min-w-[200px] w-40 lg:p-4 ">
                    <p className="font-mono font-normal text-xs">&copy; 2025 Your Company. All rights reserved.</p>
                    <p className="font-mono font-normal text-xs">(646) -555 -4567</p>
                </div>
                <div className="flex flex-col  lg:p-4 leading-tight p-8 lg:flex-1  lg:min-w-[200px]  lg:mt-2 ">
                <a href="http://instagram.com" className="hover:text-gray-400 underline font-mono font-normal text-xs">Instagram</a>
                <a href="http://facebook.com" className="hover:text-gray-400  underline font-mono font-normal text-xs">Facebook</a>
                <a href="http://linkedin.com" className="hover:text-gray-400  underline font-mono font-normal text-xs">LinkedIn</a>
                <a href="https://tiktok.com" className="hover:text-gray-400  underline font-mono font-normal text-xs">TikTok</a>

                </div>
                <div className="flex justify-center  w-2xs">
                    <img src="https://claw-blimp-item.figma.site/_assets/v8/a2650cc51bbab964b265a4fe35f0f68c1709bab3.png?h=512" 
                    className="w-full mb-12 md:max-w-[200px] lg:max-w-[250px] "  alt="patti" /> 
                </div>
            
            </footer>
        </>
    )
}

export default Footer
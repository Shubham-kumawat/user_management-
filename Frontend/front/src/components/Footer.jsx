import React from 'react';
import '../index.css';


const Footer = ()=>{
    return (
        <>
             <footer class=" flex  flex-wrap items-start   bg-green-950 text-white p-4 ">
                <div class="flex flex-col justify-baseline p-8 lg:min-w-[200px] w-40 lg:p-4 ">
                    <p class="font-mono font-normal text-xs">&copy; 2025 Your Company. All rights reserved.</p>
                    <p class="font-mono font-normal text-xs">(646) -555 -4567</p>
                </div>
                <div class="flex flex-col  lg:p-4 leading-tight p-8 lg:flex-1  lg:min-w-[200px]  lg:mt-2 ">
                <a href="http://instagram.com" class="hover:text-gray-400 underline font-mono font-normal text-xs">Instagram</a>
                <a href="http://facebook.com" class="hover:text-gray-400  underline font-mono font-normal text-xs">Facebook</a>
                <a href="http://linkedin.com" class="hover:text-gray-400  underline font-mono font-normal text-xs">LinkedIn</a>
                <a href="https://tiktok.com" class="hover:text-gray-400  underline font-mono font-normal text-xs">TikTok</a>

                </div>
                <div class="flex justify-center  w-2xs">
                    <img src="https://claw-blimp-item.figma.site/_assets/v8/a2650cc51bbab964b265a4fe35f0f68c1709bab3.png?h=512" 
                    class="w-full mb-12 md:max-w-[200px] lg:max-w-[250px] "  alt="patti" /> 
                </div>
            
            </footer>
        </>
    )
}

export default Footer
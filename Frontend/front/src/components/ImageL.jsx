import React from "react";
import "../index.css";

const ImageL = ({ imageUrl }) => {
  return (
    <div className="lg:inline lg:p-1 bg-green-950">
      <div className="lg:fixed -translate-y-1/10 lg:bottom-0.5 p-4 mt-20 ml-3 lg:w-sm lg:m-4 lg:p-6">
        <img
          src={imageUrl}
          alt="Author"
          className="slide-up w-[30vw] h-[15vw] object-cover"
        />
      </div>
    </div>
  );
};


export default ImageL;

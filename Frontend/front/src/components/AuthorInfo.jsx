import React from "react";
import UserName from "./UserName";
import Footer from "./Footer";
import BlogDetails from "./Blog";
import HrBar from "./Hr";
import { useParams } from "react-router-dom";


const AuthorInfo = ({ blog }) => {
  const { blogId } = useParams();
  const currentIndex = blogData.findIndex(item => item.blogId === Number(blogId));
  const prevBlog = currentIndex > 0 ? blogData[currentIndex - 1] : null;
  const nextBlog = currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;

  return (
    <div className="text-amber-50">
      <div className="lg:w-auto text-[12px] font-mono lg:text-[15px] lg:mr-auto">
        <UserName blogId={blogId} />
      </div>

      <div className="lg:flex lg:flex-col lg:justify-end">
        <div className="font-mono">
          <div className="lg:text-[16px] mt-2 ml-2 text-[12px] lg:text-center leading-none">
            {blog.date}
          </div>
          <div className="lg:text-[16px] text-[12px] ml-2 lg:text-center">
            Written by Laura Kim
          </div>
        </div>

        <div className="lg:ml-auto animate-fade-in h-20 m-2 p-2 lg:mr-24 lg:p-4 mt-20 lg:text-3xl text-[22px] lg:w-138 lg:tracking-wider tracking-widest opacity-90">
          {blog.title}
        </div>

        <div className="lg:ml-auto h-50 animate-fade-in w-110 ml-4 flex items-center lg:w-150 lg:text-xl tracking-wider lg:mt-8 lg:mr-8 lg:mb-10 font-mono">
          {blog.description}
        </div>
      </div>

      {/* Rest of your content sections */}
      {/* ... */}

      <div className="flex flex-col justify-between lg:flex-row w-full">
        {prevBlog && (
          <div className="w-full max-w-180 lg:w-1/1 p-4 slide-up">
            <BlogDetails
              blogId={prevBlog.blogId}
              title={prevBlog.title}
              date={prevBlog.date}
              image={prevBlog.image}
              button="Previous"
            />
          </div>
        )}
        {nextBlog && (
          <div className="w-full max-w-180 lg:w-1/1 p-4 slide-up">
            <BlogDetails
              blogId={nextBlog.blogId}
              title={nextBlog.title}
              date={nextBlog.date}
              image={nextBlog.image}
              button="Next"
            />
          </div>
        )}
      </div>
      
      <HrBar />
      <Footer />
    </div>
  );
};

export default AuthorInfo;
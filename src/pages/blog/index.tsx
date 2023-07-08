import BlogCards from "@/components/post/blogCard";
import PostPagination from "@/components/post/postPagination";
import { useState, useEffect } from "react";
import type { GetServerSideProps } from "next";

const Blogs = () => {
  const [pagNum, setPagNum] = useState(1);
  const [blogData, setBlogData] = useState([{ id: 1, title: "", body: "" }]);

  useEffect(() => {
    const get = async () => {
      const res = await fetch(
        `https://gorest.co.in/public/v2/posts?page=${pagNum}&per_page=16`
      );
      const posts = await res.json();
      setBlogData(posts);
    };

    get();
  }, [pagNum]);

  return (
    <div className="mt-8">
      <h4 className="text-center">Blog Page</h4>
      <div className="flex flex-col md:flex-row flex-wrap justify-center">
        {blogData.map((post) => (
          <div
            className="cursor-pointer my-2 md:my-5 w-10/12 md:w-1/3 mx-auto md:mx-5 bg-gray-100 hover:bg-gray-200 p-5 rounded-2xl"
            key={post.id}
          >
            <BlogCards post={post} />
          </div>
        ))}
      </div>
      <PostPagination pagNum={pagNum} setPagNum={setPagNum} />
    </div>
  );
};

export default Blogs;

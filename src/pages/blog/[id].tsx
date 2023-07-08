import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Post = () => {
  const router = useRouter();

  const [detailBlog, setDetailBlog] = useState({ title: "", body: "" });
  const [commentBlog, setCommentBlog] = useState([
    { name: "", body: "", id: 1 },
  ]);

  useEffect(() => {
    const data = async () => {
      const { id } = router.query;
      const det = await fetch(`https://gorest.co.in/public/v2/posts/${id}`);
      const detail = await det.json();
      setDetailBlog(detail);

      const com = await fetch(
        `https://gorest.co.in/public/v2/posts/${id}/comments`
      );
      const comment = await com.json();
      setCommentBlog(comment);
    };

    data();
  }, []);

  return (
    <div className="my-8 flex flex-col md:flex-row justify-center p-5">
      <div className="my-6 md:my-10 w-10/12 md:w-1/3 mx-auto md:mx-5 bg-gray-100 hover:bg-gray-200 p-5 rounded-2xl">
        <h5 className="mt-2 mb-5 font-bold">Blog Detail</h5>
        <h6 className="mb-1 mt-8 font-semibold">{detailBlog.title}</h6>
        <p className="my-1">{detailBlog.body}</p>
      </div>
      <div className="my-6 md:my-10 w-10/12 md:w-1/3 mx-auto md:mx-5 bg-gray-100 hover:bg-gray-200 p-5 rounded-2xl">
        <h5 className="mt-2 mb-5 font-bold">Comment</h5>
        {commentBlog.map((comment) => (
          <div key={comment.id}>
            <p className="my-2">
              <strong>user :</strong> {comment.name}
            </p>
            <p className="my-2">
              <strong>comment :</strong> {comment.body}
            </p>
            <hr className="w-10/12 my-4 border-black border-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;

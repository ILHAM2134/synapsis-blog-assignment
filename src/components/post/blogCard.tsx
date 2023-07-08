import { useRouter } from "next/router";

type PostType = {
  id: number;
  title: string;
  body: string;
};

const BlogCards = ({ post }: { post: PostType }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/blog/${post.id}`)} className="m-0 p-0">
      <h6 className="my-3 font-bold">
        {post.title.length > 100
          ? post.title.substring(0, 100) + "..."
          : post.title}
      </h6>
      <p className="my-3">
        {post.body.length > 170
          ? post.body.substring(0, 170) + "..."
          : post.body}
      </p>
    </div>
  );
};

export default BlogCards;

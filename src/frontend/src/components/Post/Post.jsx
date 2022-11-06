import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <div className="my-3 p-3 border rounded w-50">
      <p>
        <b>{post.author.name}</b>,
        <Link to={"/user/" + post.author.username}>@{post.author.username}</Link> -
        {post.created_at.substring(0, 10)} {post.created_at.substring(11, 19)}
      </p>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;
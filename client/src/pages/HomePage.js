import { usePosts } from "../context/PostContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

export const HomePage = () => {
  const { posts } = usePosts();

  const renderMain = () => {
    if (posts.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-40 h-40 text-white" />
          <h1 className="text-white text-2xl">No posts found</h1>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <div className="text-white pb-10">
      <header className="flex justify-between py-4">
        <h1 className="text-4xl">Posts ({posts.length})</h1>
        <Link
          to="/posts/new"
          className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Create New Post
        </Link>
      </header>
      {renderMain()}
    </div>
  );
};

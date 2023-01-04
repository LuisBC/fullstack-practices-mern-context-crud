import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";

const PostCard = ({ post }) => {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handleDeleteConfirm = async (id, t) => {
    try {
      toast.dismiss(t.id);
      await deletePost(id);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">Do you want to delete this post?</p>
          <strong className="text-white">{id}</strong>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={() => handleDeleteConfirm(id, t)}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div
      className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => navigate("/posts/edit/" + post._id)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h2 className="text-2xl">{post.title}</h2>
          <button
            className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id);
            }}
          >
            Delete
          </button>
        </div>
        <p className="mt-2">{post.description}</p>
      </div>
      {post.image && (
        <img
          src={post.image.url}
          alt=""
          className="w-full h-96 object-contain"
        />
      )}
    </div>
  );
};

export default PostCard;

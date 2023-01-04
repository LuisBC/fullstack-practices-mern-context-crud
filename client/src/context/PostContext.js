import { useState, createContext, useContext, useEffect } from "react";
import {
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  getPostsRequest,
  updatePostRequest,
} from "../api/posts";

const context = createContext();

export const usePosts = () => useContext(context);

export const PostProvider = ({ children }) => {
  const { Provider } = context;
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data } = await getPostsRequest();
    setPosts(data);
  };

  const createPost = async (values) => {
    const { data } = await createPostRequest(values);
    setPosts([...posts, data]);
  };

  const deletePost = async (id) => {
    await deletePostRequest(id);
    setPosts(posts.filter((post) => post._id !== id));
  };

  const getPost = async (id) => {
    return await getPostRequest(id);
  };

  const updatePost = async (id, values) => {
    await updatePostRequest(id, values);
    setPosts(
      posts.map((post) => (post._id === id ? { ...post, ...values } : post))
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Provider
      value={{ posts, getPosts, createPost, deletePost, getPost, updatePost }}
    >
      {children}
    </Provider>
  );
};

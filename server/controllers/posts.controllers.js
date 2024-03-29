import Post from "../models/Post.js";
import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageData;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      imageData = { url: result.secure_url, public_id: result.public_id };
    }
    const newPost = new Post({ title, description, image: imageData });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json();
    if (post.image.public_id) {
      await deleteImage(post.image.public_id);
    }
    let imageData;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      imageData = { url: result.secure_url, public_id: result.public_id };
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image: imageData,
      },
      { new: true } // This is to return the updated post
    );
    return res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndDelete(req.params.id);
    if (!postRemoved) return res.status(404).json();
    if (postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id);
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json();
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

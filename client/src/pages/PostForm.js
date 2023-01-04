import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePosts } from "../context/PostContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const PostForm = () => {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
  });

  const isEdit = useMemo(() => params.id, [params.id]);

  useEffect(() => {
    (async () => {
      if (isEdit) {
        const {
          data: { title, description },
        } = await getPost(params.id);
        setPost({ title, description });
      }
    })();
  }, [isEdit, params.id]);

  const handleOnSubmit = async (values, actions) => {
    try {
      isEdit ? await updatePost(params.id, values) : await createPost(values);
      actions.setSubmitting(false);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black ">
        <header className="flex justify-between items-center pb-4 text-white">
          <h3 className="text-xl">{isEdit ? "Edit Post" : "New Post"}</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Go Back
          </Link>
        </header>
        <Formik
          initialValues={post}
          enableReinitialize
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            image: Yup.string(),
          })}
          onSubmit={handleOnSubmit}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Title
              </label>
              <Field
                name="title"
                placeholder="title"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm mb-4"
                name="title"
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400"
              >
                Description
              </label>
              <Field
                name="description"
                placeholder="description"
                component="textarea"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                rows="3"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm mb-4"
                name="description"
              />
              <label
                htmlFor="image"
                className="text-sm block font-bold text-gray-400"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
              />
              <button
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outlined-none disabled:bg-indigo-400 w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "Save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

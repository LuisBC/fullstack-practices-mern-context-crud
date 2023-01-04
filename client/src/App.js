import { HomePage, PostForm, NotFound } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <PostProvider>
      <div className="bg-neutral-900 min-h-screen flex items-center">
        <div className="px-10 container m-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/new" element={<PostForm />} />
            <Route path="/posts/edit/:id" element={<PostForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </div>
    </PostProvider>
  );
}

export default App;

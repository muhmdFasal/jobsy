
import PostFeed from "../PostFeed";

const HomePage = () => {
  return (
    <div className="mt-20 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Latest Posts
      </h2>
      <PostFeed />
    </div>
  );
};

export default HomePage;

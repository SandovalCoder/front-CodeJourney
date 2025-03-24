"use client";

import CreatePost from "@/components/CreatePost";
import UserPosts from "@/components/UserPosts";

const CreatePostPage = () => {
  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black/95 px-6 py-24">
      <div className="space-y-8">
        <CreatePost />
        <UserPosts />
      </div>
    </section>
  );
};

export default CreatePostPage;

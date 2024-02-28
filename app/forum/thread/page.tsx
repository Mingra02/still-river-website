import AddPost from "@/components/AddPost";
import ForumNavigation from "@/components/ForumNavigation";
import Lights from "@/components/Lights";
import ThreadPosts from "@/components/ThreadPosts";
import { Suspense } from "react";

const Thread = () => {
  return (
    <>
      <Lights position="fixed" />
      <section className="m-auto mb-12 mt-24 w-full max-w-7xl rounded-lg border border-white/15 bg-white/10 p-2 shadow-lg drop-shadow-lg backdrop-blur-lg md:p-8 xl:w-[95%] xl:px-14 ">
        <ForumNavigation />
        <Suspense fallback={<div>Loading...</div>}>
          <ThreadPosts />
        </Suspense>
      </section>
    </>
  );
};

export default Thread;

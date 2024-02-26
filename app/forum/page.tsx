import Breadcrumbs from "@/components/Breadcrumbs";
import ForumNavigation from "@/components/ForumNavigation";
import Forums from "@/components/Forums";
import Lights from "@/components/Lights";
import Login from "@/components/Login";
import Recents from "@/components/Recents";
import Statistics from "@/components/Statistics";

const Forum = () => {
  return (
    <>
      <Lights position="fixed" />
      <section className="m-auto mb-12 mt-24 w-full max-w-7xl rounded-lg border border-white/15 bg-white/10 p-2 shadow-lg drop-shadow-lg backdrop-blur-lg md:p-8 xl:w-[95%] xl:px-14 ">
        <ForumNavigation />
        <Breadcrumbs links={[{ name: "Forum", url: "/forum" }]} />
        <div className="mt-6 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_auto]">
          <Forums />
          <div className="m-auto grid w-[300px] grid-cols-1 gap-4 md:w-full md:grid-cols-2 md:items-start lg:grid-cols-3 xl:flex xl:h-full xl:w-[300px] xl:flex-col">
            <Login />
            <Recents />
            <Statistics />
          </div>
        </div>
      </section>
    </>
  );
};

export default Forum;

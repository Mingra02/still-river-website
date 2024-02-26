import Forums from "@/components/Forums";
import Login from "@/components/Login";
import Recents from "@/components/Recents";
import Statistics from "@/components/Statistics";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Forum = () => {
  return (
    <>
      <div className="fixed top-[40%] h-full w-full">
        <div className="absolute -top-[10%] left-0 right-0 isolate -z-10 m-auto h-full w-screen overflow-visible overflow-x-clip lg:-top-[35%] lg:mb-0">
          <div className="absolute -left-48 -top-20 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-rose-600/25 to-slate-950/0 xl:left-[15%] xl:top-0"></div>
          <div className="absolute -left-24 top-[30%] -z-10 h-[725px] w-[725px] bg-gradient-radial from-fuchsia-800/25 to-slate-950/0 xl:left-[20%]"></div>
          <div className="absolute left-24 top-16 -z-10 h-[630px] w-[630px] bg-gradient-radial from-indigo-950/90 to-slate-950/0 xl:left-[30%]"></div>
          <div className="absolute right-48 top-64 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-blue-800/35 to-slate-950/0 xl:left-[50%]"></div>
          <div className="absolute right-0 top-0 -z-10 h-[350px] w-[350px] bg-gradient-radial from-sky-600/45 to-slate-950/0 xl:left-[63%]"></div>
          <div className="absolute -right-24 top-96 -z-10 h-[250px] w-[250px] bg-gradient-radial from-teal-700/45 to-slate-950/0 xl:left-[70%]"></div>
        </div>
      </div>
      <section className="m-auto mb-12 mt-24 w-full max-w-7xl rounded-lg border border-white/15 bg-white/10 p-8 shadow-lg drop-shadow-lg backdrop-blur-lg xl:w-[95%] xl:px-14 ">
        <ul className="no-scrollbar mx-4 flex max-w-[100%] overflow-x-scroll text-slate-400">
          <li className="flex w-44 flex-shrink-0 justify-center border-b-2 border-indigo-400 pb-2 text-indigo-400">
            Message Board
          </li>
          <li className="flex w-44 flex-shrink-0 justify-center border-b border-slate-400 pb-2">{`What\'s New`}</li>
          <li className="flex w-44 flex-shrink-0 justify-center border-b border-slate-400 pb-2">
            Resources
          </li>
          <li className="flex w-44 flex-shrink-0 justify-center border-b border-slate-400 pb-2">
            Users
          </li>
          <li className="flex-grow justify-center border-b border-slate-400 pb-2"></li>
        </ul>
        <div className="mx-4 mt-6 inline-flex rounded border border-slate-500 px-4 text-slate-400">
          <div className="px-4 py-2">
            <FontAwesomeIcon icon={faHome} className="text-slate-400" />
          </div>
          <div className="px-4 py-2">
            <FontAwesomeIcon icon={faChevronRight} className="text-slate-400" />
          </div>
          <div className="px-4 py-2">Forums</div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_auto]">
          <Forums />
          <div className="m-auto grid w-[300px] grid-cols-1 gap-4 md:w-full md:grid-cols-2 md:items-start lg:grid-cols-3 xl:flex xl:w-[300px] xl:flex-col">
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

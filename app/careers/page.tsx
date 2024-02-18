import Image from "next/image";
import React from "react";

const Careers = () => {
  return (
    <>
      <div className="relative h-full w-full">
        <div className="absolute -top-[10%] left-0 right-0 isolate -z-10 m-auto h-full w-screen overflow-visible overflow-x-clip lg:-top-[35%] lg:mb-0">
          <div className="absolute -left-48 -top-20 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-rose-600/25 to-slate-950/0 xl:left-[15%] xl:top-0"></div>
          <div className="absolute -left-24 top-[30%] -z-10 h-[725px] w-[725px] bg-gradient-radial from-fuchsia-800/25 to-slate-950/0 xl:left-[20%]"></div>
          <div className="absolute left-24 top-16 -z-10 h-[630px] w-[630px] bg-gradient-radial from-indigo-950/90 to-slate-950/0 xl:left-[30%]"></div>
          <div className="absolute right-48 top-64 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-blue-800/35 to-slate-950/0 xl:left-[50%]"></div>
          <div className="absolute right-0 top-0 -z-10 h-[350px] w-[350px] bg-gradient-radial from-sky-600/45 to-slate-950/0 xl:left-[63%]"></div>
          <div className="absolute -right-24 top-96 -z-10 h-[250px] w-[250px] bg-gradient-radial from-teal-700/45 to-slate-950/0 xl:left-[70%]"></div>
        </div>
      </div>
      <section className="m-auto mb-12 mt-20 w-[95%] max-w-6xl">
        <h1 className="text-5xl font-bold text-slate-100">Careers</h1>
        <p className="mt-4 text-slate-400">Join our team!</p>
        <div className="mt-8 grid h-[40vh] w-full place-items-center items-center rounded-xl border-4 border-dashed border-slate-600 text-slate-400">
          {" "}
          <div className="">
            <Image
              src="/img/undraw_no_jobs.svg"
              alt="Under Construction"
              height={200}
              width={200}
            />
            <i className="mt-6 block">No open positions. Check back later.</i>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;

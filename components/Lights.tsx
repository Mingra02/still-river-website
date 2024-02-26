import React from "react";

interface LightsProps {
  position?: "fixed" | "absolute";
}

const Lights: React.FC<LightsProps> = ({ position = "absolute" }) => {
  return (
    <div className={`${position} top-[40%] h-full w-full`}>
      <div className="absolute -top-[10%] left-0 right-0 isolate -z-10 m-auto h-full w-screen overflow-visible overflow-x-clip lg:-top-[35%] lg:mb-0">
        <div className="absolute -left-48 -top-20 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-rose-600/25 to-slate-950/0 xl:left-[15%] xl:top-0"></div>
        <div className="absolute -left-24 top-[30%] -z-10 h-[725px] w-[725px] bg-gradient-radial from-fuchsia-800/25 to-slate-950/0 xl:left-[20%]"></div>
        <div className="absolute left-24 top-16 -z-10 h-[630px] w-[630px] bg-gradient-radial from-indigo-950/90 to-slate-950/0 xl:left-[30%]"></div>
        <div className="absolute right-48 top-64 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-blue-800/35 to-slate-950/0 xl:left-[50%]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[350px] w-[350px] bg-gradient-radial from-sky-600/45 to-slate-950/0 xl:left-[63%]"></div>
        <div className="absolute -right-24 top-96 -z-10 h-[250px] w-[250px] bg-gradient-radial from-teal-700/45 to-slate-950/0 xl:left-[70%]"></div>
      </div>
    </div>
  );
};

export default Lights;

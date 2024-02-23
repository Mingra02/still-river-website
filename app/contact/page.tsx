import { Metadata } from "next";
import { EmailForm } from "@/components/EmailForm";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Contact Us | The Still River",
  description:
    "Get in touch with us and see how we can help you unleash the power of your data.",
};

export default function Contact() {
  return (
    <>
      <div className="relative h-full w-full">
        <div className="absolute bottom-0 top-0 isolate -z-10 m-auto w-screen overflow-x-clip lg:mb-0">
          <div className="absolute -left-48 -top-20 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-rose-600/25 to-slate-950/0 xl:left-[15%] xl:top-0"></div>
          <div className="absolute -left-24 top-[30%] -z-10 h-[725px] w-[725px] bg-gradient-radial from-fuchsia-800/25 to-slate-950/0 xl:left-[20%]"></div>
          <div className="absolute left-24 top-16 -z-10 h-[630px] w-[630px] bg-gradient-radial from-indigo-950/90 to-slate-950/0 xl:left-[30%]"></div>
          <div className="absolute right-48 top-64 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-blue-800/35 to-slate-950/0 xl:left-[50%]"></div>
          <div className="absolute right-0 top-0 -z-10 h-[350px] w-[350px] bg-gradient-radial from-sky-600/45 to-slate-950/0 xl:left-[63%]"></div>
          <div className="absolute -right-24 top-96 -z-10 h-[250px] w-[250px] bg-gradient-radial from-teal-700/45 to-slate-950/0 xl:left-[70%]"></div>
        </div>
        <section className="m-auto -mb-6 mt-20 max-w-2xl overflow-hidden px-4 sm:mb-14 sm:mt-32">
          <h1 className="text-5xl font-semibold text-slate-100">
            {"Let's work together"}
          </h1>
          <p className="mt-8 text-lg text-slate-300">
            {
              "Fill out the form below and we'll get back to you as fast as we can."
            }
          </p>
          <EmailForm />
        </section>
      </div>
    </>
  );
}

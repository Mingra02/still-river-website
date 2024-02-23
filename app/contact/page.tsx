"use client";

import { Metadata } from "next";
import { useContext, useEffect, useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Contact Us | The Still River",
  description:
    "Get in touch with us and see how we can help you unleash the power of your data.",
};

type FormGroupProps = {
  label: string;
  type: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cols?: number;
  formInfo: Record<string, string>;
};

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  type,
  name,
  handleChange,
  cols = 1,
  formInfo,
}) => {
  return (
    <div
      className={`flex flex-col gap-1 text-slate-300 transition-colors duration-300 has-[:focus:invalid]:text-pink-500 has-[:focus]:text-indigo-400 has-[:invalid]:text-pink-500 sm:col-span-${cols}`}
    >
      <label className="text-sm" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        value={name in formInfo ? formInfo[name] : ""}
        className="peer rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition autofill:bg-indigo-600 autofill:text-green-500 invalid:border-pink-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:invalid:ring-pink-500"
      />
      <p className="pointer-events-none text-sm text-pink-500 opacity-0 transition-opacity peer-invalid:pointer-events-auto peer-invalid:animate-pulse peer-invalid:opacity-100">
        Please enter a valid {label.toLowerCase()}.
      </p>
    </div>
  );
};

const EmailForm: React.FC = () => {
  const [formInfo, setFormInfo] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendEmail = async () => {
      const response = await fetch("/send_email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInfo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    };

    toast
      .promise(
        sendEmail(),
        {
          pending: "Sending...",
          success: "Message sent! We'll be in touch shortly.",
          error: "Something went wrong, please try again later.",
        },
        {
          position: "top-center",
          autoClose: 6500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        },
      )
      .then(() => {
        setFormInfo({});
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-12"
    >
      <FormGroup
        label="First name"
        type="text"
        name="given_name"
        handleChange={handleChange}
        formInfo={formInfo}
      />
      <FormGroup
        label="Last name"
        type="text"
        name="family_name"
        handleChange={handleChange}
        formInfo={formInfo}
      />
      <FormGroup
        label="Email"
        type="email"
        name="email"
        cols={2}
        handleChange={handleChange}
        formInfo={formInfo}
      />
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="text-sm text-slate-300">Message</label>
        <textarea
          name="message"
          onChange={handleChange}
          value={formInfo.message || ""}
          className="h-48 rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>
      <div className="flex w-full justify-end text-right sm:col-span-1 sm:col-start-2 sm:w-auto">
        <button className="mb-8 mt-4 flex w-full items-center justify-center rounded-md bg-indigo-500 px-6 py-2 font-semibold text-indigo-100 transition duration-200 hover:bg-indigo-600 focus:animate-pulse focus:bg-indigo-600 focus:outline-indigo-600 sm:mb-0 sm:w-auto">
          Send Message
        </button>
      </div>
      <ToastContainer theme="dark" />
    </form>
  );
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

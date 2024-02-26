"use client";

import { useContext, useEffect, useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";

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

export const EmailForm: React.FC = () => {
  const [formInfo, setFormInfo] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendEmail = async () => {
      const response = await fetch("/api/forum/send_email.php", {
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

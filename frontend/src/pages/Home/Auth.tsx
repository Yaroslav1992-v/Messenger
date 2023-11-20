import clsx from "clsx";
import { LoginForm, Logo, RegisterForm } from "../../componets";
import { useState } from "react";

const Auth = () => {
  const [form, setForm] = useState<"login" | "register">("login");
  const handleForm = () => {
    setForm((prev) => (prev === "login" ? "register" : "login"));
  };
  const ifForm = form === "login";
  return (
    <section className="bg-gray-100   ">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 shadow-md rounded-md  max-w-md mx-auto w-full flex flex-col items-center">
          <Logo />
          <h5 className="font-medium mb-5 text-2xl">
            {"Sign " + (ifForm ? "In" : "Up")}
          </h5>
          {ifForm ? <LoginForm /> : <RegisterForm />}
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 mr-4 mb-5  ">
              {(ifForm ? "Don't" : "Already") + " have an account?"}
            </p>
            <button
              onClick={handleForm}
              className={clsx(
                `inline-block bg-white border border-gray-300 text-gray-500 py-1 px-2 rounded-sm text-sm transition duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring focus:border-blue-500`
              )}
            >
              {ifForm ? "Register now!" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;

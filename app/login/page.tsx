"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "../api/api";
import Image from "next/image";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
    message: "",
  });

  const router = useRouter();

  const handleClick = async (event: React.MouseEvent) => {
    const emailRegex = /\S+@\S+\.\S+/;
    let errors = { email: false, password: false, message: "" };
    if (!emailRegex.test(email)) {
      errors.email = true;
    }
    if (password === "") {
      errors.password = true;
    }
    if (errors.email || errors.password) {
      event.preventDefault();
    }

    if (!errors.email && !errors.password) {
      event.preventDefault();

      try {
        const token = await loginUser(email, password);
        console.log('Success:', token);

        localStorage.setItem('token', token);

        router.push('/dashboard');
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
          errors.message = error.message;
        }
      }
    }

    setError(errors);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError((prevError) => ({ ...prevError, email: false, message: "" }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError((prevError) => ({ ...prevError, password: false, message: "" }));
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-[100vh] lg:grid-cols-12">
        <div className="w-3/4 m-10 md:hidden mt-20 ml-12">
          <Image
            src="/ornament1.jpg"
            alt="running"
            width={16}
            height={9}
            className="lg:rounded-full"
          />
        </div>

        <main className="flex items-center justify-center px-8 md:py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 md:min-h-[60vh]">
          <div className="max-w-xl lg:max-w-3xl">
            <form action="#" className="mt-2 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  className="mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm p-2"
                  value={email}
                  onChange={handleEmailChange}
                />
                {error.email && (
                  <p className="text-red-500">Please enter a valid email</p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm p-2"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {error.password && (
                  <p className="text-red-500">Please enter a password</p>
                )}
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Link
                  href={
                    /\S+@\S+\.\S+/.test(email) && password !== ""
                      ? "/dashboard"
                      : "#"
                  }
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleClick}
                >
                  Log in
                </Link>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Don`t have an account? &nbsp;
                  <a href="/signup" className="text-gray-700 underline">
                    Sign Up
                  </a>
                  .
                </p>
              </div>
              {error.message && (
                <div className="col-span-6">
                  <p className="text-red-500">{error.message}</p>
                </div>
              )}
            </form>
          </div>
        </main>
        <section className="relative h-48 items-end lg:col-span-5 lg:h-full xl:col-span-6 hidden lg:flex lg:items-center">
          <div className="w-full mb-6 mr-6">
            <Image
              src="/snowwhite.jpg"
              alt="running"
              width={990}
              height={500}
              className="lg:rounded-full"
            />
          </div>
        </section>
      </div>
    </section>
  );
}

export default Login;
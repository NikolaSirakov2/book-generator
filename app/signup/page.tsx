"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../api/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

  const router = useRouter();
  const { toast } = useToast();

  const handleClick = async (event: React.MouseEvent) => {
    const emailRegex = /\S+@\S+\.\S+/;
    let errors = {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      repeatPassword: false,
    };

    if (firstName === "") {
      errors.firstName = true;
    }
    if (lastName === "") {
      errors.lastName = true;
    }
    if (!emailRegex.test(email)) {
      errors.email = true;
    }
    if (password === "") {
      errors.password = true;
    }
    if (password !== repeatPassword) {
      errors.repeatPassword = true;
    }
    if (errors.email || errors.password || errors.repeatPassword) {
      event.preventDefault();
    }

    if (!errors.email && !errors.password && !errors.repeatPassword) {
      event.preventDefault();

      try {
        const data = await createUser(
          firstName,
          lastName,
          email,
          password,
          repeatPassword
        );
        console.error("Success:", data);
        localStorage.setItem("id", data.id);

        toast({
          title: "Account successfully created",
          description: "You can now log in with your new account",
        });

        router.push("/login");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
        }
      }
    }

    setError(errors);
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-[100vh] lg:grid-cols-12">
        <section className="relative h-48 items-end lg:col-span-5 lg:h-full xl:col-span-6 hidden lg:flex">
          <div className="w-full mb-6 ml-6">
            <Image
              src="/three-pigs.jpg"
              alt="running"
              width={900}
              height={500}
              className="lg:rounded-full"
            />
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm p-2"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {error.firstName && (
                  <p className="text-red-500">Please enter your first name</p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm p-2"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {error.lastName && (
                  <p className="text-red-500">Please enter your last name</p>
                )}
              </div>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error.email && (
                  <p className="text-red-500">Please enter a valid email</p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
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
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.password && (
                  <p className="text-red-500">Please enter a password</p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>
                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm p-2"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                {error.repeatPassword && (
                  <p className="text-red-500">Please re-enter your password</p>
                )}
              </div>
              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Link
                  href={
                    /\S+@\S+\.\S+/.test(email) && password === repeatPassword
                      ? "/login"
                      : "#"
                  }
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleClick}
                >
                  Create an account
                </Link>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account? &nbsp;
                  <a href="/login" className="text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>

            <div className="w-3/4 m-10 md:hidden">
          <Image
            src="/ornament2.jpg"
            alt="running"
            width={16}
            height={9}
            className="lg:rounded-full"
          />
        </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default SignUp;

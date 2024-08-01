'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookGenerationSocket } from "../../_components/BookGenerationSocket";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Account({ params }: { params: { id: string } }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  let router = useRouter();
  useBookGenerationSocket();

  const token = localStorage.getItem("token") ?? "";
  const getDecodedToken = () => {
    let decodedJwt = null;

    if (token) {
      const [header, payload, sign] = token.split(".");

      const base64UrlPayload = payload;
      const base64Payload = base64UrlPayload
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      const jsonPayload = atob(base64Payload);

      decodedJwt = JSON.parse(jsonPayload);
    } else {
      console.error("No JWT found in local storage");
    }

    return decodedJwt;
  };
  const user = getDecodedToken();

  const handleClick = (event: React.MouseEvent) => {
    const emailRegex = /\S+@\S+\.\S+/;
    let errors = { email: false, password: false };
    if (!emailRegex.test(email)) {
      errors.email = true;
    }
    if (password === "") {
      errors.password = true;
    }
    if (errors.email || errors.password) {
      event.preventDefault();
    }
    setError(errors);
  };

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    
  }

  return (
    <div className="flex items-center justify-center">
        <div className="flex flex-col mt-5 lg:mt-20 w-full h-[80vh] lg:w-[50vw] border rounded-xl shadow-xl bg-gradient-to-br from-blue-200 via-blue-300 to-blue-200">
          <h1 className="text-4xl font-bold text-center my-8">User details</h1>
          <h2 className="ml-4 font-bold">First Name</h2>
          <input
            type="text"
            placeholder="enter title of your story"
            value={user.firstName}
            readOnly
            className="border-2 border-gray-200 p-2 rounded-md mx-4 mb-4 text-gray-400"
          />
          <h2 className="ml-4 font-bold">Last Name</h2>
          <input
            type="text"
            placeholder="enter number of pages"
            value={user.lastName}
            readOnly
            className="border-2 border-gray-200 p-2 rounded-md mx-4 mb-4 text-gray-400"
          />
          <h2 className="ml-4 font-bold">Email</h2>
          <input
            type="text"
            placeholder="enter number of pages"
            value={user.email}
            readOnly
            className="border-2 border-gray-200 p-2 rounded-md mx-4 mb-4 text-gray-400"
          />
          <div className="flex items-center justify-center gap-6">
            <Button
              onClick={handleSubmit}
              className="mt-10 mb-6 w-1/3 bg-black hover:bg-white hover:text-black"
            >
              Save changes
            </Button>
            <Link href="/">
            <Button
              className="mt-10 mb-6 w-[15vw] bg-red-400 hover:bg-white hover:text-red-400"
            >
              Logout
            </Button>
            </Link>
          </div>
        </div>
    </div>
  );
}

export default Account;

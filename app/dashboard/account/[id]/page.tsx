"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookGenerationSocket } from "../../_components/BookGenerationSocket";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { changeUserInfo } from '../../../api/api';
import { useToast } from "@/components/ui/use-toast";
import useDecodedToken from "../../_components/useDecodedToken";

function Account({ }: { params: { id: string } }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initialValues, setInitialValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  let router = useRouter();
  const { toast } = useToast();
  useBookGenerationSocket();

  const { token, decodedJwt: user } = useDecodedToken();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setInitialValues({
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, []);

  const hasChanges = () => {
    return (
      email !== initialValues.email ||
      firstName !== initialValues.firstName ||
      lastName !== initialValues.lastName ||
      password !== "" ||
      passwordConfirmation !== ""
    );
  };

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!hasChanges()) {
      toast({
        title: "No changes detected",
        description: "Please make some changes before saving.",
      });
      return;
    }
    try {
      const userInfo = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      };
      const updatedUser = await changeUserInfo(user, token, userInfo);
      console.error("User updated successfully:", updatedUser, userInfo);
      toast({
        title: `Your changes have been saved!`, 
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col mt-5 lg:mt-20 w-full h-[80vh] lg:w-[50vw] border rounded-xl shadow-xl bg-gradient-to-br from-blue-200 via-blue-300 to-blue-200">
        <h1 className="text-4xl font-bold text-center my-8">User details</h1>
        <h2 className="ml-4 font-bold">First Name</h2>
        <input
          type="text"
          placeholder="enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border-2 border-gray-200 p-2 rounded-md mx-4 mb-4 text-gray-400"
        />
        <h2 className="ml-4 font-bold">Last Name</h2>
        <input
          type="text"
          placeholder="enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border-2 border-gray-200 p-2 rounded-md mx-4 mb-4 text-gray-400"
        />
        <h2 className="ml-4 font-bold">Email</h2>
        <input
          type="text"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-200 p-2 rounded-md mx-4 mb-4 text-gray-400"
        />
        <h2 className="ml-4 font-bold">Password</h2>
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-200 p-2 rounded-md mx-4 mb-4 text-gray-400"
        />
        <h2 className="ml-4 font-bold">Confirm Password</h2>
        <input
          type="password"
          placeholder="confirm your password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="border-2 border-gray-200 p-2 rounded-md mx-4 mb-4 text-gray-400"
        />
        <div className="flex items-center justify-center gap-6">
          <Button
            onClick={handleSubmit}
            className="mt-10 mb-6 w-1/3 bg-black hover:bg-white hover:text-black"
          >
            Save changes
          </Button>
          <Button
            onClick={handleLogout}
            className="mt-10 mb-6 w-[15vw] bg-red-400 hover:bg-white hover:text-red-400"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Account;
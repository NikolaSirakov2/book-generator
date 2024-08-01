"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { createBook } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useBookGenerationSocket } from "../_components/BookGenerationSocket";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [outline, setOutline] = useState("");
  const [pages, setPages] = useState("");
  const [responseData, setResponseData] = useState<null | any>(null);
  const router = useRouter();

  useBookGenerationSocket();

  const handleSubmit = async () => {
    if (title && outline && pages) {
      const isBrowser = typeof window !== "undefined";
      const token = isBrowser ? localStorage.getItem("token") ?? "" : "";
      const data = await createBook(title, outline, parseInt(pages, 10), token);
      setResponseData(data);
      if (isBrowser) {
        const existingTitles = JSON.parse(localStorage.getItem("creating_book") ?? "[]");
        existingTitles.push(title);
        localStorage.setItem("creating_book", JSON.stringify(existingTitles));
      }
      router.push('/dashboard/mybooks');
    }
  };

  return (
    <div className="flex items-center justify-center">
        <div className="flex flex-col mt-5 lg:mt-20 w-full h-[80vh] lg:w-[50vw] border rounded-xl shadow-xl bg-gradient-to-br from-blue-200 via-blue-300 to-blue-200">
          <h1 className="text-4xl font-bold text-center my-8">Create a Book</h1>
          <input
            type="text"
            placeholder="enter title of your story"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-200 p-2 rounded-md m-4"
          />
          <input
            type="number"
            placeholder="enter number of pages"
            value={pages}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              if (!isNaN(newValue)) {
                setPages(Math.min(Math.max(1, newValue), 10).toString());
              }
            }}
            className="border-2 border-gray-200 p-2 rounded-md m-4"
            min="1"
            max="10"
          />
          <textarea
            placeholder="enter outline..."
            value={outline}
            onChange={(e) => setOutline(e.target.value)}
            className="border-2 border-gray-200 p-2 rounded-md m-4"
            rows={6}
          />
          <div className="flex items-center justify-center">
            <Button
              onClick={handleSubmit}
              className="mt-10 mb-6 w-1/2 bg-black hover:bg-white hover:text-black"
            >
              Create Book
            </Button>
          </div>
        </div>
    </div>
  );
}

export default CreateBook;

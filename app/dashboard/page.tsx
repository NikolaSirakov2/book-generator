"use client";
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import { BookHeart, BookOpenCheck, LibraryBigIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { fetchBooks, fetchUserDashboard } from "../api/api";
import { books } from "../data/books";
import useDecodedToken from "./_components/useDecodedToken";
import { useBookGenerationSocket } from "./_components/BookGenerationSocket";

interface Book {
  id: number;
  title: string;
  pages: number;
  images: string[];
  userid: number;
  text?: {
    line1: string;
  };
}

interface SuggestedBook {
  id: number;
  title: string;
  images: string;
  text: string
}

function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [userDashboardData, setUserDashboardData] = useState<any>(null);
  const [suggestedBooks, setSuggestedBooks] = useState<any>([]);
  const { token, decodedJwt: decodedToken } = useDecodedToken();
  useBookGenerationSocket();

  const fetchUserDashboardData = async () => {
    try {
      const userDashboardData = await fetchUserDashboard(token);
      const userBooks = userDashboardData.books;
      const suggestedBooks = userDashboardData.suggestedBooks;
      setSuggestedBooks(suggestedBooks);
      setUserBooks(userBooks);
      setUserDashboardData(userDashboardData);
    } catch (error) {
      console.error("Failed to fetch books: ", error);
    }
  };

  useEffect(() => {
    if (decodedToken !== null) {
      fetchUserDashboardData();
    }
  }, []);

  const userBookElements = userBooks?.slice(-3).map((book) => (
    <div key={book.id} className="flex items-center justify-between mb-4">
      <Image
        src={book.images[0]}
        alt={book.title}
        width={80}
        height={100}
        className="rounded-xl mx-6"
      />
      <div className="flex flex-col justify-start flex-1 ml-4">
        <h1 className="font-bold">{book.title}</h1>
        <p>{book.pages} pages</p>
      </div>
      <Link href={`/dashboard/book/${book.id}`} passHref>
        <Button className="bg-white text-black mr-2 lg:mr-4 rounded-full py-0 hover:bg-black hover:text-white">
          Read
        </Button>
      </Link>
    </div>
  ));

  const suggestedBookElements = suggestedBooks?.map((book: SuggestedBook) => {
    let textWithoutTags = book.text.replace(/<\/?page>|<\/?content>/g, '');
    let firstFiveLines = textWithoutTags.split('.').slice(0, 2).join('. ') + '.';

    const handleSaveToLocalStorage = () => {
      localStorage.setItem('suggestedBook', JSON.stringify(book));
    };

    return (
      <div
        key={book.id}
        className="bg-blue-100 items-center justify-between border-1 rounded-xl p-4 mr-10 max-w-[90vw] lg:max-w-[30vw] min-h-[40vh] shadow-xl"
      >
        <Image
          src={book.images[0]}
          alt={book.title}
          width={170}
          height={150}
          className="rounded-full"
        />
        <div className="flex flex-col ml-4">
          <h1 className="font-bold my-2">{book.title}</h1>
          <p>{firstFiveLines}</p>
        </div>
        <Link href={`/dashboard/book/${book.id}`} passHref>
          <Button 
            className="bg-black text-white border-2 m-2 lg:mr-4 rounded-full py-0 hover:bg-white hover:text-black"
            onClick={handleSaveToLocalStorage}
          >
            Read Now
          </Button>
        </Link>
      </div>
    );
  });

  return (
    <div className="w-full flex flex-col lg:grid lg:grid-rows-2 lg:gap-4 lg:h-[97vh] ">
      <div className="w-full flex flex-col lg:flex-row lg:space-x-4">
        <div className="bg-blue-100 shadow-xl w-full lg:w-full rounded-xl mb-6 lg:mb-2 flex flex-col items-center">
          <h1 className="text-3xl font-bold mx-4 mt-4 lg:m-4 text-center">
            Welcome back {userDashboardData?.userInfo?.firstName}!
          </h1>
          <div className="grid grid-rows-2 lg:grid-rows-1 md:grid-cols-3">
            <div className="row-span-1 lg:ml-6 flex items-center justify-center lg:mb-20">
              <Image
                src="/two-books.jpg"
                alt="little_mermaid"
                width={200}
                height={150}
                className="rounded-xl"
              />
            </div>
            <div className="flex row-span-2">
              <div className="flex flex-col m-6 items-center">
                <div className="flex items-center gap-4 border bg-white rounded-xl mb-2">
                  <div
                    className="text-white rounded-xl ml-2"
                    style={{
                      background:
                        "linear-gradient(to bottom right, #b3d1ff, #3399ff, #0066ff)",
                      padding: "10px",
                    }}
                  >
                    <LibraryBigIcon size={26} />
                  </div>
                  <p className="font-bold">My books</p>
                  <div className="bg-gray-300 m-2 p-2 rounded-full font-bold ml-[35vw] lg:ml-[15vw]">
                    <p className="px-2">{userBooks.length ?? 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border bg-white rounded-xl mb-2">
                  <div
                    className="text-white rounded-xl ml-2"
                    style={{
                      background:
                        "linear-gradient(to bottom right, #b3d1ff, #3399ff, #0066ff)",
                      padding: "10px",
                    }}
                  >
                    <BookOpenCheck size={25} />
                  </div>
                  <p className="font-bold">Books read</p>
                  <div className="bg-gray-300 m-2 p-2 rounded-full font-bold ml-[35vw] lg:ml-[15vw]">
                    <p className="px-2">{userDashboardData?.userInfo?.readBooks?.length ?? 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border bg-white rounded-xl mb-2">
                  <div
                    className="text-white rounded-xl ml-2"
                    style={{
                      background:
                        "linear-gradient(to bottom right, #b3d1ff, #3399ff, #0066ff)",
                      padding: "10px",
                    }}
                  >
                    <BookHeart size={25} />
                  </div>
                  <p className="font-bold">Books liked</p>
                  <div className="bg-gray-300 m-2 p-2 rounded-full font-bold ml-[35vw] lg:ml-[15vw]">
                    <p className="px-2">{userDashboardData?.userInfo?.likedBooks?.length ?? 0}</p>
                  </div>
                </div>
                <Link href="/dashboard/createbook" passHref>
                  <Button className=" bg-black text-white border-1 m-2 mt-10 lg:mr-4 rounded-full py-0 hover:bg-white hover:text-black">
                    + Create New Book
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-100 shadow-xl w-full lg:w-full grid grid-rows-5 rounded-xl mb-6 lg:mb-2 grid-flow-row-dense">
          <h1 className="text-2xl font-bold m-4 ">Your Books</h1>
          {userBookElements}
          <div className="flex items-center justify-center row-start-5">
            <Link href="/dashboard/mybooks" passHref>
              <Button className="bg-black text-white border-1 m-2 lg:mr-4 rounded-full py-0 hover:bg-white hover:text-black">
                Your Library
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-4">Suggested Books</h1>
        <div className="rounded-xl">
          <Marquee>{suggestedBookElements}</Marquee>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

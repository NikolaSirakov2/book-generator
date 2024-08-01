"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { fetchBooks } from "../../api/api";
import useDecodedToken from "../_components/useDecodedToken";
import { io } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";
import BookLike from "../_components/BookLike";
import { Loader2Icon } from "lucide-react";
import { fetchUserDashboard } from "../../api/api";

interface Book {
  id: number;
  title: string;
  pages: number;
  images: string[];
  userid: number;
  text?: string;
}

interface LikedBook {
  id: string;
  title: string;
  images: string[];
}

function MyBooks() {
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [userLikedBooks, setUserLikedBooks] = useState<LikedBook[]>([]);
  const { token, decodedJwt: decodedToken } = useDecodedToken();
  const [isLoadingBook, setIsLoadingBook] = useState(false);
  const { toast } = useToast();

  const isBrowser = typeof window !== "undefined";

  const fetchBooksUser = async () => {
    try {
      const userBooks: Book[] = await fetchBooks(token);
      setUserBooks(userBooks);
    } catch (error) {
      console.error("Failed to fetch books: ", error);
    }
  };

  const fetchUserDashboardData = async () => {
    try {
      const userDashboardData = await fetchUserDashboard(token);
      setUserLikedBooks(userDashboardData.userInfo.likedBooks);
    } catch (error) {
      console.error("Failed to fetch books: ", error);
    }
  };

  useEffect(() => {
    fetchBooksUser();
    fetchUserDashboardData();

    if (isBrowser) {
      const hasCreatingBook = Object.keys(localStorage).some((key) =>
        key.startsWith("creating_book")
      );
      setIsLoadingBook(hasCreatingBook);

      const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

      socket.on("book-generation-complete", (data) => {
        console.error("Book generation complete:", data);
        setIsLoadingBook(false);
        const existingTitles = JSON.parse(
          localStorage.getItem("creating_book") ?? "[]"
        );
        let removedTitle = "";
        if (existingTitles.length > 0) {
          removedTitle = existingTitles.shift();
          localStorage.setItem("creating_book", JSON.stringify(existingTitles));
        }
        fetchBooksUser();
        toast({
          title: `Book "${removedTitle}" generation complete!`,
        });
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [decodedToken.id]);

  const userBookElements = userBooks?.map((book) => {
    const firstContentMatch = book?.text?.match(/<content>([\s\S]*?)<\/content>/);
    let firstContent = firstContentMatch ? firstContentMatch[1] : "";
    firstContent = firstContent.replace(/\n/g, " ");
    firstContent = firstContent.replace(/<br\s*\/?>/gi, " ");

    const isLiked = userLikedBooks.some(
      (likedBook) => likedBook.id === book.id.toString()
    );

    return (
      <div
        key={book.id}
        className="border bg-gray-200 rounded-xl shadow-lg mb-4 hover:bg-blue-100 lg:w-[20vw] lg:flex lg:flex-col lg:min-h-[40vh]"
      >
        <div className="flex flex-row justify-between m-4">
          <div className="flex flex-row">
            <Image
              src={book.images[0]}
              alt={book.id.toString()}
              width={200}
              height={300}
              className="lg:w-3/5 lg:h-auto lg:max-h-[15vh] rounded-xl"
            />
            <div className="ml-6 lg:flex lg:flex-col lg:justify-between">
              <div>
                <h1 className="text-xl font-bold">{book.title}</h1>
                <p>Pages: {book.pages}</p>
                <p>Illus: {book.images.length}</p>
              </div>
              <div className="my-2 lg:hidden">
                <BookLike
                  bookId={book.id.toString()}
                  token={token}
                  defaultLiked={isLiked}
                />
              </div>
              <Link href={`/dashboard/book/${book.id}`} passHref>
                <Button className="bg-white text-black mt-2 mr-2 lg:mr-0 lg:rounded-full py-0 hover:bg-black hover:text-white">
                  Read
                </Button>
              </Link>
            </div>
          </div>
          <div className="ml-6 hidden lg:block">
            <BookLike
              bookId={book.id.toString()}
              token={token}
              defaultLiked={isLiked}
            />
          </div>
        </div>
        <div className="m-4">
          <p className="line-clamp-3 lg:line-clamp-6">{firstContent}</p>
        </div>
      </div>
    );
  });

  const loadingTitles = isBrowser
    ? JSON.parse(localStorage.getItem("creating_book") ?? "[]")
    : [];
  const loadingBookCards: JSX.Element[] = loadingTitles.map(
    (title: string, index: number) => (
      <div
        key={index}
        className="border bg-gray-200 rounded-xl shadow-lg mb-4 hover:bg-blue-200 lg:w-[20vw] lg:flex lg:flex-col lg:min-h-[40vh] flex justify-center items-center"
      >
        <h1 className="text-3xl font-bold">"{title}"</h1>
        <h1 className="text-3xl font-bold">is loading...</h1>
        <Loader2Icon size={72} className="animate-spin mt-4" />
      </div>
    )
  );

  return (
    <div className="flex flex-wrap justify-around">
      <h1 className="text-4xl font-bold mb-10 w-full text-center font-serif">
        Library
      </h1>
      {loadingBookCards}
      {userBookElements}
    </div>
  );
}

export default MyBooks;

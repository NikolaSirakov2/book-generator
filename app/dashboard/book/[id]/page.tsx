"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { fetchBook, fetchUserDashboard, readBook } from "@/app/api/api";
import useDecodedToken from "../../_components/useDecodedToken";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BookLike from "../../_components/BookLike";
import { useBookGenerationSocket } from "../../_components/BookGenerationSocket";

interface Book {
  id: number;
  title: string;
  pages: number;
  images: string[];
  userid: number;
  text: string;
}

interface LikedBook {
  id: string;
  title: string;
  images: string[];
}

function BookComponent({}: { params: { id: string } }) {
  const [book, setUserBook] = useState<Book | null>(null);
  const [userLikedBooks, setUserLikedBooks] = useState<LikedBook[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pathname = usePathname();
  const bookIdStr = pathname.split("/").pop();
  const bookId = bookIdStr || "";
  const { decodedJwt: decodedToken, token } = useDecodedToken();
  useBookGenerationSocket();

  const fetchBookUser = async () => {
    try {
      const book = await fetchBook(decodedToken.id, bookId, token);
      setUserBook(book);
    } catch (error) {
      const suggestedBook = localStorage.getItem("suggestedBook");
      if (suggestedBook) {
        setUserBook(JSON.parse(suggestedBook));
      }
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
    fetchBookUser();
    fetchUserDashboardData();
  }, []);

  const getContentForPage = (text: string, pageNumber: number): string => {
    const matches = text.match(/<page>([\s\S]*?)<\/page>/g);
    if (!matches || pageNumber >= matches.length) return "";
    const contentMatch = matches[pageNumber].match(
      /<content>([\s\S]*?)<\/content>/
    );
    return contentMatch ? contentMatch[1] : "";
  };

  const firstContent = book ? getContentForPage(book.text, currentPage) : "";
  const paragraphs = firstContent.split("<br><br>");
  const totalParagraphsLength = paragraphs.reduce(
    (sum, paragraph) => sum + paragraph.length,
    0
  );

  if(book?.pages === 1) {
    const markBookAsRead = async () => {
      try {
        await readBook(decodedToken.id, book.id.toString(), token);
      } catch (error) {
        console.error("Failed to mark book as read: ", error);
      }
    };
  
    markBookAsRead();
  }

  const handleNextPage = async () => {
    if (book) {
      if (currentPage === book.pages - 2) {
        console.error("Marking book as read");
        try {
          await readBook(decodedToken.id, book.id.toString(), token);
        } catch (error) {
          console.error("Failed to mark book as read: ", error);
        }
      } else if (currentPage < book.pages - 1) {
        console.error("Incrementing page");
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex w-[90vw] lg:m-2 lg:w-full justify-center lg:h-[95vh] items-center">
      <div className="border bg-gray-100 rounded-3xl shadow-lg w-[90vw] lg:w-[80vw] lg:h-[80vh] mb-6 lg:mb-0">
        {book && (
          <>
            <div className="m-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between">
                <div></div>
                <h2 className="text-4xl lg:text-5xl font-bold font-serif text-gray-800">
                  {book.title}
                </h2>
                <BookLike
                  bookId={book.id.toString()}
                  token={token}
                  defaultLiked={userLikedBooks.some(
                    (likedBook) => likedBook.id === book.id.toString()
                  )}
                />
              </div>
              <div className="lg:flex items-center lg:h-[65vh]">
                <Image
                  src={book.images[currentPage]}
                  alt="book"
                  width={300}
                  height={300}
                  className="lg:w-2/5 h-3/5 rounded-xl mx-6"
                />
                <div
                  className={`${
                    totalParagraphsLength > 790
                      ? "text-xl"
                      : "text-xl lg:text-2xl"
                  } lg:mx-10 first-letter:text-4xl first-letter:font-bold whitespace-pre-line font-light text-gray-800`}
                >
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-end w-full lg:w-3/4">
                {currentPage > 0 ? (
                  <button
                    onClick={handlePrevPage}
                    className="mt-4 px-4 py-2 text-gray-500 flex items-center hover:text-gray-700 transition-colors duration-200 ease-in-out"
                  >
                    <ArrowLeft className="mr-2" /> Prev Page
                  </button>
                ) : (
                  <div className="opacity-0 pointer-events-none">
                    <ArrowLeft className="" /> Prev Page
                  </div>
                )}
                {book && book.pages > 1 && currentPage < book.pages - 1 && (
                  <>
                    {console.log("Rendering Next Page button")}
                    <button
                      onClick={handleNextPage}
                      className="mt-4 px-4 py-2 text-gray-500 flex items-center hover:text-gray-700 transition-colors duration-200 ease-in-out"
                    >
                      Next Page <ArrowRight className="ml-2" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookComponent;

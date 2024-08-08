import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cover bg-center">
      <div className="lg:flex rounded-xl lg:m-6 items-center">
        <div className="w-full lg:w-[50vw] lg:flex justify-center">
          <Image
            src="/red-hood1.jpg"
            alt="running"
            width={950}
            height={500}
            className="lg:rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 bg-white rounded-3xl -mt-10 z-10">
        <div className="max-w-lg w-full bg-white rounded-lg">
          <div className="p-4">
            <h2 className="text-4xl font-bold mb-10">
              Welcome to Book Generator
            </h2>
            <p className="my-8 leading-relaxed text-black sm:text-xl">
              Our Book Generator allows you to craft engaging and educational
              stories for children. With a wide range of options to choose from,
              you can create a book that is tailored to your child's interests
              and reading level.
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Link
              href="/signup"
              className="bg-gradient-to-br from-red-400 via-blue-500 to-red-400 text-white font-bold m-4 py-2 px-6 lg:text-xl lg:px-10 rounded-full hover:bg-blue-700 transition duration-150 ease-in-out hover:text-black"
            >
              Start Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

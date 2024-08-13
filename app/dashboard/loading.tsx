export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen h-screen">
      <h1 className="font-bold text-5xl flex items-center">
        Loading
        <svg
          className="animate-spin ml-4 h-12 w-12 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </h1>
    </div>
  );
}
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-4">
        <h1 className="text-center font-bold text-5xl md:text-6xl mb-12 drop-shadow-lg animate-fade-in">
          Welcome to Home Page!
        </h1>

        <div className="flex gap-6">
          <Link href="/registration">
            <button className="px-8 py-3 rounded-full bg-white text-indigo-700 font-semibold text-lg shadow-md hover:bg-indigo-100 transition-all duration-300 ease-in-out transform hover:scale-105">
              Sign Up
            </button>
          </Link>

          <Link href="/login">
            <button className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold text-lg shadow-md hover:bg-white hover:text-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
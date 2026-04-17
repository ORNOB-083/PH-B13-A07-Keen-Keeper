import React from "react";
import Link from "next/link";

const notFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-9xl font-black text-gray-200">404</h1>

            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-4">
                Uh-oh!
            </p>

            <p className="mt-4 text-gray-500">
                We can't find that page.
            </p>

            <Link href={"/"}>
            <button className="mt-6 inline-block rounded bg-green-900 px-5 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring">
                Go Back Home
            </button>
            </Link>
        </div>
    );
}
export default notFound;
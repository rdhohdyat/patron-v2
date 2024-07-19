import React from "react";
import { Button } from "@/Components/ui/button";

const NotFound = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md flex flex-col items-center justify-center text-center space-y-4">
                <img
                    src="/404.png"
                    className="w-full max-w-xs sm:max-w-md"
                    alt="Not Found"
                />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-600">
                    Anda mencoba mengakses halaman yang kosong.
                </h1>
                <a
                    href="/"
                    className="text-green-500 font-semibold text-lg sm:text-xl underline"
                >
                    Kembali
                </a>
            </div>
        </div>
    );
};

export default NotFound;

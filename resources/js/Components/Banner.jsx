import React, { useState, useEffect } from "react";

const Banner = () => {
    const images = [
        {
            src: "/sayurr.jpg",
            description: "Sayuran segar untuk kebutuhan sehari-hari Anda.",
        },
        {
            src: "/markett.jpg",
            description: "Buah segar yang kaya akan vitamin dan nutrisi.",
        },
        {
            src: "/ikan.jpg",
            description: "Berbagai macam ikan dan daging segar",
        },
        {
            src: "/markett.jpg",
            description: "Pasar tradisional dengan berbagai pilihan produk.",
        },
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentImageIndex(
                    (prevIndex) => (prevIndex + 1) % images.length
                );
                setFade(true);
            }, 1000); // Adjust the timing to match the CSS transition duration
        }, 5000);

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div
            className={`sm:p-12 p-6 z-10 sm:bg-none bg-center rounded-xl text-center sm:text-start mt-6 transition-opacity duration-1000 ${
                fade ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${images[currentImageIndex].src})` }}
        >
            <div>
                <h1 className="font-semibold text-lg sm:text-2xl text-white sm:w-[600px]">
                    Temukan Pasar Terdekat dan Berbagai Kebutuhan Rumah Tangga
                    Anda dengan Patron
                </h1>
                <p className="text-white mt-3 sm:text-lg">
                    {images[currentImageIndex].description}
                </p>
            </div>
        </div>
    );
};

export default Banner;

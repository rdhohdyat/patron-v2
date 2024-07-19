import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export default function MarketNotFound() {
    const EmptyProductImage = () => {
        return <img src="/search_notfound.png" className="w-[350px]" />;
    };
    return (
        <div className="flex items-center justify-center">
            <div className="text-center w-[250px] sm:w-[300px]">
                <EmptyProductImage></EmptyProductImage>
                <h1 className="text-gray-600 text-xl text-center font-bold mt-5">
                    Tidak ada Pasar yang ditemukan
                </h1>
            </div>
        </div>
    );
}

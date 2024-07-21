import { ShoppingBag, Store } from "lucide-react";
import { Link } from "@inertiajs/react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import { Button } from "@/Components/ui/button";
import { formatRupiah } from "@/lib/convert";
import { Card } from "@/Components/ui/card";

const ProductList = ({ data }) => {
    const products = data.data;

    return (
        <div className="my-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg sm:text-xl text-gray-700">
                    Lainnya di toko ini
                </h1>
                <Link
                    href="/all-products" // Update this link as needed
                    className="text-md sm:text-lg text-green-600 hover:text-green-800"
                >
                    Lihat semua
                </Link>
            </div>

            <div className="relative rounded-md">
                <Carousel className="rounded-md">
                    <CarouselContent>
                        {products.map((product) => (
                            <CarouselItem
                                key={product.id}
                                className="basis-1/2 lg:basis-1/5 py-4"
                            >
                                <Link href={route("shop.detail", product.id)}>
                                    <Card className="cursor-pointer shadow-md">
                                        <img
                                            src={product.image}
                                            className="rounded-t-lg w-[250px] h-[170px] sm:h-[200px] object-cover"
                                            alt={product.name}
                                        />
                                        <div className="p-3">
                                            <h1 className="text-sm font-semibold truncate w-[180px]">
                                                {product.name}
                                            </h1>
                                            <p className="font-bold text-md mt-1">
                                                {formatRupiah(product.price)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <ShoppingBag size="16" />
                                                <p className="text-sm text-gray-600 truncate w-[200px]">
                                                    {product.category}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex absolute left-0 top-[40%] transform -translate-y-1/2 text-gray-600 hover:text-gray-900" />
                    <CarouselNext className="hidden sm:flex absolute right-0 top-[40%] transform -translate-y-1/2 text-gray-600 hover:text-gray-900" />
                </Carousel>
            </div>
        </div>
    );
};

export default ProductList;

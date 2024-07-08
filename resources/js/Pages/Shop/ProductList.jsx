import { Store } from "lucide-react";
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

const ProductList = ({ data }) => {
    const products = data.data;
    return (
        <div>
            <div className="flex justify-between items-center mt-6">
                <h1 className="font-bold text-lg sm:text-xl text-gray-600">
                    Lainnya di toko ini
                </h1>
                <Button variant="link" className="text-md sm:text-lg text-green-500">
                    Lihat semua
                </Button>
            </div>

            <div className="relative rounded-md">
                <Carousel className="rounded-md">
                    <CarouselContent>
                        {products?.map((product) => (
                            <CarouselItem
                                key={product.id}
                                className="basis-1/2  lg:basis-1/5"
                            >
                                <Link href={route("shop.detail", product.id)}>
                                    <div className="cursor-pointer">
                                        <img
                                            src={product.image}
                                            className="rounded-lg w-[250px] h-[170px] sm:h-[200px] object-cover"
                                            alt={product.name}
                                        />
                                        <div className="mt-1">
                                            <h1 className="w-[180px] truncate ...">
                                                {product.name}
                                            </h1>
                                            <p className="text-sm font-semibold">
                                                {formatRupiah(product.price)}
                                            </p>
                                            <div className="flex items-center gap-1 mt-2">
                                                <Store size="16" />
                                                <p className="text-sm">
                                                    {product.category}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex absolute left-0 top-[40%] transform -translate-y-1/2" />
                    <CarouselNext className="hidden sm:flex absolute right-0 top-[40%] transform -translate-y-1/2" />
                </Carousel>
            </div>
        </div>
    );
};

export default ProductList;

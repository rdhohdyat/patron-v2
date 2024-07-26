import { Store } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import { Button } from "@/Components/ui/button";
import { formatRupiah } from "@/lib/convert";
import { MapPin } from "lucide-react";

const StoreList = ({ data }) => {
    const stores = data.data;
    return (
        <div>
            <div className="flex justify-between items-center mt-6">
                <h1 className="font-bold text-lg sm:text-xl text-gray-600">
                    Lihat toko lain
                </h1>
                <Link
                    href={route("shop")}
                    className="sm:text-md text-sm underline text-green-500"
                >
                    Lihat semua
                </Link>
            </div>

            <div className="relative rounded-md">
                <Carousel className="rounded-md">
                    <CarouselContent>
                        {stores.map((store) => (
                            <CarouselItem
                                key={store.id}
                                className="basis-1/2  lg:basis-1/5 py-4"
                            >
                                <Link
                                    href={route("shop.store_detail", store.id)}
                                >
                                    <Card className="cursor-pointer shadow-md">
                                        <img
                                            src={store.image}
                                            className="rounded-t-lg w-[250px] h-[170px] sm:h-[200px] object-cover"
                                            alt={store.nama_store}
                                        />
                                        <div className="p-3">
                                            <div className="flex items-center gap-1 mt-2">
                                                <Store size="16" />
                                                <h1 className="w-[180px] font-semibold truncate ...">
                                                    {store.nama_store}
                                                </h1>
                                            </div>
                                            <div className="flex items-center gap-1 mt-2">
                                                <MapPin className="h-4 w-4 text-red-600"/>
                                                <p className="text-sm">
                                                    {store.lokasi_store}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
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

export default StoreList;

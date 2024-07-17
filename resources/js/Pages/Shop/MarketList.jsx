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

const MarketList = ({ data }) => {
    const stores = data.data;
    return (
        <div>
            <div className="flex justify-between items-center mt-6">
                <h1 className="font-bold text-lg sm:text-xl text-gray-600">
                    Pasar Lainnya
                </h1>
                <Button
                    variant="link"
                    className="text-md sm:text-lg text-green-500"
                >
                    Lihat semua
                </Button>
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
                                    <Card className="cursor-pointer">
                                        <img
                                            // src={store.image}
                                            src="/pasar.jpg"
                                            className="rounded-t-lg w-[250px] h-[170px] sm:h-[200px] object-cover"
                                            alt={store.nama_store}
                                        />
                                        <div className="p-3">
                                            <div className="flex items-center gap-1 mt-2">
                                                <Store size="16" />
                                                <h1 className="w-[180px] truncate ...">
                                                    {store.nama_store}
                                                </h1>
                                            </div>
                                            <p className="text-sm">
                                                {store.lokasi_store}
                                            </p>
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

export default MarketList;

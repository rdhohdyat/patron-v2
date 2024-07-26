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
import { MapPin } from "lucide-react";

const MarketList = ({ data }) => {
    const markets = data.data;

    function hapusPekanbaruAwal(lokasi) {
        return lokasi.replace(/^Pekanbaru,\s*/, "");
    }

    return (
        <div className="my-6">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg sm:text-xl text-gray-700">
                    Pasar Lainnya
                </h1>
                <Link
                    href={route("shop")}
                    className="text-md underline text-green-600 hover:text-green-800"
                >
                    Lihat semua
                </Link>
            </div>

            <div className="relative rounded-md">
                <Carousel className="rounded-md">
                    <CarouselContent>
                        {markets.map((market) => (
                            <CarouselItem
                                key={market.id}
                                className="basis-1/2 lg:basis-1/5 py-4 px-2"
                            >
                                <Link href={route("shop.market", market.id)}>
                                    <Card className="cursor-pointer shadow-md">
                                        <img
                                            src={market.image}
                                            className="rounded-t-lg w-full h-[200px] object-cover"
                                            alt={market.nama_market}
                                        />
                                        <div className="p-3">
                                            <div className="flex items-center gap-2 mt-2">
                                                <Store
                                                    size="16"
                                                    className="text-gray-600"
                                                />
                                                <h1 className="font-semibold truncate ...">
                                                    {market.nama_market}
                                                </h1>
                                            </div>
                                            <div className="flex items-center gap-1 mt-2">
                                                <MapPin className="h-6 w-6 text-red-600" />
                                                <p className="text-sm truncate ...">
                                                    {hapusPekanbaruAwal(
                                                        market.lokasi_market
                                                    )}
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

export default MarketList;

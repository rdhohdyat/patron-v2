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
    const markets = data.data;

    console.log(markets)
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
                        {markets.map((market) => (
                            <CarouselItem
                                key={market.id}
                                className="basis-1/2  lg:basis-1/5 py-4"
                            >
                                <Link
                                    href={route("shop.store_detail", market.id)}
                                >
                                    <Card className="cursor-pointer">
                                        <img
                                            src={market.image}
                                            className="rounded-t-lg w-[250px] h-[170px] sm:h-[200px] object-cover"
                                            alt={market.nama_market}
                                        />
                                        <div className="p-3">
                                            <div className="flex items-center gap-1 mt-2">
                                                <Store size="16" />
                                                <h1 className="w-[180px] truncate ...">
                                                    {market.nama_market}
                                                </h1>
                                            </div>
                                            <p className="text-sm w-[200px] truncate ...">
                                                {market.lokasi_market}
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

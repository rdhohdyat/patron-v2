import ShopLayout from "@/Layouts/ShopLayout";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import { Button } from "@/Components/ui/button";
import { MapPin, Store } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Apple,
    Beef,
    Fish,
    Egg,
    LeafyGreen,
    ChefHat,
    Wheat,
    Coffee,
    Hop,
    Cookie,
    HandPlatter,
    Croissant,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import { Card, CardContent } from "@/Components/ui/card";
import { formatRupiah } from "@/lib/convert";

export default function index({ auth, data }) {
    const category = [
        { name: "Sayur", icon: <LeafyGreen /> },
        { name: "Buah", icon: <Apple /> },
        { name: "Daging", icon: <Beef /> },
        { name: "Ikan", icon: <Fish /> },
        { name: "Bumbu Dapur ", icon: <ChefHat /> },
        { name: "Beras", icon: <Wheat /> },
        { name: "Telur", icon: <Egg /> },
        { name: "Minuman", icon: <Coffee /> },
        { name: "Rempah-rempah", icon: <Hop /> },
        { name: "Produk olahan", icon: <HandPlatter /> },
        { name: "Makanan ringan", icon: <Cookie /> },
        { name: "Roti dan kue", icon: <Croissant /> },
    ];

    const products = data.data;

    return (
        <ShopLayout user={auth.user}>
            <div className="w-full">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className=" bg-white border border-gray-100 rounded-xl p-3 flex items-center text-sm justify-between text-gray-600 hover:bg-white hover:border-gray-300">
                            <div className="flex items-center gap-1">
                                <MapPin />
                                <p className="w-[200px] sm:w-full truncate">
                                    Umban sari, Rumbai, Pekanbaru
                                </p>
                            </div>
                            <p>Pilih Lokasi</p>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Lokasi</DialogTitle>
                            <DialogDescription>
                                <div className="h-[300px]"></div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type="submit">Pilih Lokasi</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <div
                    className="sm:p-12 p-6 z-10 sm:bg-none bg-cover  bg-center rounded-xl mt-6 bg"
                    style={{ backgroundImage: "url(/sayur.jpg)" }}
                >
                    <div>
                        <h1 className="font-semibold text-lg sm:text-2xl  text-white sm:w-[600px]">
                            Temukan Pasar Terdekat dan Berbagai Kebutuhan Rumah
                            Tangga Anda dengan Patron
                        </h1>
                        <p className="text-white mt-3 sm:text-lg">
                            Jelajahi pasar terdekat dengan Anda dan mulai
                            berbelanja.
                        </p>
                    </div>
                </div>
                {/* categori */}
                <div className="flex justify-between items-center mt-3">
                    <h1 className="font-bold text-lg sm:text-xl text-gray-600">
                        Kategori
                    </h1>
                    <Button variant="link" className="sm:text-md text-emerald-500">
                        Lihat semua
                    </Button>
                </div>
                <div>
                    <Carousel>
                        <CarouselContent>
                            {category.map((item, index) => (
                                <CarouselItem
                                    className="basis-1/6 text-xs sm:text-base sm:basis-1/6 py-2"
                                    key={index}
                                >
                                    <Link
                                        href={route(
                                            "shop.category",
                                            item.name.toLocaleLowerCase()
                                        )}
                                        className="text-center"
                                    >
                                        <div className="bg-white shadow border rounded-xl flex items-center justify-center p-2 gap-2">
                                            <div className="text-emerald-500">
                                                {item.icon}
                                            </div>
                                            <div className="hidden sm:block text-gray-500 font-medium truncate ...">
                                                {item.name}
                                            </div>
                                        </div>
                                        <h1 className="mx-auto sm:hidden w-10 truncate ...">
                                            {item.name}
                                        </h1>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                <div className="flex justify-between items-center mt-3">
                    <h1 className="font-bold text-lg sm:text-xl text-gray-600">
                        Produk terlaris
                    </h1>
                    <Button variant="link" className="sm:text-md text-emerald-500">
                        Lihat semua
                    </Button>
                </div>

                {/* produk terlaris */}
                <div className="relative rounded-md">
                    <Carousel className="rounded-md">
                        <CarouselContent>
                            {products.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="basis-1/2  lg:basis-1/5 py-2"
                                >
                                    <Link
                                        href={route("shop.detail", product.id)}
                                    >
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
                                                <p className="font-bold text-md">
                                                    {formatRupiah(
                                                        product.price
                                                    )}
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

                <div className="flex justify-between items-center mt-8 mb-2">
                    <h1 className="font-bold text-lg sm:text-xl text-gray-600">
                        Pasar terdekat
                    </h1>
                    <Button variant="link" className="sm:text-md text-emerald-500">
                        Lihat semua
                    </Button>
                </div>

                <div>
                    <Carousel>
                        <CarouselContent>
                            {[...Array(10)].map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-1/2 sm:basis-1/5"
                                >
                                    <div>
                                        <img
                                            src="/pasar.jpg"
                                            className="rounded-lg w-[250px] h-[170px] sm:h-[200px] sm:object-cover"
                                            alt=""
                                        />
                                        <div className="mt-1">
                                            <h1 className="font-semibold">
                                                Pasar Rumbai
                                            </h1>
                                            <p className="text-sm">
                                                Jl. Sekolah, Kec. Rumbai,
                                                Pekanbaru
                                            </p>
                                            <div className="text-sm flex items-center gap-1 mt-2">
                                                <MapPin size="16" />
                                                <p>2 Km</p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden sm:flex absolute left-0 top-[40%] transform -translate-y-1/2" />
                        <CarouselNext className="hidden sm:flex absolute right-0 top-[40%] transform -translate-y-1/2" />
                    </Carousel>
                </div>
            </div>
        </ShopLayout>
    );
}

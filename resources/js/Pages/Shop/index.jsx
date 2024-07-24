import ShopLayout from "@/Layouts/ShopLayout";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import { Button } from "@/Components/ui/button";
import { MapPin, ShoppingBag, Store } from "lucide-react";
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
import { Link, useForm } from "@inertiajs/react";
import { formatRupiah } from "@/lib/convert";
import { Card } from "@/Components/ui/card";
import UpdateAddress from "../Profile/UpdateAddres";
import StoreList from "./StoreList";

export default function Index({ auth, data, markets , stores}) {
    const category = [
        { name: "Sayur", icon: <LeafyGreen /> },
        { name: "Buah", icon: <Apple /> },
        { name: "Daging", icon: <Beef /> },
        { name: "Ikan", icon: <Fish /> },
        { name: "Bumbu Dapur", icon: <ChefHat /> },
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
                        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center text-sm justify-between text-gray-600 hover:bg-white hover:border-gray-300">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <p className="w-[200px] sm:w-full truncate">
                                    {auth.user.alamat ||
                                        "Anda Belum Mengatur Lokasi"}
                                </p>
                            </div>
                            <p>Pilih Lokasi</p>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        {auth.user.alamat == null || auth.user.alamat.length == 0 ? (
                            <UpdateAddress></UpdateAddress>
                        ) : (
                            <div>
                                <h1 className="font-bold text-lg">
                                    Lokasi Anda
                                </h1>
                                <div className="text-md">
                                    {auth.user.alamat}
                                </div>

                                <Link href={route("profile.edit")}>
                                    <Button className="mt-3">
                                        Perbarui Lokasi
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                <div
                    className="sm:p-12 p-6 z-10 sm:bg-none bg-center rounded-xl mt-6"
                    style={{ backgroundImage: "url(/sayurr.jpg)" }}
                >
                    <div>
                        <h1 className="font-semibold text-lg sm:text-2xl text-white sm:w-[600px]">
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
                    <Link
                        href={route("shop.search")}
                        variant="link"
                        className="sm:text-md text-green-500 underline"
                    >
                        Lihat semua
                    </Link>
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
                                        <Card className="border shadow-none border-green-600 bg-white rounded-xl flex items-center justify-center p-2 gap-2">
                                            <div className="text-green-600">
                                                {item.icon}
                                            </div>
                                            <div className="hidden sm:block text-green-600 font-semibold truncate ...">
                                                {item.name}
                                            </div>
                                        </Card>
                                        <h1 className="mx-auto sm:hidden w-10 font-semibold text-gray-500 truncate ...">
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
                    <Link
                        href={route("shop.search")}
                        variant="link"
                        className="sm:text-md text-green-500 underline"
                    >
                        Lihat semua
                    </Link>
                </div>

                {/* produk terlaris */}
                <div className="relative rounded-md">
                    <Carousel className="rounded-md">
                        <CarouselContent>
                            {products.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="basis-1/2 lg:basis-1/5 py-4"
                                >
                                    <Link
                                        href={route("shop.detail", product.id)}
                                    >
                                        <Card className="cursor-pointer">
                                            <img
                                                src={product.image}
                                                className="rounded-t-lg w-full h-[160px] sm:h-[200px] object-cover"
                                                alt={product.name}
                                            />
                                            <div className="p-3">
                                                <h1 className="w-[130px] sm:w-[170px] truncate ...">
                                                    {product.name}
                                                </h1>
                                                <p className="font-bold text-md">
                                                    {formatRupiah(
                                                        product.price
                                                    )}
                                                </p>
                                                <p className="w-full text-sm sm:w-[180px] truncate ...">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center gap-1 mt-2">
                                                    <ShoppingBag size="16" />
                                                    <p className="text-sm">
                                                        {product.category}
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

                <div className="flex justify-between items-center mb-2">
                    <h1 className="font-bold text-lg sm:text-xl text-gray-600">
                        Daftar Pasar
                    </h1>
                    <Link
                        href={route("shop.search")}
                        variant="link"
                        className="sm:text-md text-green-500 underline"
                    >
                        Lihat semua
                    </Link>
                </div>

                <div>
                    <Carousel>
                        <CarouselContent>
                            {markets.data.map((market) => (
                                <CarouselItem
                                    key={market.id}
                                    className="basis-1/2 sm:basis-1/5 py-4"
                                >
                                    <Link
                                        href={route("shop.market", market.id)}
                                    >
                                        <Card className="cursor-pointer">
                                            <img
                                                src={market.image}
                                                className="rounded-t-lg w-full h-[160px] sm:h-[200px] object-cover"
                                                alt=""
                                            />
                                            <div className="p-3">
                                                <h1 className="font-semibold">
                                                    {market.nama_market}
                                                </h1>
                                                <p className="text-sm sm:w-[180px] truncate ...">
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

                <StoreList data={stores}></StoreList>
            </div>
        </ShopLayout>
    );
}

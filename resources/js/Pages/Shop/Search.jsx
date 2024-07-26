import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/Components/ui/tabs";
import { formatRupiah } from "@/lib/convert";
import { Separator } from "@/Components/ui/separator";
import { Store, ShoppingBasket, MapPinned, Search } from "lucide-react";
import PaginationComponent from "@/Components/Pagination";
import ProductNotFound from "@/Components/ProductNotFound";
import StoreNotFound from "@/Components/StoreNotFound";
import MarketNotFound from "@/Components/MarketNotFound";

export default function Searching({
    auth,
    product: dataProduct,
    stores,
    markets,
    keyword,
}) {
    const products = dataProduct.data;
    console.log(products);
    const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
    const [filterProducts, setFilterProducts] = useState(products);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        if (category == "Semua Kategori") {
            setFilterProducts(products);
        } else {
            setFilterProducts(
                products.filter((product) => product.category == category)
            );

            console.log(filterProducts);
        }
    };

    const categoryList = [
        "Semua Kategori",
        "Sayur",
        "Buah",
        "Daging",
        "Ikan",
        "Bumbu Dapur",
        "Beras",
        "Telur",
        "Minuman",
        "Rempah-rempah",
        "Produk olahan",
        "Makanan ringan",
        "Roti dan kue",
    ];

    return (
        <ShopLayout user={auth.user}>
            <Breadcrumb className="mb-4 font-medium text-lg">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>Pencarian</BreadcrumbLink>
                    </BreadcrumbItem>
                
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">{keyword}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <form action="/shop/search">
                    <div className="flex border border-gray-300 h-10 mb-3 sm:hidden rounded-xl px-4 items-center gap-2">
                        <Search className="text-gray-600 h-5 w-5"></Search>
                        <input
                            type="search"
                            className="w-full focus:outline-none text-sm placeholder:text-gray-600"
                            placeholder={
                                keyword || "Cari Produk, Lapak dan Pasar"
                            }
                            name="search"
                        />
                    </div>
                </form>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-2 hidden lg:block">
                        <Card className="p-4 border rounded-lg shadow-sm">
                            <h1 className="font-bold text-lg text-green-600 mb-2">
                                Kategori
                            </h1>
                            <Separator />
                            <div className="mt-2 flex flex-col text-sm">
                                {categoryList.map((c) => (
                                    <div
                                        key={c}
                                        className={`hover:bg-gray-100 px-4 py-2 cursor-pointer rounded-md transition-colors ${
                                            selectedCategory === c
                                                ? "bg-gray-200"
                                                : ""
                                        }`}
                                        onClick={() => handleCategoryClick(c)}
                                    >
                                        {c}
                                    </div>
                                ))}
                            </div>
                            <CardFooter></CardFooter>
                        </Card>
                    </div>

                    <div className="lg:col-span-10">
                        <div className="lg:hidden mb-4 text-sm">
                            <div className="relative">
                                <button
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md w-full text-left flex items-center justify-between"
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                "mobile-category-menu"
                                            )
                                            .classList.toggle("hidden")
                                    }
                                >
                                    <span>Kategori: {selectedCategory}</span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </button>
                                <div
                                    id="mobile-category-menu"
                                    className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 hidden"
                                >
                                    <div className="p-2">
                                        {categoryList.map((c) => (
                                            <div
                                                key={c}
                                                className={`hover:bg-gray-100 px-4 py-2 cursor-pointer rounded-md transition-colors ${
                                                    selectedCategory === c
                                                        ? "bg-gray-200"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    handleCategoryClick(c);
                                                    document
                                                        .getElementById(
                                                            "mobile-category-menu"
                                                        )
                                                        .classList.add(
                                                            "hidden"
                                                        );
                                                }}
                                            >
                                                {c}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h1 className="font-semibold sm:text-xl mb-4">
                            {keyword
                                ? `Hasil Pencarian untuk kata kunci "${keyword}"`
                                : "Menampilkan semua Produk, Toko, dan Pasar"}
                        </h1>
                        <Tabs defaultValue="products" className="mb-4">
                            <TabsList className="flex flex-wrap gap-2 border-b rounded-none border-gray-200">
                                <TabsTrigger
                                    value="products"
                                    className="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    Produk
                                    <ShoppingBasket className="h-5 w-5" />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="stores"
                                    className="flex gap-2 items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    Toko
                                    <Store className="h-5 w-5" />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="markets"
                                    className="flex gap-2 items-center px-4 py-2  cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    Pasar
                                    <MapPinned className="h-5 w-5" />
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="products" className="mt-4">
                                {filterProducts.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {filterProducts.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={route(
                                                    "shop.detail",
                                                    product.id
                                                )}
                                            >
                                                <Card className="cursor-pointer border rounded-lg shadow-md">
                                                    <img
                                                        src={product.image}
                                                        className="rounded-t-lg w-full h-[160px] sm:h-[200px] object-cover"
                                                        alt={product.name}
                                                    />
                                                    <CardContent className="p-3">
                                                        <h1 className="text-base font-semibold truncate">
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
                                                                {
                                                                    product.category
                                                                }
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        <ProductNotFound className="mx-auto" />
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="stores" className="mt-4">
                                {stores.data.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {stores.data.map((store) => (
                                            <Link
                                                key={store.id}
                                                href={route(
                                                    "shop.store_detail",
                                                    store.id
                                                )}
                                            >
                                                <Card className="cursor-pointer border rounded-lg shadow-md">
                                                    <img
                                                        src={store.image}
                                                        className="rounded-t-lg w-full h-[160px]  sm:h-[200px] object-cover"
                                                        alt={store.nama_store}
                                                    />
                                                    <CardContent className="p-3">
                                                        <div className="flex items-center gap-1">
                                                            <Store size="16" />
                                                            <h1 className="text-base font-semibold truncate">
                                                                {
                                                                    store.nama_store
                                                                }
                                                            </h1>
                                                        </div>
                                                        <p className="text-sm truncate">
                                                            {store.lokasi_store}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        <StoreNotFound className="mx-auto" />
                                    </div>
                                )}
                                {stores.data.length > 10 && (
                                    <div className="mt-10">
                                        <PaginationComponent
                                            links={stores.meta.links}
                                        />
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="markets" className="mt-4">
                                {markets.data.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {markets.data.map((market) => (
                                            <Link
                                                key={market.id}
                                                href={route(
                                                    "shop.market",
                                                    market.id
                                                )}
                                            >
                                                <Card className="cursor-pointer border rounded-lg shadow-md">
                                                    <img
                                                        src={market.image}
                                                        className="rounded-t-lg w-full h-[160px] sm:h-[200px] object-cover"
                                                        alt=""
                                                    />
                                                    <CardContent className="p-3">
                                                        <h1 className="text-base font-semibold truncate">
                                                            {market.nama_market}
                                                        </h1>
                                                        <p className="text-sm truncate">
                                                            {
                                                                market.lokasi_market
                                                            }
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        <MarketNotFound className="mx-auto" />
                                    </div>
                                )}
                                {markets.data.length > 10 && (
                                    <div className="mt-10">
                                        <PaginationComponent
                                            links={markets.meta.links}
                                        />
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}

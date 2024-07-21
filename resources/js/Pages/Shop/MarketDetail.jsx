import React, { useState } from "react";
import ShopLayout from "@/Layouts/ShopLayout";
import { Button } from "@/Components/ui/button";
import { Store, ShoppingBasket } from "lucide-react";
import StoreList from "./StoreList";
import { Separator } from "@/Components/ui/separator";
import PaginationComponent from "@/Components/Pagination";
import ProductNotFound from "@/Components/ProductNotFound";
import StoreNotFound from "@/Components/StoreNotFound";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Head, Link } from "@inertiajs/react";
import { useToast } from "@/Components/ui/use-toast";
import { formatRupiah } from "@/lib/convert";
import { Card } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

export default function MarketDetail({ auth, data, products: dataProducts }) {
    const { toast } = useToast();
    const market = data.data;
    const products = dataProducts.data;

    const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
    const [filterProducts, setFilterProducts] = useState(products);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === "Semua Kategori") {
            setFilterProducts(products);
        } else {
            setFilterProducts(
                products.filter((product) => product.category === category)
            );
        }
    };

    const category = [
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

    console.log(data);

    return (
        <ShopLayout user={auth.user}>
            <Head title={`Detail ${market.nama_market}`} />
            <Breadcrumb className="mb-4 font-medium text-lg">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Pasar</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">
                            {market.nama_market}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="bg-white shadow-md rounded-lg p-5 mb-5">
                <div className="sm:flex gap-4 items-center">
                    <img
                        src={market.image}
                        className="rounded-lg w-full sm:w-80 h-48 object-cover"
                        alt=""
                    />
                    <div className="mt-4 sm:mt-0 sm:ml-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {market.nama_market}
                        </h1>
                        <h2 className="text-lg font-semibold text-gray-600">
                            {market.lokasi_market}
                        </h2>
                        <div className="flex items-center gap-2 mt-2 text-gray-500">
                            <Store className="h-5 w-5" />
                            {market.stores.length} Toko
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sidebar for categories on larger screens */}
                <div className="lg:col-span-2 hidden lg:block">
                    <Card className="bg-white shadow-md rounded-lg">
                        <h1 className="font-bold text-lg p-4 border-b border-gray-200 text-green-600">
                            Kategori
                        </h1>
                        <Separator />
                        <div className="mt-2 flex flex-col">
                            {category.map((c) => (
                                <div
                                    key={c}
                                    className={`hover:bg-gray-100 px-4 py-2 cursor-pointer ${
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
                    </Card>
                </div>

                {/* Collapsible Categories Menu for mobile screens */}
                <div className="lg:hidden mb-4">
                    <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md w-full text-left flex items-center justify-between"
                        onClick={() =>
                            document
                                .getElementById("mobile-category-menu")
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
                        className="absolute top-16 left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 hidden z-50"
                    >
                        <div className="p-2">
                            {category.map((c) => (
                                <div
                                    key={c}
                                    className={`hover:bg-gray-100 px-4 py-2 cursor-pointer ${
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
                                            .classList.add("hidden");
                                    }}
                                >
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-10">
                    <Tabs defaultValue="produk" className="mb-4">
                        <TabsList className="flex gap-4 border-b border-gray-200">
                            <TabsTrigger
                                value="produk"
                                className="p-2 font-semibold text-gray-600 hover:text-green-600"
                            >
                                Produk
                                <ShoppingBasket className="inline h-5 w-5 ml-1" />
                            </TabsTrigger>
                            <TabsTrigger
                                value="toko"
                                className="p-2 font-semibold text-gray-600 hover:text-green-600"
                            >
                                Toko
                                <Store className="inline h-5 w-5 ml-1" />
                            </TabsTrigger>
                        </TabsList>
                        <Separator />
                        <TabsContent value="produk" className="mt-4">
                            {filterProducts.length > 0 ? (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {filterProducts.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={route(
                                                "shop.detail",
                                                product.id
                                            )}
                                        >
                                            <Card className="cursor-pointer bg-white shadow-md rounded-lg">
                                                <img
                                                    src={product.image}
                                                    className="rounded-t-lg w-full h-48 object-cover"
                                                    alt={product.name}
                                                />
                                                <div className="p-3">
                                                    <h1 className="text-lg font-semibold truncate">
                                                        {product.name}
                                                    </h1>
                                                    <p className="font-bold text-md text-gray-700">
                                                        {formatRupiah(
                                                            product.price
                                                        )}
                                                    </p>
                                                    <div className="flex items-center gap-1 mt-2 text-gray-500">
                                                        <Store size="16" />
                                                        <p className="text-sm">
                                                            {product.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <ProductNotFound className="mx-auto" />
                            )}

                            {filterProducts.length > 10 && (
                                <div className="mt-8">
                                    <PaginationComponent
                                        links={dataProducts.meta.links}
                                    />
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="toko" className="mt-4">
                            {market.stores.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {market.stores.map((store) => (
                                        <Link
                                            key={store.id}
                                            href={route(
                                                "shop.store_detail",
                                                store.id
                                            )}
                                        >
                                            <Card className="cursor-pointer bg-white shadow-md rounded-lg">
                                                <img
                                                    src={store.image}
                                                    className="rounded-t-lg w-full h-48 object-cover"
                                                    alt={store.nama_store}
                                                />
                                                <div className="p-3">
                                                    <h1 className="text-lg font-semibold truncate">
                                                        {store.nama_store}
                                                    </h1>
                                                    <p className="text-sm text-gray-600">
                                                        {store.lokasi_store}
                                                    </p>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <StoreNotFound />
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </ShopLayout>
    );
}

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
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/Components/ui/tabs";
import { formatRupiah } from "@/lib/convert";
import { Separator } from "@/Components/ui/separator";
import { Store, ShoppingBasket } from "lucide-react";
import PaginationComponent from "@/Components/Pagination";
import ProductNotFound from "@/Components/ProductNotFound";
import StoreNotFound from "@/Components/StoreNotFound";
import MarketNotFound from "@/Components/MarketNotFound";

export default function Search({
    auth,
    product: dataProduct,
    stores,
    markets,
    keyword,
}) {
    const products = dataProduct.data;
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
            <div className="">
                <div className="sm:grid grid-cols-12 mt-3 gap-6">
                    <Card className="col-span-2 sm:block hidden h-[500px]">
                        <h1 className="font-bold p-2 px-6 text-green-600">
                            Kategori
                        </h1>

                        <Separator></Separator>
                        <div className="mt-2 flex flex-col">
                            {categoryList.map((c) => (
                                <div
                                    key={c}
                                    className={`hover:bg-gray-100 px-6 py-1 cursor-pointer ${
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
                    <div className="col-span-10">
                        {keyword ? (
                            <h1 className="font-semibold text-lg mb-4">
                                Hasil Pencarian untuk kata kunci {keyword}
                            </h1>
                        ) : (
                            <h1 className="font-semibold text-lg mb-4">
                                Menampilkan semua Produk, Toko, dan Pasar
                            </h1>
                        )}
                        <Tabs defaultValue="products" className="mb-4">
                            <TabsList className="w-full sm:w-[500px]">
                                <TabsTrigger
                                    value="products"
                                    className="w-full flex gap-2 items-center"
                                >
                                    Produk
                                    <ShoppingBasket className="h-5 w-5" />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="stores"
                                    className="w-full flex gap-2 items-center"
                                >
                                    Toko
                                    <Store className="h-5 w-5" />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="markets"
                                    className="w-full flex gap-2 items-center"
                                >
                                    Pasar
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="products" className="mt-4">
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
                                                <Card className="cursor-pointer">
                                                    <img
                                                        src={product.image}
                                                        className="rounded-t-lg w-full h-[170px] sm:h-[200px] object-cover"
                                                        alt={product.name}
                                                    />
                                                    <div className="p-3">
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
                                                                {
                                                                    product.category
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        <ProductNotFound className="mx-auto" />
                                    </div>
                                )}

                                {filterProducts.length > 10 ? (
                                    <div className="mt-10">
                                        <PaginationComponent
                                            links={dataProduct.meta.links}
                                        />
                                    </div>
                                ) : null}
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
                                                <Card className="cursor-pointer">
                                                    <img
                                                        src={store.image}
                                                        className="rounded-t-lg w-[250px] h-[170px] sm:h-[200px] object-cover"
                                                        alt={store.nama_store}
                                                    />
                                                    <div className="p-3">
                                                        <div className="flex items-center gap-1 mt-2">
                                                            <Store size="16" />
                                                            <h1 className="w-[180px] truncate ...">
                                                                {
                                                                    store.nama_store
                                                                }
                                                            </h1>
                                                        </div>
                                                        <p className="text-sm">
                                                            {store.lokasi_store}
                                                        </p>
                                                    </div>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        <StoreNotFound className="mx-auto" />
                                    </div>
                                )}

                                {stores.data.length > 10 ? (
                                    <div className="mt-10">
                                        <PaginationComponent
                                            links={stores.meta.links}
                                        />
                                    </div>
                                ) : null}
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
                                                <Card className="cursor-pointer">
                                                    <img
                                                        src={market.image}
                                                        className="rounded-t-lg w-full h-[170px] sm:h-[200px] object-cover"
                                                        alt=""
                                                    />
                                                    <div className="p-3">
                                                        <h1 className="font-semibold">
                                                            {market.nama_market}
                                                        </h1>
                                                        <p className="text-sm w-[180px] truncate ...">
                                                            {
                                                                market.lokasi_market
                                                            }
                                                        </p>
                                                    </div>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        <MarketNotFound className="mx-auto" />
                                    </div>
                                )}
                                {markets.data.length > 10 ? (
                                    <div className="mt-10">
                                        <PaginationComponent
                                            links={markets.meta.links}
                                        />
                                    </div>
                                ) : null}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}

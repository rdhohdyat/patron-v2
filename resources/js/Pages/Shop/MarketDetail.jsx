import ShopLayout from "@/Layouts/ShopLayout";
import { Button } from "@/Components/ui/button";
import { Store, ShoppingBasket } from "lucide-react";
import StoreList from "./StoreList";
import { Separator } from "@/Components/ui/separator";
import PaginationComponent from "@/Components/Pagination";
import ProductNotFound from "@/Components/ProductNotFound";
import StoreNotFound from "@/Components/StoreNotFound";
import { useState } from "react";
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
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

export default function MarketDetail({ auth, data, products : dataProducts }) {
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

    return (
        <ShopLayout user={auth.user}>
            <Head title={`Detail ${market.nama_market}`}></Head>
            <Breadcrumb className="mb-2 font-medium text-xl">
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
            <div>
                <Card className="p-5">
                    <div className="sm:flex gap-3">
                        <img
                            src={market.image}
                            className="rounded w-full sm:w-[300px] h-[170px] sm:h-[200px] object-cover"
                            alt=""
                        />
                        <div className="mt-3 sm:mt-0">
                            <h1 className="uppercase text-lg sm:text-xl font-bold">
                                {market.nama_market}
                            </h1>
                            <h2 className="text-md font-semibold">
                                {market.lokasi_market}
                            </h2>
                            <div className="flex items-center gap-3">
                                <Store className="h-5 w-5"></Store>
                                {market.stores.length}
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="sm:grid grid-cols-12 mt-3 gap-3">
                    <Card className="col-span-2 sm:block hidden h-[500px]">
                        <h1 className="font-bold p-2 px-6 text-green-600">
                            Kategori
                        </h1>

                        <Separator></Separator>
                        <div className="mt-2 flex flex-col">
                            {category.map((c) => (
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
                    </Card>
                    <div className="col-span-10 ">
                        <Tabs defaultValue="produk">
                            <TabsList className="w-full sm:w-[400px] rounded-none">
                                <TabsTrigger
                                    value="produk"
                                    className="w-full flex gap-2 items-center"
                                >
                                    Produk
                                    <ShoppingBasket className="h-5 w-5" />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="toko"
                                    className="w-full flex gap-2 items-center"
                                >
                                    Toko
                                    <Store className="h-5 w-5" />
                                </TabsTrigger>
                            </TabsList>
                            <Separator></Separator>
                            <TabsContent value="produk">
                                {filterProducts.length > 0 ? (
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-3">
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
                                            links={dataProducts.meta.links}
                                        />
                                    </div>
                                ) : null}
                            </TabsContent>
                            <TabsContent value="toko">
                                {market.stores.length !== 0 ? (
                                    <div className="p-3 grid grid-cols-4 gap-3">
                                        {market.stores.map((store) => (
                                            <Link
                                                href={route(
                                                    "shop.store_detail",
                                                    store.id
                                                )}
                                            >
                                                <Card className="p-3">
                                                    <img
                                                        src={store.image}
                                                        className="rounded w-full sm:w-[200px] h-[170px] sm:h-[200px] object-cover"
                                                        alt=""
                                                    />
                                                    <h1>{store.nama_store}</h1>
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
            </div>

            {/* <div className="mt-3">
                <h1 className="font-bold text-lg sm:text-xl mb-2 text-gray-600">
                    Produk Pada Toko Ini
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
                    {otherProducts.data.map((product) => (
                        <Link href={route("shop.detail", product.id)}>
                            <Card className="cursor-pointer">
                                <img
                                    src={product.image}
                                    className="rounded-t-lg w-[250px] h-[170px] sm:h-[200px] object-cover"
                                    alt={product.name}
                                />
                                <div className="p-3">
                                    <h1 className="w-[180px] font-semibold truncate ...">
                                        {product.name}
                                    </h1>
                                    <p className="font-bold  text-md">
                                        {formatRupiah(product.price)}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <p className="text-sm">
                                            {product.category}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
                <PaginationComponent
                    links={otherProducts.meta.links}
                ></PaginationComponent>
            </div> */}
        </ShopLayout>
    );
}

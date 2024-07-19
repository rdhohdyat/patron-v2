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
import useCartStore from "@/lib/zustand/cartStore";
import { useToast } from "@/Components/ui/use-toast";
import ProductList from "./ProductList";
import { formatRupiah } from "@/lib/convert";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

export default function ProductDetail({ auth, data }) {
    const { toast } = useToast();

    const market = data.data;

    console.log(market);

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

                <div className="sm:grid grid-cols-8 mt-3 gap-3">
                    <Card className="col-span-2 sm:block hidden ">
                        <CardHeader>
                            <CardTitle className="font-bold text-green-600">
                                Kategori
                            </CardTitle>
                        </CardHeader>
                        <Separator></Separator>
                        <div className="mt-2 flex flex-col">
                            {category.map((c) => (
                                <div className="hover:bg-gray-100 px-6 py-1">
                                    {c}
                                </div>
                            ))}
                        </div>
                        <CardFooter></CardFooter>
                    </Card>
                    <Card className="col-span-6 rounded-none rounded-b-lg">
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
                                <div className="p-3">produk</div>
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
                    </Card>
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

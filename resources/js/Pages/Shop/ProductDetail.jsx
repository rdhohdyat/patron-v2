import React, { useState } from "react";
import ShopLayout from "@/Layouts/ShopLayout";
import { Button } from "@/Components/ui/button";
import StoreList from "./StoreList";
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
import { MessageSquareText } from "lucide-react";
import { Card } from "@/Components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import MarketList from "./MarketList";

export default function ProductDetail({
    auth,
    data,
    products: otherProducts,
    stores: otherStores,
    markets,
}) {
    const { toast } = useToast();

    const product = data.data;
    const { addToCart, calculateTotal } = useCartStore();

    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (product) => {
        addToCart({ ...product, qty: quantity });
        toast({
            title: "Berhasil menambahkan ke keranjang",
            variant: "default",
        });

        calculateTotal();
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (value > 0 && value <= product.stock) {
            setQuantity(value);
        }
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const subtotal = product.price * quantity;

    return (
        <ShopLayout user={auth.user}>
            <Head title={`Detail ${product.name}`}></Head>
            <Breadcrumb className="mb-2 font-medium text-xl">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Detail</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">
                            {product.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="sm:flex justify-between">
                <div className="sm:flex gap-4">
                    <div>
                        <img
                            src={product.image}
                            className="w-full object-cover rounded sm:max-w-[350px] h-[350px]"
                            alt={product.name}
                        />
                    </div>
                    <div className="mt-2 sm:mt-0 sm:w-[300px]">
                        <h1 className="text-xl font-semibold flex-wrap">
                            {product.name}
                        </h1>
                        <p className="uppercase font-bold text-gray-600 mt-2 sm:mt-0">
                            {product.category}
                        </p>
                        <h1 className="font-bold text-3xl mt-2">
                            {formatRupiah(product.price)}
                        </h1>
                        <p className="mt-2 font-semibold">Detail : </p>
                        <p className="text-wrap text-justify sm:w-[400px] truncate ... sm:h-[120px]">
                            {product.description}
                        </p>

                        <Card className="flex items-start justify-between  mt-2  font-medium  p-3 py-5  sm:w-[400px]">
                            <div className="flex gap-2 items-center">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage
                                        src={product.store.image}
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="font-semibold">
                                        {product.store.nama_store}
                                    </h1>
                                    <p className="text-sm font-normal">
                                        {product.store.nama_store}
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={route(
                                    "shop.store_detail",
                                    product.store.id
                                )}
                                className="text-sm underline text-green-600"
                            >
                                Lihat Toko
                            </Link>
                        </Card>
                    </div>
                </div>
                <div>
                    <Card className="fixed rounded-none sm:static  bottom-0 z-10 left-0 border right-0 px-5 pb-5 sm:rounded-lg">
                        <div>
                            <h1 className="font-semibold text-lg hidden sm:block text-center">
                                Atur Jumlah
                            </h1>
                            <div className="flex justify-between items-center mt-5">
                                <div className="flex items-center gap-2">
                                    <button
                                        className="px-3 py-1 border rounded bg-gray-200 active:scale-95 transition-all ease-in-out"
                                        onClick={decreaseQuantity}
                                    >
                                        -
                                    </button>
                                    <input
                                       
                                        id="quantity"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        max={product.stock}
                                        className="border rounded w-10 h-10 text-xl text-center sm:h-14 sm:w-14"
                                    />
                                    <button
                                        className="px-3 py-1 border rounded bg-gray-200 active:scale-95 transition-all ease-in-out"
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="block sm:mt-3">
                                    Stok Total :{" "}
                                    <span className="font-bold">
                                        {product.stock}
                                    </span>
                                </div>
                            </div>
                            <h1 className="flex justify-between  items-center mt-2 sm:mt-4">
                                <div>Substotal : </div>

                                <div className="font-bold text-xl">
                                    {formatRupiah(subtotal)}
                                </div>
                            </h1>
                        </div>
                        <div className="sm:block flex gap-2">
                            <Button
                                variant="outline"
                                className="sm:w-full mt-3 text-green-500 hover:bg-green-50 hover:text-green-600 border-green-600"
                            >
                                <div className="hidden sm:block">
                                    Hubungi Penjual
                                </div>
                                <MessageSquareText className="sm:hidden" />
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full mt-3 text-green-500 hover:bg-green-50 hover:text-green-600 border-green-600"
                            >
                                Beli Langsung
                            </Button>
                            <Button
                                className="w-full mt-3 sm:w-[300px] block"
                                onClick={() => handleAddToCart(product)}
                            >
                                Tambah Keranjang
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
            <ProductList data={otherProducts}></ProductList>
            <StoreList data={otherStores}></StoreList>
            <MarketList data={markets} />
        </ShopLayout>
    );
}

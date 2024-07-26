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
import { Head, Link, router } from "@inertiajs/react";
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

    const chat = () => {
        const phoneNumber = product.store.user.no_hp;
        const whatsappURL = `https://wa.me/${phoneNumber}`;
        window.open(whatsappURL, "_blank");
    };

    const handleSubmit = (product_id) => {
        router.post(
            route("order.store", product_id),
            {
                store_id: product.store.id,
                product_id: product_id,
                jumlah_barang: quantity,
                total_harga: subtotal,
            },
            toast({
                title: "Berhasil Membuat Order",
                variant: "default",
            }),
            handleToWhatsapp()
        );
    };

    const handleToWhatsapp = () => {
        const message =
            `*Halo! ${product.store.nama_store}*\n\n` +
            `Saya ingin memesan produk berikut:\n\n` +
            `*Nama Produk*: ${product.name}\n` +
            `*Jumlah*: ${quantity}\n` +
            `*Total Harga*: ${formatRupiah(subtotal)}\n\n` +
            `*Alamat Pengiriman*: ${auth.user.alamat}\n\n` + // Menambahkan alamat pengiriman
            `Mohon konfirmasi pesanan ini. Terima kasih!\n\n` +
            `Salam,\n${auth.user.name}`;

        const phoneNumber = product.store.user.no_hp;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, "_blank");
    };

    const subtotal = product.price * quantity;

    return (
        <ShopLayout user={auth.user}>
            <Head title={`Detail ${product.name}`}></Head>
            <Breadcrumb className="mb-4 font-medium text-lg">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>Detail</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>{product.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="sm:flex sm:gap-6 justify-between">
                <div>
                    <div className="sm:flex sm:gap-6">
                        <div className="flex-shrink-0">
                            <img
                                src={product.image}
                                className="w-full object-cover rounded-lg shadow-lg sm:w-[350px] h-[350px]"
                                alt={product.name}
                            />
                        </div>
                        <div className="mt-4 sm:mt-0 sm:w-[300px]">
                            <h1 className="text-2xl font-bold">
                                {product.name}
                            </h1>
                            <p className="uppercase font-semibold text-gray-700 mt-2">
                                {product.category}
                            </p>
                            <h2 className="text-4xl font-bold mt-2">
                                {formatRupiah(product.price)}
                            </h2>
                            <p className="mt-2 font-semibold text-gray-800">
                                Detail:
                            </p>
                            <p className="mt-2 text-gray-600 lg:w-[400px] text-justify sm:h-[120px]">
                                {product.description}
                            </p>
                        </div>
                    </div>
                    <Card className="mt-4 p-4 shadow-md w-[350px]">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-14 h-14">
                                <AvatarImage
                                    src={product.store.image}
                                    alt={product.store.nama_store}
                                />
                                <AvatarFallback>ST</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {product.store.nama_store}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {product.store.nama_store}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route("shop.store_detail", product.store.id)}
                            className="text-sm text-green-600 underline mt-4"
                        >
                            Lihat Toko
                        </Link>
                    </Card>
                </div>

                <div>
                    <Card className="fixed rounded-none sm:static  bottom-0 z-10 left-0 border right-0 px-5 pb-5 sm:rounded-lg">
                        <div className="mt-5">
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
                        <div className="sm:block flex gap-1 justify-center px-2">
                            <Button
                                variant="outline"
                                onClick={() => chat()}
                                className="sm:w-full mt-3 text-green-500 hover:bg-green-50 hover:text-green-600 border-green-600"
                            >
                                <div className="hidden sm:block">
                                    Hubungi Penjual
                                </div>
                                <MessageSquareText className="sm:hidden" />
                            </Button>
                            <Button
                                variant="outline"
                                className="mt-3 w-full text-green-500 hover:bg-green-50 hover:text-green-600 border-green-600"
                                onClick={() => handleSubmit(product.id)}
                            >
                                Beli Langsung
                            </Button>
                            <Button
                                className="mt-3 sm:w-full block"
                                onClick={() => handleAddToCart(product)}
                            >
                                Tambah Keranjang
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
            <ProductList data={otherProducts} />
            <StoreList data={otherStores} />
            <MarketList data={markets} />
        </ShopLayout>
    );
}

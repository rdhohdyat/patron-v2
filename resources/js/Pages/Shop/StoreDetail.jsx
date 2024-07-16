import ShopLayout from "@/Layouts/ShopLayout";
import { Button } from "@/Components/ui/button";
import { Store } from "lucide-react";
import StoreList from "./StoreList";
import { Separator } from "@/Components/ui/separator";
import PaginationComponent from "@/Components/Pagination";
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

export default function ProductDetail({
    auth,
    data,
    products: otherProducts,
    stores: otherStores,
}) {
    const { toast } = useToast();

    const store = data.data;
    console.log(otherProducts)
    console.log(store);
    const { addToCart, calculateTotal } = useCartStore();

    const handleAddToCart = (product) => {
        addToCart(product);
        toast({
            title: "Berhasil menambahkan ke keranjang",
            variant: "default",
        });

        calculateTotal();
    };

    return (
        <ShopLayout user={auth.user}>
            <Head title={`Detail ${store.nama_store}`}></Head>
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
                            {store.nama_store}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <Card className="p-3 py-5">
                    <div className="flex gap-3">
                        <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-xl mb-2">
                                {store.nama_store}
                            </h1>
                            <div className="flex gap-2 mb-2">
                                <div className="font-semibold bg-green-100 rounded py-1 px-2 text-sm">
                                    Pasar Rumbai
                                </div>
                                <div className="font-semibold bg-green-100 rounded p-1 text-sm">
                                    Bumbu Dapur
                                </div>
                            </div>
                            {/* <p className="text-gray-600 text-sm w-[500px]">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Optio excepturi fuga labore
                                repellat ipsum quibusdam pariatur nesciunt
                                mollitia, quis veniam.
                            </p> */}
                            <Button className="">
                                Chat Penjual
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-3">
                <h1 className="font-bold text-lg mb-2">Produk Pada Toko Ini</h1>
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
                <PaginationComponent links={otherProducts.meta.links}></PaginationComponent>
            </div>
        </ShopLayout>
    );
}

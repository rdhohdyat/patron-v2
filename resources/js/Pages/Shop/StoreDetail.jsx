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
                        <BreadcrumbLink
                            href={route("shop.market", store.market.id)}
                        >
                            {store.market.nama_market}
                        </BreadcrumbLink>
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
                <Card className="p-3">
                    <div className="sm:flex gap-3">
                        <img
                            src={store.image}
                            className="w-full sm:w-[200px] sm:h-[140px] sm:object-cover"
                            alt={store.name}
                        />
                        <div>
                            <h1 className="font-bold text-xl">
                                {store.nama_store}
                            </h1>
                            <h2 className="font-medium mb-2">{store.user.name}</h2>
                            <div className="text-sm">
                                {store.market.nama_market},{" "}
                                {store.market.lokasi_market}
                            </div>
                            <Button variant="outline" className="mt-2">Hubungi Penjual</Button>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-3">
                <h1 className="font-bold text-lg sm:text-xl mb-2 text-gray-600">
                    Produk Pada Toko Ini
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
                    {otherProducts.data.map((product) => (
                        <Link href={route("shop.detail", product.id)}>
                            <Card className="cursor-pointer">
                                <img
                                    src={product.image}
                                    className="rounded-t-lg w-full h-[170px] sm:h-[200px] object-cover"
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
            </div>
        </ShopLayout>
    );
}

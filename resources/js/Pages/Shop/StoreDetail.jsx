import ShopLayout from "@/Layouts/ShopLayout";
import { Button } from "@/Components/ui/button";
import { MapPin, ShoppingBag, Store } from "lucide-react";
import { Separator } from "@/Components/ui/separator";
import PaginationComponent from "@/Components/Pagination";
import MarketList from "./MarketList";
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
import ProductNotFound from "@/Components/ProductNotFound";
import StoreList from "./StoreList";

export default function ProductDetail({
    auth,
    data,
    products: otherProducts,
    stores: otherStores,
    markets,
}) {
    const { toast } = useToast();
    const store = data.data;

    const chat = () => {
        const phoneNumber = "6282287498239";
        const whatsappURL = `https://wa.me/${phoneNumber}`;
        window.open(whatsappURL, "_blank");
    };

    return (
        <ShopLayout user={auth.user}>
            <Head title={`Detail ${store.nama_store}`} />
            <Breadcrumb className="mb-4 font-medium text-lg">
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

            <Card className="p-5 mb-4 bg-white shadow-md rounded-lg">
                <div className="sm:flex gap-4 items-center">
                    <img
                        src={store.image}
                        className="w-full sm:w-60 sm:h-40 object-cover rounded-lg"
                        alt={store.nama_store}
                    />
                    <div className="mt-4 sm:mt-0 sm:ml-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {store.nama_store}
                        </h1>
                        <h2 className="text-lg font-semibold text-gray-600 mb-2">
                            {store.user.name}
                        </h2>
                        <div className="flex items-center gap-1">
                        <MapPin className="text-red-600 sm:h-5 sm:w-5 h-10 w-10"></MapPin>
                        <p className="text-sm text-gray-500">
                            {store.market.nama_market},{" "}
                            {store.market.lokasi_market}
                        </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => chat()}
                            className="mt-2"
                        >
                            Hubungi Penjual
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="mt-6">
                <h1 className="text-xl font-bold text-gray-600 mb-4">
                    Produk Pada Toko Ini
                </h1>
                {otherProducts.data.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                        {otherProducts.data.map((product) => (
                            <Link
                                key={product.id}
                                href={route("shop.detail", product.id)}
                            >
                                <Card className="cursor-pointer bg-white shadow-md rounded-lg">
                                    <img
                                        src={product.image}
                                        className="rounded-t-lg w-full h-40 object-cover"
                                        alt={product.name}
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold truncate">
                                            {product.name}
                                        </h2>
                                        <p className="text-md font-bold text-gray-800">
                                            {formatRupiah(product.price)}
                                        </p>
                                        <p className="w-full text-sm sm:w-[180px] truncate ...">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center gap-1 mt-2 text-gray-600">
                                            <ShoppingBag size="16" className="text-green-600" />
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
                    <ProductNotFound />
                )}

                {otherProducts.data.length > 0 && (
                    <div className="mt-6">
                        <PaginationComponent links={otherProducts.meta.links} />
                    </div>
                )}
            </div>

            <div className="mt-6">
                <StoreList data={otherStores}></StoreList>
            </div>

            <div className="mt-6">
                <MarketList data={markets}></MarketList>
            </div>
        </ShopLayout>
    );
}

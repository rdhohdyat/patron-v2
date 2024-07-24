import ShopLayout from "@/Layouts/ShopLayout";
import { Card, CardContent, CardTitle } from "@/Components/ui/card";
import { Head } from "@inertiajs/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { formatRupiah } from "@/lib/convert";
import { Link } from "@inertiajs/react";
import PaginationComponent from "@/Components/Pagination";

export default function CategoryList({ auth, data, category }) {
    const products = data.data;

    return (
        <ShopLayout user={auth.user}>
            <Head title={`Kategori ${category}`} />
            <Breadcrumb className="mb-4 font-medium text-xl">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>Kategori</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="capitalize">
                            {category}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div>
                {products === null || products.length === 0 ? (
                    <div className="w-full flex flex-col items-center">
                        <img
                            src="/search_notfound.png"
                            className="w-1/2 max-w-[400px] mb-4"
                            alt="Not found"
                        />
                        <h1 className="font-semibold text-xl text-gray-600 text-center">
                            {`Produk dan Lapak dengan kategori "${category}" tidak ditemukan`}
                        </h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map((product) => (
                            <Link
                                href={route("shop.detail", product.id)}
                                key={product.id}
                            >
                                <Card
                                    key={product.id}
                                    className="transition-transform transform hover:shadow-xl rounded-lg overflow-hidden"
                                >
                                    <CardContent className="p-0">
                                        <img
                                            src={product.image}
                                            className="w-full h-[200px] object-cover"
                                            alt={product.name}
                                        />
                                        <div className="p-4 bg-white">
                                            <CardTitle className="text-lg font-semibold mb-2 truncate">
                                                {product.name}
                                            </CardTitle>
                                            <p className="w-full text-sm sm:w-[180px] truncate ...">
                                                {product.description}
                                            </p>
                                            <p className="text-lg font-bold text-gray-800 mb-2">
                                                {formatRupiah(product.price)}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-10">
                <PaginationComponent links={data.meta.links} />
            </div>
        </ShopLayout>
    );
}

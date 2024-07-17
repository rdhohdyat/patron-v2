import ShopLayout from "@/Layouts/ShopLayout";
import { Card, CardContent, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/Components/ui/tabs";
import { Head } from "@inertiajs/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

export default function CategoryList({ auth, data, category }) {
    const products = data.data;
    return (
        <ShopLayout user={auth.user}>
            <Head title={`Kategori ${category}`}></Head>
            <Breadcrumb className="mb-2 font-medium text-xl">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Kategori</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">{category}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                {products === null || products.length == 0 ? (
                    <div className="w-full flex flex-col items-center">
                        <img
                            src="/search_notfound.png"
                            className="w-[400px]"
                            alt=""
                        />
                        <h1 className="font-bold text-gray-600 text-center">{`Produk dan Lapak dengan kategori ${category} tidak ditemukan`}</h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {products.map((product) => (
                            <Card key={product.id}>
                                <CardContent className="p-2">
                                    <img
                                        src={product.image}
                                        className="rounded-lg w-[250px] h-[100px] sm:h-[200px] object-cover"
                                        alt={product.name}
                                    />
                                    <CardTitle className="py-2">
                                        {product.name}
                                    </CardTitle>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}

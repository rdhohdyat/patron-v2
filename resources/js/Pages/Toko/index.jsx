import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { ShoppingCart, DollarSign, Package, User } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { formatRupiah } from "@/lib/convert";

export default function Index({
    auth,
    products,
    productCount,
    completedOrderItems,
    totalRevenue,
    totalOrderCount,
    completedOrders,
}) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard Toko" />
            <div className="flex flex-col gap-4 py-4">
                <div className="mx-auto px-3 sm:px-28 flex-1 auto-rows-max gap-4 w-full">
                    <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                                    <ShoppingCart className="h-5 w-5" />
                                    Total Penjualan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-xl font-bold">
                                {completedOrderItems} Items
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                                    <Package className="h-5 w-5" />
                                    Jumlah Produk
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-xl font-bold">
                                {productCount}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2 text-green-500">
                                    <DollarSign className="h-5 w-5" />
                                    Total Pendapatan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-xl font-bold">
                                {formatRupiah(totalRevenue)}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                                    <User className="h-5 w-5" />
                                    Jumlah Pesanan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-xl font-bold">
                                {totalOrderCount} Pesanan
                            </CardContent>
                        </Card>
                    </div>
                    <div className="sm:grid grid-cols-3 gap-4 mt-4">
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Penjualan Terakhir</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Gambar Produk</TableHead>
                                            <TableHead>Nama Produk</TableHead>
                                            <TableHead>Jumlah</TableHead>
                                            <TableHead>
                                                Total
                                            </TableHead>
                                           
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {completedOrders.data.map((order) => {
                                            const totalJumlahBarang =
                                                order.order_items.reduce(
                                                    (total, item) =>
                                                        total +
                                                        item.jumlah_barang,
                                                    0
                                                );

                                            return (
                                                <TableRow
                                                    key={order.id}
                                                    className="cursor-pointer hover:bg-gray-50"
                                                >
                                                    <TableCell>
                                                        <div className="flex space-x-2 overflow-x-auto">
                                                            {order.order_items.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            item
                                                                                .product
                                                                                .image
                                                                        }
                                                                        alt={
                                                                            item
                                                                                .product
                                                                                .name
                                                                        }
                                                                        className="w-20 h-20 object-cover rounded"
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="w-[200px]">
                                                        {order.order_items
                                                            .map(
                                                                (item) =>
                                                                    item.product
                                                                        .name
                                                            )
                                                            .join(", ")}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {totalJumlahBarang}
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {formatRupiah(
                                                            order.total_harga
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <button className="text-blue-500 hover:underline">
                                                            Detail
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 mt-4 sm:mt-0">
                            <CardHeader>
                                <CardTitle>Produk Terlaris</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Produk</TableHead>
                                            <TableHead>Jumlah</TableHead>
                                            <TableHead>Harga</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products.data.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    <img
                                                        src={product.image}
                                                        className="w-[50px]"
                                                        alt={product.name}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {product.name}
                                                </TableCell>
                                                <TableCell>
                                                    {formatRupiah(
                                                        product.price
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

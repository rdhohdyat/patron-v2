import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import PaginationComponent from "@/Components/Pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { useState, useEffect } from "react";
import { formatRupiah } from "@/lib/convert";
import {
    ShoppingCart,
    Package,
    MoreVertical,
    CheckCircle,
    XCircle,
    Clock,
    User,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function OrderList({
    auth,
    orders,
    processingCount,
    completedCount,
    pendingCount,
    cancelCount,
}) {
    const [selectedOrder, setSelectedOrder] = useState(orders.data[0]);

    const handleDetailClick = (order) => {
        setSelectedOrder(order);
    };
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    useEffect(() => {
        setSelectedOrder(orders.data[0]);
    }, [orders.data]);

    console.log(orders)

    const renderOrders = () => {
        return orders.data.map((order) => {
            const totalJumlahBarang = order.order_items.reduce(
                (total, item) => total + item.jumlah_barang,
                0
            );

            return (
                <TableRow
                    key={order.id}
                    className={`cursor-pointer ${
                        selectedOrder.id === order.id
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleDetailClick(order)}
                >
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell className="w-[200px]">
                        {order.order_items
                            .map((item) => item.product.name)
                            .join(", ")}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        {totalJumlahBarang}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Badge variant={order.status.toLowerCase()}>
                            {capitalizeFirstLetter(order.status)}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {formatRupiah(order.total_harga)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {order.tanggal_pemesanan}
                    </TableCell>
                    <TableCell>
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleDetailClick(order)}
                        >
                            Detail
                        </button>
                    </TableCell>
                </TableRow>
            );
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col gap-4 py-4">
                <div className="mx-auto px-3 sm:px-28 flex-1 gap-4 w-full">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-wrap gap-4">
                                <Card className="border shadow-md flex-1 min-h-[110px]">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-center gap-2 text-yellow-600">
                                            <Clock className="h-5 w-5" />
                                            Tertunda
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center text-xl font-bold">
                                        {pendingCount} Orders
                                    </CardContent>
                                </Card>
                                <Card className="border shadow-md flex-1 min-h-[110px]">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-center gap-2 text-blue-600">
                                            <Package className="h-5 w-5" />
                                            Proses
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center text-xl font-bold">
                                        {processingCount} Orders
                                    </CardContent>
                                </Card>
                                <Card className="border shadow-md flex-1 min-h-[110px]">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                                            <CheckCircle className="h-5 w-5" />
                                            Selesai
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center text-xl font-bold">
                                        {completedCount} Orders
                                    </CardContent>
                                </Card>
                                <Card className="border shadow-md flex-1 min-h-[80px]">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-center gap-2 text-red-600">
                                            <XCircle className="h-5 w-5" />
                                            Batal
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center text-xl font-bold">
                                        {cancelCount} Orders
                                    </CardContent>
                                </Card>
                            </div>
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle>Daftar Pesanan Anda</CardTitle>
                                    <p className="text-sm text-gray-600">
                                        Kelola pesanan anda disini
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">
                                                    Pelanggan
                                                </TableHead>
                                                <TableHead>Produk</TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Jumlah
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Status
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Total Harga
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Waktu Pemesanan
                                                </TableHead>
                                                <TableHead>Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>{renderOrders()}</TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="border-t pt-3">
                                    <PaginationComponent
                                        links={orders.meta.links}
                                    />
                                </CardFooter>
                            </Card>
                        </div>
                        <div>
                            <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
                                <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
                                    <h1 className="font-semibold text-xl text-gray-800">
                                        Detail Pemesanan
                                    </h1>
                                    <div className="flex justify-between items-center mt-2 text-gray-600">
                                        <h2 className="font-medium">
                                            Tanggal Pemesanan
                                        </h2>
                                        <p className="text-sm">
                                            {selectedOrder?.created_at ||
                                                "Pilih pesanan untuk melihat detail"}
                                        </p>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    {selectedOrder ? (
                                        <div>
                                            <div className="border-b pb-4">
                                                <h1 className="font-semibold text-lg text-gray-800">
                                                    Informasi Pesanan
                                                </h1>
                                                <Table className="mt-2">
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>
                                                                Produk
                                                            </TableHead>
                                                            <TableHead>
                                                                Jumlah
                                                            </TableHead>
                                                            <TableHead>
                                                                Harga
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {selectedOrder.order_items.map(
                                                            (item) => (
                                                                <TableRow
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    <TableCell>
                                                                        {
                                                                            item
                                                                                .product
                                                                                .name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-bold">
                                                                        x{" "}
                                                                        {
                                                                            item.jumlah_barang
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {formatRupiah(
                                                                            item
                                                                                .product
                                                                                .price
                                                                        )}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                                <div className="flex justify-between mt-2 font-semibold text-gray-800">
                                                    <div>Subtotal</div>
                                                    <div>
                                                        {formatRupiah(
                                                            selectedOrder.total_harga
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-b pb-4">
                                                <h1 className="font-semibold text-lg text-gray-800">
                                                    Informasi Pelanggan
                                                </h1>
                                                <div className="flex justify-between mt-2 text-gray-600">
                                                    <div>Pelanggan</div>
                                                    <div className="font-medium">
                                                        {
                                                            selectedOrder.user
                                                                .name
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex justify-between mt-2 text-gray-600">
                                                    <div>No Hp</div>
                                                    <div className="font-medium">
                                                        {selectedOrder.user
                                                            .phone ||
                                                            "08243243423"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-600">
                                            Pilih pesanan untuk melihat detail
                                        </p>
                                    )}
                                </CardContent>
                                <CardFooter className="border-t p-4 flex justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="text-gray-600 border-gray-600 hover:bg-gray-100 flex items-center gap-2"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                                <span>Edit Status</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Ubah Status
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Button
                                                    variant="outline"
                                                    className="text-blue-600 hover:bg-blue-50"
                                                >
                                                    Proses
                                                </Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Button
                                                    variant="outline"
                                                    className="text-green-600 hover:bg-green-50"
                                                >
                                                    Selesai
                                                </Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Button
                                                    variant="outline"
                                                    className="text-red-600 hover:bg-red-50"
                                                >
                                                    Tolak
                                                </Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

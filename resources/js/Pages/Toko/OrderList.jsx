import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
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
        console.log(selectedOrder);
    };

    useEffect(() => {
        setSelectedOrder(orders.data[0]);
    }, [orders.data]);

    const renderOrders = () => {
        return orders.data.map((order) => (
            <TableRow
                key={order.id}
                className={selectedOrder.id === order.id ? "bg-gray-100" : ""}
                onClick={() => handleDetailClick(order)}
            >
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{order.product.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                    {order.jumlah_barang}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    <Badge variant={order.status.toLowerCase()}>
                        {order.status}
                    </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {order.total_harga}
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
        ));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col gap-4 py-4">
                <div className="mx-auto px-3 sm:px-28 flex-1 auto-rows-max gap-4 w-full">
                    <div className="sm:grid grid-cols-12 gap-5">
                        <div className="grid col-span-9 gap-5">
                            <div className="grid sm:grid-cols-4 grid-cols-1 gap-4">
                                <Card className="h-[100px]">
                                    <CardHeader>
                                        <div>{pendingCount}</div>
                                    </CardHeader>
                                </Card>
                                <Card className="h-[100px]">
                                    <CardHeader>
                                        <div>{processingCount}</div>
                                    </CardHeader>
                                </Card>
                                <Card className="h-[100px]">
                                    <CardHeader>{completedCount}</CardHeader>
                                </Card>
                                <Card className="h-[100px]">
                                    <CardHeader>{cancelCount}</CardHeader>
                                </Card>
                            </div>
                            <Card>
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
                                                    Tanggal Pemesanan
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
                        <div className="col-span-3">
                            <Card>
                                <CardHeader>
                                    <h1 className=" font-semibold">
                                        Detail Pemesanan
                                    </h1>
                                    <div className="flex justify-between">
                                        <h2>Tanggal Pemesanan</h2>
                                        <p>{selectedOrder.tanggal_pemesanan}</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {selectedOrder ? (
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <h1 className=" font-semibold">
                                                    Informasi Pesanan
                                                </h1>
                                                <div className="flex justify-between ">
                                                    <div>
                                                    {selectedOrder.product.name}
                                                    </div>
                                                    {selectedOrder.total_harga}
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className=" font-semibold">
                                                    Informasi Pelanggan
                                                </h1>
                                                <div className="flex justify-between text-gray-600">
                                                    <div>Pelanggan</div>
                                                    <div>
                                                        {
                                                            selectedOrder.user
                                                                .name
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex justify-between  text-gray-600">
                                                    <div>No Hp</div>
                                                    <div>
                                                        {selectedOrder.user
                                                            .phone ||
                                                            "08243243423"}
                                                    </div>{" "}
                                                    {/* Tambahkan field phone di data user */}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>
                                            Pilih pesanan untuk melihat detail
                                        </p>
                                    )}
                                </CardContent>
                                <CardFooter></CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

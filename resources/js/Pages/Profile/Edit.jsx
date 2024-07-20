import React, { useState, useEffect } from "react";
import ShopLayout from "@/Layouts/ShopLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { formatRupiah } from "@/lib/convert";

export default function Edit({ auth, mustVerifyEmail, status, orders }) {
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (orders.data.length > 0) {
            setSelectedOrder(orders.data[0]);
        }
    }, [orders.data]);

    const handleDetailClick = (order) => {
        setSelectedOrder(order);
    };

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
                        selectedOrder?.id === order.id
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleDetailClick(order)}
                >
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
                            {order.status}
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
        <ShopLayout user={auth.user}>
            <div className="sm:max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">
                        Daftar Pesanan
                    </h2>
                    {orders.data.length === 0 ? (
                        <p className="text-center text-gray-600">
                            Belum ada pesanan.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Produk</TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Jumlah Barang
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
                        </div>
                    )}
                </div>

                <div className="p-4 sm:p-8 bg-white shadow-md rounded-lg">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow-md rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow-md rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </ShopLayout>
    );
}

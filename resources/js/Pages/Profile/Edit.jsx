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
                    } transition-colors duration-150 ease-in-out`}
                    onClick={() => handleDetailClick(order)}
                >
                    <TableCell className="w-[100px]">
                        <img
                            src={order.order_items[0].product.image}
                            alt={order.order_items[0].product.name}
                            className="w-20 h-20 object-cover rounded"
                        />
                    </TableCell>
                    <TableCell className="w-[200px] text-gray-800 font-medium">
                        {order.order_items
                            .map((item) => item.product.name)
                            .join(", ")}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-gray-600">
                        {totalJumlahBarang}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Badge variant={order.status.toLowerCase()}>
                            {order.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-800">
                        {formatRupiah(order.total_harga)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600">
                        {order.tanggal_pemesanan}
                    </TableCell>
                    <TableCell>
                        <button
                            className="text-blue-600 hover:underline transition-colors duration-150 ease-in-out"
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
            <div className="container mx-auto px-4  space-y-6">
                <div className="bg-white shadow-lg rounded-lg border border-gray-200">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            Daftar Pesanan Anda
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
                                            <TableHead>Gambar</TableHead>
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
                </div>

                <div className="bg-white shadow-lg rounded-lg border border-gray-200">
                    <div className="p-6">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-2xl"
                        />
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg border border-gray-200">
                    <div className="p-6">
                        <UpdatePasswordForm className="max-w-2xl" />
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg border border-gray-200">
                    <div className="p-6">
                        <DeleteUserForm className="max-w-2xl" />
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}

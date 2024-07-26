import React, { useState, useEffect } from "react";
import ShopLayout from "@/Layouts/ShopLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
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
import { formatRupiah } from "@/lib/convert";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status, orders }) {
    const [selectedOrder, setSelectedOrder] = useState(orders.data[0]);

    useEffect(() => {
        if (orders.data.length > 0) {
            setSelectedOrder(orders.data[0]);
        }
    }, [orders.data]);

    const handleDetailClick = (order) => {
        setSelectedOrder(order);
    };

    const renderOrders = () => {
        return orders.data?.map((order) => {
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
                        {formatRupiah(order?.total_harga)}
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
            <div className="mx-auto space-y-6">
                <Breadcrumb className="mb-4 font-medium text-lg">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/shop">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/profile">
                                Profile
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {orders.data.length != 0 ? (
                    <div className="bg-white sm:flex shadow-lg rounded-lg border border-gray-200">
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-90">
                                Daftar Pesanan Anda
                            </h2>
                            {orders.data.length == 0 ? (
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
                                                    Jumlah
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Status
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Total Harga
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Waktu
                                                </TableHead>
                                                <TableHead>Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>{renderOrders()}</TableBody>
                                    </Table>
                                    <div className="border-t pt-5">
                                        <PaginationComponent
                                            links={orders.meta.links}
                                        ></PaginationComponent>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-l-2 p-6 font-medium flex flex-col justify-between">
                            <div>
                                <h1>Detail Pesanan</h1>
                                <Table className="mt-2">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Produk</TableHead>
                                            <TableHead>Jumlah</TableHead>
                                            <TableHead>Harga</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {selectedOrder.order_items.map(
                                            (item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="flex items-center gap-2">
                                                        <img
                                                            src={
                                                                item.product
                                                                    .image
                                                            }
                                                            className="w-[60px]"
                                                        />
                                                        <h1 className="w-24 flex-wrap">
                                                            {item.product.name}
                                                        </h1>
                                                    </TableCell>
                                                    <TableCell className="font-bold">
                                                        x {item.jumlah_barang}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatRupiah(
                                                            item.product.price
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex justify-between font-semibold text-gray-800">
                                <div>Subtotal</div>
                                <div>
                                    {formatRupiah(selectedOrder?.total_harga)}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className=" p-5 w-full ">
                        <div className="mx-auto w-[300px] text-center">
                            <img src="/buy_now.png" className="" alt="" />
                            <h1 className="font-semibold text-xl text-gray-600 mb-5">
                                Belum ada pesanan...
                            </h1>
                            <Link href={route("shop.search")}>
                                <Button>Mulai Belanja</Button>
                            </Link>
                        </div>
                    </div>
                )}

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

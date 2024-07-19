import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/Components/ui/card";
import PaginationComponent from "@/Components/Pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

export default function OrderList({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col gap-4 py-4">
                <div className="mx-auto  px-3 sm:px-28  flex-1 auto-rows-max gap-4 w-full">
                    <div className="sm:grid grid-cols-2 gap-4">
                        <div className="grid col-span-2 gap-4">
                            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                                <Card className="h-[100px]">
                                    <CardHeader>hallo</CardHeader>
                                </Card>
                                <Card className="h-[100px]">
                                    <CardHeader>hallo</CardHeader>
                                </Card>
                                <Card className="h-[100px]">
                                    <CardHeader>hallo</CardHeader>
                                </Card>
                            </div>
                            <Card x-chunk="dashboard-06-chunk-0">
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
                                                    User
                                                </TableHead>
                                                <TableHead>
                                                    Nama Produk
                                                </TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Jumlah Barang
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Tanggal Pemesanan
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Tanggal Pengiriman
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Total Harga
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Tanggal Diperbarui
                                                </TableHead>
                                                <TableHead>Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {/* {renderProducts()} */}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="border-t pt-3">
                                    {/* <PaginationComponent
                                        // links={data.meta.links}
                                    ></PaginationComponent> */}
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="col-span-1">
                            <Card>
                                <CardHeader>CardBox 4</CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Store, Box, ShoppingCart } from "lucide-react"; // Import Lucide icons

export default function Index({
    auth,
    totalMarkets,
    totalStores,
    pendingStores,
    recentStores,
    markets,
}) {
    return (
        <AdminLayout user={auth.user}>
            <h1 className="text-3xl font-bold text-green-600">
                Dashboard
            </h1>
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Card className="bg-white border border-gray-200 shadow-lg rounded-lg">
                        <CardHeader className="flex items-center space-x-4">
                            <Store className="text-green-500 text-3xl" />
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-700">
                                    Pasar
                                </CardTitle>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    {totalMarkets}
                                </CardTitle>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="bg-white border border-gray-200 shadow-lg rounded-lg">
                        <CardHeader className="flex items-center space-x-4">
                            <Box className="text-green-500 text-3xl" />
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-700">
                                    Toko
                                </CardTitle>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    {totalStores}
                                </CardTitle>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="bg-white border border-gray-200 shadow-lg rounded-lg">
                        <CardHeader className="flex items-center space-x-4">
                            <ShoppingCart className="text-green-500 text-3xl" />
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-700">
                                    Permintaan
                                </CardTitle>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    {pendingStores}
                                </CardTitle>
                            </div>
                        </CardHeader>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent Stores Table */}
                    <Card className="bg-white border border-gray-200 shadow-lg rounded-lg">
                        <CardHeader className="flex justify-between items-center p-4 border-b border-gray-200">
                            <CardTitle className="text-lg font-semibold text-gray-700">
                                Permintaan Pembukaan Toko Terbaru
                            </CardTitle>
                            <Button variant="green">Lihat Semua</Button>
                        </CardHeader>
                        <CardContent>
                            <Table className="table-auto">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Toko</TableHead>
                                        <TableHead>Penjual</TableHead>
                                        <TableHead>
                                            Tanggal Pendaftaran
                                        </TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentStores.data.map((store) => (
                                        <TableRow
                                            key={store.id}
                                            className="hover:bg-green-50"
                                        >
                                            <TableCell>
                                                {store.nama_store}
                                            </TableCell>
                                            <TableCell>
                                                {store.user.name}
                                            </TableCell>
                                            <TableCell>
                                                {store.created_at}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={store.status.toLowerCase()}
                                                    className="bg-green-200 text-green-800"
                                                >
                                                    {store.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Recent Markets Table */}
                    <Card className="bg-white border border-gray-200 shadow-lg rounded-lg">
                        <CardHeader className="flex justify-between items-center p-4 border-b border-gray-200">
                            <CardTitle className="text-lg font-semibold text-gray-700">
                                Pasar Terbaru
                            </CardTitle>
                            <Button variant="green">Lihat Semua</Button>
                        </CardHeader>
                        <CardContent>
                            <Table className="table-auto">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className=" text-green-800">
                                            Nama Pasar
                                        </TableHead>
                                        <TableHead className=" text-green-800">
                                            Lokasi
                                        </TableHead>
                                        <TableHead className=" text-green-800 text-end">
                                            Tanggal Ditambahkan
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {markets.data.map((market) => (
                                        <TableRow
                                            key={market.id}
                                            className="hover:bg-green-50"
                                        >
                                            <TableCell>
                                                {market.nama_market}
                                            </TableCell>
                                            <TableCell>
                                                {market.lokasi_market}
                                            </TableCell>
                                            <TableCell className="text-end">
                                                {market.created_at}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}

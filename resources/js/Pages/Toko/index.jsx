import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    LineChart,
    BarChart,
    ShoppingCart,
    DollarSign,
    Package,
    User,
    PieChart,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard Toko"></Head>
            <div className="flex flex-col gap-4 py-4">
                <div className="mx-auto px-3 sm:px-28 flex-1 auto-rows-max gap-4 w-full">
                    <div className="grid sm:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                                    <ShoppingCart className="h-5 w-5" />
                                    Total Penjualan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-xl font-bold">
                                $4,500
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
                                120 Produk
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
                                Rp. 15,000
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
                                85 Pesanan
                            </CardContent>
                        </Card>
                    </div>
                    <div className="sm:grid grid-cols-3 gap-4 mt-4">
                        <Card className="col-span-2 h-[450px] ">
                            <CardHeader>
                                <CardTitle>Penjualan Terakhir</CardTitle>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                        <Card className="col-span-1 mt-4 sm:mt-0 h-[450px] ">
                            <CardHeader>
                                <CardTitle>Produk Terlaris</CardTitle>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

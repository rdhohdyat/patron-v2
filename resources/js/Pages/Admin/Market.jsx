import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
import { MoreHorizontal, PlusCircle } from "lucide-react";
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
import PaginationComponent from "@/Components/Pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { useToast } from "@/Components/ui/use-toast";

export default function Market({ auth, data }) {
    const { toast } = useToast();

    const renderMarket = () => {
        return data.data.map((market) => (
            <TableRow key={market.id} className="hover:bg-green-50">
                <TableCell>
                    <img
                        alt="market img"
                        className="aspect-square rounded-md border border-gray-300"
                        height="64"
                        src={market.image}
                        width="64"
                    />
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                    {market.nama_market}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-600">
                    {market.lokasi_market}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-600">
                    {market.stores.length}
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-600">
                    {market.created_at}
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="bg-white border border-gray-200 shadow-lg rounded-lg"
                        >
                            <DropdownMenuLabel className="font-semibold text-gray-800">
                                Aksi
                            </DropdownMenuLabel>
                            <Link href={route("market.edit", market.id)}>
                                <DropdownMenuItem className="hover:bg-green-100 hover:text-green-700">
                                    Edit
                                </DropdownMenuItem>
                            </Link>
                            <Link
                                method="delete"
                                href={route("market.destroy", market.id)}
                                onSuccess={() =>
                                    toast({
                                        title: "Berhasil menghapus",
                                        variant: "success",
                                    })
                                }
                            >
                                <DropdownMenuItem className="text-red-500 hover:bg-red-100 hover:text-red-700">
                                    Hapus
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <AdminLayout user={auth.user}>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-green-600">
                    Pasar Terdaftar
                </h1>
                <Link href={route("market.create")}>
                    <Button
                        variant="default"
                        className="flex items-center space-x-2"
                    >
                        <PlusCircle className="h-5 w-5" />
                        Tambah Pasar Baru
                    </Button>
                </Link>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-md">
                <CardHeader className="p-4 border-b border-gray-200">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                        Daftar Pasar
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] text-gray-600">
                                        Foto
                                    </TableHead>
                                    <TableHead className="text-gray-600">
                                        Nama Pasar
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell text-gray-600">
                                        Lokasi
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell text-gray-600">
                                        Jumlah Toko
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell text-gray-600">
                                        Tanggal Ditambahkan
                                    </TableHead>
                                    <TableHead className="text-gray-600">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>{renderMarket()}</TableBody>
                        </Table>
                    </div>
                </CardContent>
                <CardFooter className="p-4 border-t border-gray-200">
                    <PaginationComponent links={data.meta.links} />
                </CardFooter>
            </div>
        </AdminLayout>
    );
}

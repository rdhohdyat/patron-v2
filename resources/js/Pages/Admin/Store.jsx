import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
import { File, MoreHorizontal, PlusCircle } from "lucide-react";
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
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

export default function Store({ auth, data }) {
    console.log(data);
    const renderStore = () => {
        return data.data.map((store) => (
            <TableRow key={store.id} className="hover:bg-gray-50">
                <TableCell>
                    <img
                        alt="store img"
                        className="aspect-square rounded-lg border border-gray-200"
                        height="64"
                        src={store.image}
                        width="64"
                    />
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                    {store.nama_store}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {store.user.name}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {store.market.nama_market}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {store.market.lokasi_market}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {store.created_at}
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
                            <DropdownMenuLabel className="font-semibold">
                                Detail
                            </DropdownMenuLabel>
                            <Link>
                                <DropdownMenuItem>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDetailClick(store)}
                                    >
                                        Lihat Detail
                                    </Button>
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
                    Toko yang Terdaftar
                </h1>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-md">
                <CardHeader className="p-4 border-b border-gray-200">
                    <CardTitle className="text-lg font-semibold">
                        Daftar Toko
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        Foto
                                    </TableHead>
                                    <TableHead>Nama Toko</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Penjual
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Pasar
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Lokasi
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Tanggal Pendaftaran
                                    </TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>{renderStore()}</TableBody>
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

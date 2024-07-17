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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";

export default function Store({ auth, data }) {
    const renderStore = () => {
        return data.data.map((store) => (
            <TableRow key={store.id}>
                <TableCell>
                    <img
                        alt="store img"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src="/sayurr.jpg"
                        width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">{store.nama_store}</TableCell>
                <TableCell className="hidden md:table-cell">
                    {store.lokasi_store}
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
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Detail</DropdownMenuLabel>
                            <Link>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                            </Link>
                            <Link
                            >
                                <DropdownMenuItem className="text-red-500 hover:!bg-red-100 active:!bg-red-300 hover:!text-red-600">
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
            <div>
                <h1 className="font-semibold text-xl">Toko yang terdaftar</h1>
            </div>
            <div className="flex flex-1 justify-center rounded-lg border-2 shadow-sm bg-white p-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Foto</TableHead>
                            <TableHead>Nama Toko</TableHead>
                            <TableHead className="hidden sm:table-cell">
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
        </AdminLayout>
    );
}

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

export default function Market({ auth, data }) {
    console.log(data);

    const renderMarket = () => {
        return data.data.map((market) => (
            <TableRow key={market.id}>
                <TableCell>
                    <img
                        alt="market img"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={market.image}
                        width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">
                    {market.nama_market}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                    {market.lokasi_market}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                    {market.created_at}
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
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <Link href={route("market.edit", market.id)}>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                            </Link>
                            <Link
                                method="delete"
                                href={route("market.destroy", market.id)}
                                onSuccess={() =>
                                    toast({
                                        title: "Berhasil menghapus",
                                        variant: "alert",
                                    })
                                }
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
            <div className="flex justify-between">
                <h1 className="font-semibold text-xl"> Pasar</h1>
                <Button>
                    <Link href={route("market.create")}>Tambah Pasar Baru</Link>
                </Button>
            </div>
            <div className="bg-white rounded-lg border-2 shadow-sm p-3">
                <div className="flex flex-1 justify-center border-b">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Foto
                                </TableHead>
                                <TableHead>Nama Pasar</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Lokasi
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Tanggal Ditambahkan
                                </TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>{renderMarket()}</TableBody>
                    </Table>
                </div>
                <div className="pt-3">
                    <PaginationComponent
                        links={data.meta.links}
                    ></PaginationComponent>
                </div>
            </div>
        </AdminLayout>
    );
}

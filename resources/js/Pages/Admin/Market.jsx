import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/Components/ui/card";
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
    
    const renderProducts = () => {
        return data.data.map((product) => (
            <TableRow key={product.id}>
                <TableCell>
                    <img
                        alt="Product img"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.image}
                        width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                    {product.category}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {product.stock}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {product.created_at}
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
                            <Link href={route("product.edit", product.id)}>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                            </Link>
                            <Link
                                method="delete"
                                href={route("product.destroy", product.id)}
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
                <h1 className="font-semibold text-xl">Manajemen Pasar</h1>
                <Button>
                    <Link>Tambah Pasar Baru</Link>
                </Button>
            </div>
            <div className="flex flex-1 justify-center rounded-lg border-2 shadow-sm bg-white p-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Foto</TableHead>
                            <TableHead>Nama Pasar</TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Lokasi
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Kategori
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Tanggal Ditambahkan
                            </TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{renderProducts()}</TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}

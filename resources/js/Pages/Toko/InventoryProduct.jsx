import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { File, MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Link, Head } from "@inertiajs/react";
import { formatRupiah } from "@/lib/convert";
import { useToast } from "@/Components/ui/use-toast";
import PaginationComponent from "@/Components/Pagination";
import EmptyProduct from "@/Components/EmptyProduct";
import { useEffect } from "react";

export default function InventoryProduct({ auth, data }) {
    const products = data.data;
    const { toast } = useToast();

    const renderProducts = () => {
        return products.map((product) => (
            <TableRow key={product.id}>
                <TableCell>
                    <img
                        alt="Product img"
                        className="aspect-square rounded-lg border border-gray-200 object-cover"
                        height="64"
                        src={product.image}
                        width="64"
                    />
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                    {product.name}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-600">
                    {formatRupiah(product.price)}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-600">
                    {product.category}
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-600">
                    {product.stock}
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-600">
                    {product.created_at}
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-600">
                    {product.updated_at}
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                            >
                                <MoreHorizontal className="h-4 w-4 text-gray-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <Link href={route("product.edit", product.id)}>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                            </Link>
                            <Link href={route("product.edit", product.id)}>
                                <DropdownMenuItem>
                                    Tambah Stock
                                </DropdownMenuItem>
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
                                <DropdownMenuItem className="text-red-500 hover:bg-red-100 active:bg-red-200 hover:text-red-600">
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Inventory Produk" />
            <div className="flex flex-col items-center gap-4 mt-4 px-4">
                <div className="w-full max-w-7xl">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Inventaris Produk
                        </h1>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="gap-1 text-gray-600 border-gray-300"
                            >
                                <File className="h-4 w-4" />
                                <span className="hidden sm:inline">Export</span>
                            </Button>
                            <Link href={route("product.create")}>
                                <Button className="gap-1 bg-green-600 text-white hover:bg-green-700">
                                    <PlusCircle className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Tambah Produk
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <EmptyProduct />
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Daftar Produk Anda</CardTitle>
                                <p className="text-sm text-gray-600">
                                    Kelola produk yang ada di toko Anda
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">
                                                Foto
                                            </TableHead>
                                            <TableHead>Nama Produk</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Harga
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Kategori
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Stock
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Tanggal Ditambahkan
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Tanggal Diperbarui
                                            </TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>{renderProducts()}</TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="border-t pt-4">
                                <PaginationComponent links={data.meta.links} />
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

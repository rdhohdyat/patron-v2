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

export default function InventoryProduct({ auth, data }) {
    const products = data.data;
    // const products = [];

    const { toast } = useToast();

    const renderProducts = () => {
        return products.map((product) => (
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
                    {formatRupiah(product.price)}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                    {product.category}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {product.stock}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {product.created_at}
                </TableCell>
                <TableCell className="hidden md:table-cell">
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
                                <MoreHorizontal className="h-4 w-4" />
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Inventory Produk"></Head>
            <div className="flex flex-col gap-2 mt-3">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-20">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  sm:py-0 ">
                        <div className="flex items-center">
                            <h1 className="font-bold text-xl">
                                Inventaris Produk
                            </h1>
                            <div className="ml-auto flex items-center gap-2">
                                <Button variant="outline" className="gap-1">
                                    <File className="h-3.5 w-3.5 text-gray-600" />
                                    <span className="sr-only sm:not-sr-only text-gray-600  sm:whitespace-nowrap">
                                        Export
                                    </span>
                                </Button>
                                <Link href={route("product.create")}>
                                    <Button className="gap-1">
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Tambah Produk
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {products == null || products.length == 0 ? (
                            <EmptyProduct></EmptyProduct>
                        ) : (
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Daftar Produk Anda</CardTitle>
                                    <p className="text-sm text-gray-600">
                                        Kelola produk yang ada di toko anda
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">
                                                    Foto
                                                </TableHead>
                                                <TableHead>
                                                    Nama Produk
                                                </TableHead>
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
                                        <TableBody>
                                            {renderProducts()}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="border-t pt-3">
                                    <PaginationComponent
                                        links={data.meta.links}
                                    ></PaginationComponent>
                                </CardFooter>
                            </Card>
                        )}
                    </main>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

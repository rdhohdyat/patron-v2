import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { File, MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import { Link } from "@inertiajs/react";
import { formatRupiah } from "@/lib/convert";
import { useToast } from "@/Components/ui/use-toast";

export default function InventoryProduct({ auth, data }) {
    const products = data.data;

    const { toast } = useToast();

    const renderProducts = () => {
        return products.map((product) => (
            <TableRow key={product.id}>
                <TableCell className="">
                    <img
                        alt="Product img"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.image}
                        width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="hidden sm:table-cell">{formatRupiah(product.price)}</TableCell>
                <TableCell className="hidden sm:table-cell">{product.category}</TableCell>
                <TableCell className="hidden md:table-cell">
                    {product.stock}
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
                                <DropdownMenuItem>Hapus</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col gap-2 mt-3">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  sm:py-0 md:gap-8">
                        <div className="flex items-center">
                            <h1 className="font-bold text-xl">
                                Inventaris Produk
                            </h1>
                            <div className="ml-auto flex items-center gap-2">
                                <Button variant="outline" className="gap-1">
                                    <File className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Export
                                    </span>
                                </Button>
                                <Link href={route("product.tambah")}>
                                    <Button className="gap-1">
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Tambah Produk
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader>
                                <CardTitle>Daftar Produk Anda</CardTitle>
                                <CardDescription>
                                    Kelola produk yang ingin Anda jual
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">
                                                Gambar Produk
                                            </TableHead>
                                            <TableHead>Nama Produk</TableHead>
                                            <TableHead className="hidden sm:table-cell">Harga</TableHead>
                                            <TableHead className="hidden md:table-cell">Kategori</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Stock
                                            </TableHead>
                                            <TableHead>
                                                Action
                                            </TableHead>
                                            <TableHead>
                                                <span className="sr-only">
                                                    Actions
                                                </span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>{renderProducts()}</TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <div className="text-xs text-muted-foreground">
                                    Showing <strong>1-10</strong> of{" "}
                                    <strong>32</strong> products
                                </div>
                            </CardFooter>
                        </Card>
                    </main>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    ChevronLeft,
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Upload,
    Users2,
} from "lucide-react";

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
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import { Link, useForm } from "@inertiajs/react";

export default function EditProduct({ auth, product }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || "",
        image: "",
    });

    const category = [
        "Sayur",
        "Buah",
        "Daging",
        "Ikan",
        "Bumbu",
        "Beras",
        "Telur",
        "Minuman",
        "Rempah-rempah",
        "Produk olahan",
        "Makanan ringan",
        "Roti dan kue",
    ];

    const onSubmit = (event) => {
        event.preventDefault();
        put(route("product.update", product.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <form action="">
                <div className="flex flex-col gap-4 py-4 sm:pl-14">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <div className="mx-auto grid flex-1 auto-rows-max gap-4 w-full sm:max-w-6xl">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Back</span>
                                </Button>
                                <h1 className="flex-1 text-xl font-semibold tracking-tight">
                                    Edit Produk
                                </h1>
                                <Badge
                                    variant="outline"
                                    className="ml-auto sm:ml-0 bg-white"
                                >
                                    In stock
                                </Badge>
                                <div className="hidden items-center gap-2 md:flex">
                                    <Button variant="outline">Batal</Button>
                                    <Button>Simpan Produk</Button>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Informasi Produk
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name">
                                                        Nama Produk
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        className="w-full"
                                                        value={
                                                            product.data.name
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="description">
                                                        Deskripsi
                                                    </Label>
                                                    <Textarea
                                                        id="description"
                                                        className="min-h-32"
                                                        value={
                                                            product.data
                                                                .description
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Kategori Produk
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6 sm:grid-cols-3">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="category">
                                                        Kategori
                                                    </Label>
                                                    <Select value={product.data.category}>
                                                        <SelectTrigger
                                                            id="category"
                                                            aria-label="Select category"
                                                        >
                                                            <SelectValue placeholder="Pilih Kategori Produk" />
                                                            
                                                        </SelectTrigger>
                                                        <SelectContent> 
                                                            {category.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <SelectItem
                                                                        value={
                                                                            item
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Harga dan Stok
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="price">
                                                        Harga
                                                    </Label>
                                                    <Input
                                                        id="price"
                                                        type="text"
                                                        className="w-full"
                                                        value={
                                                            product.data.price
                                                        }
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="stock">
                                                        Stok
                                                    </Label>
                                                    <Input
                                                        id="stock"
                                                        type="number"
                                                        className="w-full"
                                                        value={
                                                            product.data
                                                                .stock
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="overflow-hidden">
                                        <CardHeader>
                                            <CardTitle>Gambar Produk</CardTitle>
                                            <CardDescription>
                                                Format foto harus .jpg .jpeg
                                                .png
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="full"
                                                        className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                                                    >
                                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                                        <span className="sr-only">
                                                            Upload
                                                        </span>
                                                    </Button>
                                                </div>
                                                <img src={product.data.image} alt="" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 md:hidden">
                                <Button variant="outline">Batal</Button>
                                <Button type="submit">Simpan Produk</Button>
                            </div>
                        </div>
                    </main>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ChevronLeft, Upload } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
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
import { Textarea } from "@/Components/ui/textarea";
import { Link, useForm } from "@inertiajs/react";
import { useToast } from "@/Components/ui/use-toast";

export default function AddProduct({ auth }) {
    const { toast } = useToast();

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("product.store"), {
            onSuccess: () => {
                toast({
                    title: "Berhasil menambahkan produk",
                    variant: "default",
                });
            },
        });
    };

    const category = [
        "Sayur",
        "Buah",
        "Daging",
        "Ikan",
        "Bumbu Dapur",
        "Beras",
        "Telur",
        "Minuman",
        "Rempah-rempah",
        "Produk olahan",
        "Makanan ringan",
        "Roti dan kue",
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 py-4 sm:pl-14">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <div className="mx-auto grid flex-1 auto-rows-max gap-4 w-full sm:max-w-7xl">
                            <div className="flex items-center gap-4">
                                <Link href={route("product")}>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        <span className="sr-only">Back</span>
                                    </Button>
                                </Link>
                                <h1 className="flex-1 text-xl font-semibold tracking-tight">
                                    Tambah Produk Baru
                                </h1>
                                <div className="hidden items-center gap-2 md:flex">
                                    <Link href={route("product")}>
                                        <Button variant="outline">Batal</Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>
                                        Simpan Produk
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Informasi Produk
                                            </CardTitle>
                                            <p className="text-sm text-gray-600">
                                                Isi informasi produk yang akan
                                                anda jual
                                            </p>
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
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full"
                                                    />
                                                    {errors.name && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="description">
                                                        Deskripsi
                                                    </Label>
                                                    <Textarea
                                                        id="description"
                                                        value={data.description}
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="min-h-32"
                                                    />
                                                    {errors.description && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Kategori Produk
                                            </CardTitle>
                                            <p className="text-sm text-gray-600">
                                                Isi kategori produk yang akan
                                                dijual
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6 sm:grid-cols-3">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="category">
                                                        Kategori
                                                    </Label>
                                                    <Select
                                                        value={data.category}
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            setData(
                                                                "category",
                                                                value
                                                            )
                                                        }
                                                    >
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
                                                    {errors.category && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.category}
                                                        </p>
                                                    )}
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
                                            <p className="text-sm text-gray-600">
                                                Atur harga dan stok awal produk
                                            </p>
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
                                                        value={data.price}
                                                        onChange={(e) =>
                                                            setData(
                                                                "price",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full"
                                                    />
                                                    {errors.price && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.price}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="stock">
                                                        Stok
                                                    </Label>
                                                    <Input
                                                        id="stock"
                                                        type="number"
                                                        value={data.stock}
                                                        onChange={(e) =>
                                                            setData(
                                                                "stock",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full"
                                                    />
                                                    {errors.stock && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.stock}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="overflow-hidden">
                                        <CardHeader>
                                            <CardTitle>Foto  Produk</CardTitle>
                                            <p className="text-sm text-gray-600">
                                                Format foto harus JPG, JPEG dan PNG
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="file"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "image",
                                                                    e.target
                                                                        .files[0]
                                                                )
                                                            }
                                                        />
                                                        {errors.image && (
                                                            <p className="text-red-500 text-sm mt-1">
                                                                {errors.image}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 md:hidden">
                                <Button variant="outline">Batal</Button>
                                <Button type="submit" disabled={processing}>
                                    Simpan Produk
                                </Button>
                            </div>
                        </div>
                    </main>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

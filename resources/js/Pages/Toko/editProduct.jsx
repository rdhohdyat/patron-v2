import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ChevronLeft, Upload } from "lucide-react";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
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
import { Textarea } from "@/Components/ui/textarea";
import { Head, Link, useForm } from "@inertiajs/react";
import { useToast } from "@/Components/ui/use-toast";

export default function EditProduct({ auth, product }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        image: "",
        name: product.data.name || "",
        category: product.data.category || "",
        price: product.data.price || "",
        stock: product.data.stock || "",
        description: product.data.description || "",
        _method: "PUT",
    });

    const { toast } = useToast();

    const categories = [
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("product.update", { product: product.data.id }), {
            onSuccess: () => {
                toast({
                    title: "Berhasil edit produk",
                    variant: "default",
                });
            },
            onError: () => {
                toast({
                    title: "Gagal edit produk",
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Produk"></Head>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 py-4 sm:pl-14">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <div className="mx-auto grid flex-1 auto-rows-max gap-4 w-full sm:max-w-7xl">
                            <div className="flex items-center gap-4">
                                <Link href={route("product.index")}>
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
                                    Edit Produk
                                </h1>
                                <Badge
                                    variant="outline"
                                    className="ml-auto sm:ml-0 bg-white text-green-500 font-bold"
                                >
                                    Tersedia
                                </Badge>
                                <div className="hidden items-center gap-2 sm:flex">
                                    <Link href={route("product.index")}>
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
                                            <CardDescription>
                                                Perbarui informasi dari produk
                                                yang ada di toko anda
                                            </CardDescription>
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
                                                        name="name"
                                                        placeholder="contoh : Cabe busuk gagal panen"
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full"
                                                        value={data.name}
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="description">
                                                        Deskripsi
                                                    </Label>
                                                    <Textarea
                                                        id="description"
                                                        className="min-h-32"
                                                        placeholder="Berikan detail dari produk yang ingin anda jual"
                                                        value={data.description}
                                                        name="description"
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
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
                                            <CardDescription>
                                                Atur kategori dari produk
                                            </CardDescription>
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
                                                            {categories.map(
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
                                            <CardDescription>
                                                Perbarui harga dan stok
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="price">
                                                        Harga
                                                    </Label>
                                                    <div className="flex items-center gap-2">
                                                        <h1 className="text-gray-500 font-semibold">
                                                            Rp.
                                                        </h1>
                                                        <Input
                                                            id="price"
                                                            type="text"
                                                            className="w-full"
                                                            value={data.price}
                                                            placeholder="Masukan harga"
                                                            name="price"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "price",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="stock">
                                                        Stok
                                                    </Label>
                                                    <Input
                                                        id="stock"
                                                        type="number"
                                                        className="w-full"
                                                        value={data.stock}
                                                        name="stock"
                                                        placeholder="Masukan jumlah stok"
                                                        onChange={(e) =>
                                                            setData(
                                                                "stock",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="overflow-hidden">
                                        <CardHeader>
                                            <CardTitle>Foto Produk</CardTitle>
                                            <CardDescription>
                                                Format foto harus JPG, JPEG, dan
                                                PNG
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-2">
                                                <label className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-green-600">
                                                    <div className="flex flex-col items-center justify-center text-center">
                                                        <Upload className="w-8 h-8 mb-4 text-gray-500 group-hover:text-green-600" />
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            <span className="font-semibold">
                                                                Klik untuk
                                                                mengunggah
                                                            </span>{" "}
                                                            atau seret dan
                                                            lepaskan
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            JPG, JPEG, PNG
                                                        </p>
                                                    </div>
                                                    <Input
                                                        className="hidden"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            setData(
                                                                "image",
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                    />
                                                </label>
                                                {product.data.image && (
                                                    <img
                                                        src={product.data.image}
                                                        alt="Product Image"
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 md:hidden">
                                <Button variant="outline">Batal</Button>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Produk"}
                                </Button>
                            </div>
                        </div>
                    </main>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

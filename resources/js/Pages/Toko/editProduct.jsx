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

    console.log(product.data.image);

    const { toast } = useToast();

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
                                            <p className="text-sm text-gray-600">
                                                Perbarui informasi dari produk
                                                yang ada di toko anda
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
                                            <p className="text-sm text-gray-600">
                                                Atur kategori dari produk
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
                                                Perbarui harga dan stok
                                            </p>
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
                                            <p className="text-sm text-gray-600">
                                                Format foto harus JPG, JPEG dan
                                                PNG
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="grid grid-cols-2 gap-2  p-5  h-[150px] border-gray-500  border-dashed border-2 rounded transition-colors duration-300 hover:border-green-600">
                                                    <Input
                                                        className="w-[100px] h-[200px] opacity-0"
                                                        type="file"
                                                        name="image"
                                                        onChange={(e) =>
                                                            setData(
                                                                "image",
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                    />
                                                    <Upload className="-ml-5 my-10 z-10 text-white"></Upload>
                                                </div>
                                                <img
                                                    src={product.data.image}
                                                    alt="Product Image"
                                                    className=" w-[120px] my-auto -ml-[155px] rounded-md object-cover"
                                                />
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

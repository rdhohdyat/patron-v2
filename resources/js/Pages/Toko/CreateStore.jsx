import ShopLayout from "@/Layouts/ShopLayout";
import { Button } from "@/Components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/Components/ui/card";
import InputLabel from "@/Components/InputLabel";
import { ChevronLeft, Upload } from "lucide-react";
import { SelectInput } from "@/Components/SelectInput";

export default function CreateStore({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_store: "",
        lokasi_store: "",
        image: null,
        market_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("stores.store"));
    };

    return (
        <ShopLayout user={auth.user}>
            <div>
                <div className="sm:max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <Card className="p-4 sm:p-8">
                            <header>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Informasi Toko Anda
                                </h1>

                                <p className="mt-1 text-sm text-gray-600">
                                    Isi informasi mengenai toko anda
                                </p>
                            </header>

                            <div className="w-[500px] mt-5">
                                <InputLabel
                                    htmlFor="nama_store"
                                    value="Nama Toko Anda"
                                />
                                <Input
                                    id="nama_store"
                                    name="nama_store"
                                    className="mt-1 block w-full"
                                    placeholder="*Nama ini akan digunakan pada toko anda"
                                    value={data.nama_store}
                                    onChange={(e) =>
                                        setData("nama_store", e.target.value)
                                    }
                                />
                                {errors.nama_store && (
                                    <div className="text-red-600">
                                        {errors.nama_store}
                                    </div>
                                )}
                            </div>
                            <div className="w-[500px] mt-5">
                                <InputLabel
                                    htmlFor="lokasi_store"
                                    value="Lokasi Toko Anda"
                                />
                                <Input
                                    id="lokasi_store"
                                    name="lokasi_store"
                                    className="mt-1 block w-full"
                                    placeholder="*Lokasi ini akan digunakan pada toko anda"
                                    value={data.lokasi_store}
                                    onChange={(e) =>
                                        setData("lokasi_store", e.target.value)
                                    }
                                />
                                {errors.lokasi_store && (
                                    <div className="text-red-600">
                                        {errors.lokasi_store}
                                    </div>
                                )}
                            </div>
                            <div className="w-[500px] mt-5">
                                <SelectInput label="Pasar"></SelectInput>
                                {errors.market_id && (
                                    <div className="text-red-600">
                                        {errors.market_id}
                                    </div>
                                )}
                            </div>
                        </Card>
                        <Card className="overflow-hidden">
                            <CardHeader>
                                <CardTitle>Foto Produk</CardTitle>
                                <p className="text-sm text-gray-600">
                                    Format foto harus JPG, JPEG dan PNG
                                </p>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="group grid grid-cols-2 gap-2  p-5  border-2 border-gray-500 border-dashed rounded transition-colors duration-300 hover:border-green-600">
                                        <Input
                                            className="w-[500px] h-[50px] opacity-0"
                                            type="file"
                                            onChange={(e) =>
                                                setData(
                                                    "image",
                                                    e.target.files[0]
                                                )
                                            }
                                        />
                                        <Upload className="-ml-5 text-gray-500 transition-colors duration-300 group-hover:text-green-600"></Upload>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? "Menyimpan..." : "Simpan"}
                            </Button>
                            <Link
                                href={route("shop")}
                                className="text-gray-600"
                            >
                                Kembali
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </ShopLayout>
    );
}

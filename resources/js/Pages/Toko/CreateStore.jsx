import ShopLayout from "@/Layouts/ShopLayout";
import { Button } from "@/Components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import InputLabel from "@/Components/InputLabel";
import { ChevronLeft, Upload } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { useEffect, useState } from "react";
import { useToast } from "@/Components/ui/use-toast";

export default function CreateStore({ auth, markets }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_store: "",
        lokasi_store: "",
        image: null,
        market_id: "",
    });

    const { toast } = useToast();
    const [selectedMarketName, setSelectedMarketName] = useState("");

    const handleMarketChange = (value) => {
        setData("market_id", value);
        const selectedMarket = markets.data.find(
            (market) => market.id == value
        );
        if (selectedMarket) {
            setSelectedMarketName(selectedMarket.nama_market);
        } else {
            setSelectedMarketName("Pilih pasar");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("store.store"), {
            onSuccess: () => {
                toast({
                    title: "Berhasil mendaftarkan toko",
                    variant: "default",
                });
            },
            onError: () => {
                toast({
                    title: "Gagal mendaftarkan toko",
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <ShopLayout user={auth.user}>
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

                        <div className="sm:w-[500px] mt-5">
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
                        <div className="sm:w-[500px] mt-5">
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
                        <div className="sm:w-[500px] mt-5">
                            <div className="grid gap-3">
                                <Label className="text-start">Pasar</Label>
                                <Select
                                    value={data.market_id}
                                    onValueChange={handleMarketChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue>
                                            {selectedMarketName}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {markets.data.map((market) => (
                                                <SelectItem
                                                    key={market.id}
                                                    value={market.id}
                                                >
                                                    {market.nama_market}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {errors.market_id && (
                                <div className="text-red-600">
                                    {errors.market_id}
                                </div>
                            )}
                        </div>
                    </Card>
                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle>Foto Toko</CardTitle>
                            <p className="text-sm text-gray-600">
                                Format foto harus JPG, JPEG, dan PNG
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2">
                                <label className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-green-600">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <Upload className="w-8 h-8 mb-4 text-gray-500 group-hover:text-green-600" />
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">
                                                Klik untuk mengunggah
                                            </span>{" "}
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
                                            setData("image", e.target.files[0])
                                        }
                                    />
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? "Menyimpan..." : "Simpan"}
                        </Button>
                        <Link href={route("shop")} className="text-gray-600">
                            Kembali
                        </Link>
                    </div>
                </form>
            </div>
        </ShopLayout>
    );
}

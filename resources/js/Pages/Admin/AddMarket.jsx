import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AdminLayout from "@/Layouts/AdminLayout";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Link, useForm } from "@inertiajs/react";
import { ChevronLeft, Upload } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/Components/ui/use-toast";

export default function index({ auth }) {
    const { toast } = useToast();
    const { data, setData, post, processing, errors } = useForm({
        nama_market: "",
        lokasi_market: "",
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("market.store"), {
            onSuccess: () => {
                toast({
                    title: "Berhasil menambahkan pasar",
                    variant: "default",
                });
            },
            onError: () => {
                toast({
                    title: "Gagal menambahkan Market",
                    variant: "destructive",
                });
            },
        });
    };
    return (
        <AdminLayout user={auth.user}>
            <div className="w-full max-w-5xl  sm:px-6">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-xl font-semibold mb-4">
                        Menambahkan Pasar
                    </h1>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengisian Data Pasar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="nama_market">
                                        Nama Pasar
                                    </Label>
                                    <Input
                                        id="nama_market"
                                        type="text"
                                        placeholder="Contoh : Pasar Bawah"
                                        value={data.nama_market}
                                        onChange={(e) =>
                                            setData(
                                                "nama_market",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                    />
                                    {errors.nama_market && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.nama_market}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="lokasi_market">
                                        Lokasi Pasar
                                    </Label>
                                    <Input
                                        id="lokasi_market"
                                        type="text"
                                        placeholder="Contoh : Jl Riau"
                                        value={data.lokasi_market}
                                        onChange={(e) =>
                                            setData(
                                                "lokasi_market",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                    />
                                    {errors.lokasi_market && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.lokasi_market}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="image">Gambar</Label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-10 h-10 mb-3 text-gray-500" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">
                                                        Klik untuk upload
                                                    </span>{" "}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    SVG, PNG, JPG
                                                </p>
                                            </div>
                                            <Input
                                                id="image"
                                                type="file"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setData(
                                                        "image",
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>
                                    {errors.image && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex flex-col sm:flex-row justify-start items-center gap-3 mt-6">
                        <Link href={route("admin.market")}>
                            <Button variant="outline">Batal</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Menyimpan..." : "Simpan Pasar"}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

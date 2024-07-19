import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AdminLayout from "@/Layouts/AdminLayout";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Link, useForm } from "@inertiajs/react";
import { ChevronLeft, Upload } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/Components/ui/use-toast";

export default function index({ auth, market }) {
    const { toast } = useToast();
    const { data, setData, post, processing, errors } = useForm({
        nama_market: market.data.nama_market || "",
        lokasi_market: market.data.lokasi_market || "",
        image: "",
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("market.update" , { market: market.data.id }), {
            onSuccess: () => {
                toast({
                    title: "Berhasil menambahkan Market",
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
            <form onSubmit={handleSubmit}>
                <h1 className="text-xl font-semibold">Edit Market</h1>
                <div className="flex flex-col gap-4">
                    <div>
                        <Card className="flex-1 h-full">
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
                                    <Label htmlFor="lokasi_market">
                                        Gambar
                                    </Label>
                                    {/* <div className="grid grid-cols-2 gap-2">
                                        <div className="group grid grid-cols-2 gap-2  p-5  border-2 border-gray-500 border-dashed rounded transition-colors duration-300 hover:border-green-600">
                                            <Input
                                                className="w-[100px] opacity-0"
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
                                    </div> */}
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
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                    <Link href={route("admin.market")}>
                        <Button variant="outline">Batal</Button>
                    </Link>
                    <Button type="submit" disabled={processing}>
                        Simpan Pasar
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}

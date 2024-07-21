import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AdminLayout from "@/Layouts/AdminLayout";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Link, useForm } from "@inertiajs/react";
import { Upload } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/Components/ui/use-toast";
import useLocation from "@/lib/zustand/locationStore";
import { useState, useEffect } from "react";
import { SelectInput } from "@/Components/SelectInput";

export default function EditMarket({ auth, market }) {
    const { kecamatanPekanbaru } = useLocation();
    const { toast } = useToast();
    const { data, setData, put, processing, errors } = useForm({
        nama_market: market.data.nama_market || "",
        lokasi_market: market.data.lokasi_market || "",
        image: null,
        _method: "PUT",
    });

    const [alamat, setAlamat] = useState("");
    const [selectedKecamatan, setSelectedKecamatan] = useState("");
    const [kelurahanOptions, setKelurahanOptions] = useState([]);
    const [selectedKelurahan, setSelectedKelurahan] = useState("");

    // Effect untuk memecah lokasi_market dan mengupdate state
    useEffect(() => {
        const lokasiParts = market.data.lokasi_market
            ? market.data.lokasi_market.split(", ")
            : [];
        const kota = lokasiParts[0] || "";
        const kecamatan = lokasiParts[1] || "";
        const kelurahan = lokasiParts[2] || "";
        const alamat = lokasiParts[3] || "";

        setAlamat(alamat);
        setSelectedKecamatan(kecamatan);

        if (kecamatan) {
            const kecamatanData = kecamatanPekanbaru.find(
                (kec) => kec.name === kecamatan
            );
            if (kecamatanData) {
                setKelurahanOptions(kecamatanData.kelurahan);
                setSelectedKelurahan(
                    kecamatanData.kelurahan.includes(kelurahan) ? kelurahan : ""
                );
            } else {
                setKelurahanOptions([]);
                setSelectedKelurahan("");
            }
        } else {
            setKelurahanOptions([]);
            setSelectedKelurahan("");
        }
    }, [market.data, kecamatanPekanbaru]);

    // Effect untuk mengupdate kelurahanOptions saat selectedKecamatan berubah
    useEffect(() => {
        if (selectedKecamatan) {
            const kecamatanData = kecamatanPekanbaru.find(
                (kec) => kec.name === selectedKecamatan
            );
            if (kecamatanData) {
                setKelurahanOptions(kecamatanData.kelurahan);
                if (!kelurahanOptions.includes(selectedKelurahan)) {
                    setSelectedKelurahan("");
                }
            } else {
                setKelurahanOptions([]);
                setSelectedKelurahan("");
            }
        } else {
            setKelurahanOptions([]);
            setSelectedKelurahan("");
        }
    }, [selectedKecamatan, kecamatanPekanbaru, kelurahanOptions]);

    // Effect untuk mengupdate lokasi_market
    useEffect(() => {
        const location = `Kota Pekanbaru${
            selectedKecamatan ? `, ${selectedKecamatan}` : ""
        }${selectedKelurahan ? `, ${selectedKelurahan}` : ""}${
            alamat ? `, ${alamat}` : ""
        }`;
        setData("lokasi_market", location);
    }, [selectedKecamatan, selectedKelurahan, alamat]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("market.update", { market: market.data.id }), {
            onSuccess: () => {
                toast({
                    title: "Berhasil memperbarui pasar",
                    variant: "default",
                });
            },
            onError: () => {
                toast({
                    title: "Gagal memperbarui pasar",
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <div className="w-full max-w-5xl sm:px-6">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-xl font-semibold mb-4">Edit Pasar</h1>
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
                                        placeholder="Contoh: Pasar Bawah"
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
                                    <Label htmlFor="alamat">Alamat</Label>
                                    <Input
                                        id="alamat"
                                        type="text"
                                        placeholder="Masukkan alamat lengkap"
                                        value={alamat}
                                        onChange={(e) =>
                                            setAlamat(e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    {errors.alamat && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.alamat}
                                        </p>
                                    )}
                                </div>
                                <SelectInput
                                    label="Kecamatan"
                                    data={kecamatanPekanbaru.map((kec) => ({
                                        value: kec.name,
                                        label: kec.name,
                                    }))}
                                    onChange={(value) =>
                                        setSelectedKecamatan(value)
                                    }
                                    value={selectedKecamatan}
                                />
                                {errors.kecamatan && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.kecamatan}
                                    </p>
                                )}
                                <SelectInput
                                    label="Kelurahan"
                                    data={kelurahanOptions.map((kel) => ({
                                        value: kel,
                                        label: kel,
                                    }))}
                                    onChange={(value) =>
                                        setSelectedKelurahan(value)
                                    }
                                    value={selectedKelurahan}
                                    disabled={!selectedKecamatan}
                                />
                                {errors.kelurahan && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.kelurahan}
                                    </p>
                                )}
                                <div className="grid gap-3">
                                    <Label htmlFor="lokasi_market">
                                        Lokasi Pasar
                                    </Label>
                                    <Input
                                        id="lokasi_market"
                                        type="text"
                                        placeholder="Lokasi otomatis terisi berdasarkan pilihan kecamatan, kelurahan, dan alamat"
                                        value={data.lokasi_market}
                                        readOnly
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
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center p-5">
                                                <Upload className="w-10 h-10 mb-3 text-gray-500" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">
                                                        Klik untuk upload
                                                    </span>
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
                            {processing ? "Memproses..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

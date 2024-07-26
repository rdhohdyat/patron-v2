import { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import useLocation from "@/lib/zustand/locationStore";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useToast } from "@/Components/ui/use-toast";
import { SelectInput } from "@/Components/SelectInput";
import { Button } from "@/Components/ui/button";
import { CircleAlert } from "lucide-react";

export default function UpdateAddress() {
    const user = usePage().props.auth.user;
    const { kecamatanPekanbaru } = useLocation();
    const { toast } = useToast();
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        alamat: "",
    });

    const [selectedKecamatan, setSelectedKecamatan] = useState("");
    const [kelurahanOptions, setKelurahanOptions] = useState([]);
    const [selectedKelurahan, setSelectedKelurahan] = useState("");
    const [alamat, setAlamat] = useState("");

    useEffect(() => {
        if (selectedKecamatan) {
            const kecamatan = kecamatanPekanbaru.find(
                (kec) => kec.name === selectedKecamatan
            );
            if (kecamatan) {
                setKelurahanOptions(kecamatan.kelurahan);
                setSelectedKelurahan("");
            }
        } else {
            setKelurahanOptions([]);
        }
    }, [selectedKecamatan, kecamatanPekanbaru]);

    useEffect(() => {
        const combinedAddress = `Pekanbaru${
            selectedKecamatan ? `, ${selectedKecamatan}` : ""
        }${selectedKelurahan ? `, ${selectedKelurahan}` : ""}${
            alamat ? `, ${alamat}` : ""
        }`;
        setData("alamat", combinedAddress);
        console.log("Combined address set to:", combinedAddress); // Debug log
    }, [selectedKecamatan, selectedKelurahan, alamat, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submitting data:", data); // Debug log

        patch(route("profile.update"), {
            onSuccess: () => {
                toast({
                    title: "Alamat berhasil diperbarui",
                    variant: "default",
                });
            },
            onError: (error) => {
                toast({
                    title: "Gagal memperbarui alamat",
                    variant: "destructive",
                });
                console.error("Error updating address:", error);
            },
        });
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                    <div className="border border-red-600 text-red-500 rounded p-3 mt-5">
                        <div className="flex gap-1 items-center mb-2">
                            <CircleAlert className="h-5 w-5"/>
                            <h1 className="font-semibold ml-1">Penting! </h1>
                        </div>
                        <p className="text-sm ml-7">
                            Lokasi ini digunakan sebagai alamat pengiriman oleh
                            penjual nantinya, mohon mengisinya dengan benar!
                        </p>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="alamat">Alamat Lengkap</Label>
                        <Input
                            id="alamat"
                            type="text"
                            placeholder="contoh : Jl. Manchester No. 12, RT. 01 RW. 03"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
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
                        onChange={setSelectedKecamatan}
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
                        onChange={setSelectedKelurahan}
                        value={selectedKelurahan}
                        disabled={!selectedKecamatan}
                    />
                    {errors.kelurahan && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.kelurahan}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="submit" disabled={processing}>
                        {processing ? "Menyimpan..." : "Perbarui Alamat"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

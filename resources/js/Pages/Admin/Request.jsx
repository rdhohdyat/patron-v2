import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
import { File, MoreHorizontal, PlusCircle } from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import PaginationComponent from "@/Components/Pagination";
import { Link, router } from "@inertiajs/react";

export default function Request({ auth, data }) {
    const handleAccept = (storeId) => {
        router.patch(route("admin.update_status", storeId), {
            status: "accepted",
        });
    };

    const handleReject = (storeId) => {
        router.patch(route("admin.update_status", storeId), {
            status: "rejected",
        });
    };

    const renderRequest = () => {
        return data.data?.map((store) => (
            <TableRow key={store.id}>
                <TableCell>
                    <img
                        alt="store img"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={store.image}
                        width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">
                    {store.nama_store}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {store.lokasi_store}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {store.created_at}
                </TableCell>
                <TableCell>
                    <Button
                        variant="default"
                        onClick={() => handleAccept(store.id)}
                    >
                        Terima
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => handleReject(store.id)}
                    >
                        Tolak
                    </Button>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <AdminLayout user={auth.user}>
            <div>
                <h1 className="font-semibold text-xl">Daftar Permintaan</h1>
            </div>
            <div className="flex flex-1 justify-center rounded-lg border-2 shadow-sm bg-white p-3">
                {data.data.length !== 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Foto
                                </TableHead>
                                <TableHead>Nama Toko</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Lokasi
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Tanggal Pendaftaran
                                </TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="w-full">
                            {data.data.length !== 0 ? renderRequest() : null}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="">
                        <div className="">
                            <img
                                src="/check.png"
                                className="w-[300px] h-[300px] "
                                alt=""
                            />
                        </div>
                        <h1 className="text-xl text-gray-600 font-semibold">
                            Tidak ada permintaan pembukaan toko
                        </h1>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

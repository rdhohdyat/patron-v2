import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
import { File, MoreHorizontal, PlusCircle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
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
import { useToast } from "@/Components/ui/use-toast";

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
                <TableCell className="flex gap-3">
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
                <h1 className="text-3xl font-bold text-green-600">
                    Daftar Permintaan
                </h1>
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
                                <TableHead>Verifikasi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="w-full">
                            {renderRequest()}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex items-center justify-center">
                        <div className="">
                            <img
                                src="/check.png"
                                className="w-[300px] h-[300px] "
                                alt=""
                            />
                            <h1 className="text-xl text-gray-600 font-semibold text-center w-[300px] mt-3">
                                Tidak ada permintaan pembukaan toko
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

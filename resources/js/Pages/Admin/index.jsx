import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col gap-4 py-4">
                <div className="mx-auto grid px-20 sm:grid-cols-3 flex-1 auto-rows-max gap-4 w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Produk</CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pemesanan</CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Produk</CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

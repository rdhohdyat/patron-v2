import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col gap-4 py-4">
                <div className="mx-auto  px-3 sm:px-20  flex-1 auto-rows-max gap-4 w-full">
                    <div className="grid grid-cols-4 gap-6">
                        <Card className="h-[100px]">
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
                        <Card>
                            <CardHeader>
                                <CardTitle>Produk</CardTitle>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-4">
                        <Card className="col-span-2 h-[450px]">
                            <CardContent>Hallo</CardContent>
                        </Card>
                        <Card className="col-span-1 h-[450px]">
                            <CardContent>Hallo</CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

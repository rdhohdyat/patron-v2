import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard Toko"></Head>
            <div className="flex flex-col gap-4 py-4">
                <div className="mx-auto  px-3 sm:px-28  flex-1 auto-rows-max gap-4 w-full">
                    <div className="grid sm:grid-cols-4 gap-4 ">
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
                    <div className="sm:grid grid-cols-3 gap-4 mt-4">
                        <Card className="col-span-2 h-[450px]">
                            <CardContent>
                                <CardHeader>
                                    <CardTitle>Produk</CardTitle>
                                </CardHeader>
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 mt-4 sm:mt-0 h-[450px]">
                            <CardContent>
                                <CardHeader>
                                    <CardTitle>Produk</CardTitle>
                                </CardHeader>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

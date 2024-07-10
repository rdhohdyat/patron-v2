import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col gap-4 py-4">
                <div className="mx-auto grid grid-cols-4 flex-1 auto-rows-max gap-4 w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Produk
                            </CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Produk
                            </CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Produk
                            </CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

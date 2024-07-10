import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col gap-2 mt-3 p-3">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Setting toko {auth.user.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent></CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

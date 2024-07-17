import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";

export default function index({ auth }) {
    return (
        <AdminLayout user={auth.user}>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-3 sm:gap-4 gap-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pasar</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Toko</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Permintaan</CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                <div>
                    <Card className="flex-1 h-full">
                        <CardHeader>
                            <CardTitle>hallo</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}

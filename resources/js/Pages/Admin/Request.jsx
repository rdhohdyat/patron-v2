import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";

export default function Request({ auth }) {
    return (
        <AdminLayout user={auth.user}>
            <div>
                <h1 className="font-semibold text-xl">Permintaan Pembukaan Toko</h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border-2 shadow-sm bg-white ">
                Permintaan
            </div>
        </AdminLayout>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardHeader, CardContent } from "@/Components/ui/card";

export default function OrderList({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex flex-col gap-4 py-4">
                <div className="mx-auto  px-3 sm:px-28  flex-1 auto-rows-max gap-4 w-full">
                    <div className="sm:grid grid-cols-3 gap-4">
                        <div className="grid col-span-2 gap-4">
                            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                                <Card className="h-[100px]">
                                    <CardHeader>hallo</CardHeader>
                                </Card>
                                <Card className="h-[100px]">
                                    <CardHeader>hallo</CardHeader>
                                </Card>
                                <Card className="h-[100px]">
                                    <CardHeader>hallo</CardHeader>
                                </Card>
                            </div>

                            <Card className="h-[400px]">
                                <CardHeader>hallo</CardHeader>
                            </Card>
                        </div>
                        <div className="col-span-1">
                            <Card>
                                <CardHeader>hallo</CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

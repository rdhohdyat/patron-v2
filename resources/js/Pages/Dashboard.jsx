import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

export default function Dashboard({ auth }) {
    return <AuthenticatedLayout user={auth.user}></AuthenticatedLayout>;
}

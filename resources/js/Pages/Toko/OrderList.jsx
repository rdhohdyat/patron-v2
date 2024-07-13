import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function OrderList({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <div>Order</div>
            </div>
        </AuthenticatedLayout>
    );
}

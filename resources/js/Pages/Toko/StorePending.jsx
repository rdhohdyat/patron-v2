import ShopLayout from "@/Layouts/ShopLayout";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export default function DontHaveStore({ auth }) {
    return (
        <ShopLayout user={auth.user}>
            <div className="text-center w-full">
                <img src="/no_store.png" className="w-[450px] mx-auto" alt="" />
                <h1 className="font-bold text-gray-600 text-xl sm:w-[430px] mx-auto -mt-6">
                    Permintaan toko anda sedang di proses
                </h1>
            </div>
        </ShopLayout>
    );
}

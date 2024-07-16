import ShopLayout from "@/Layouts/ShopLayout";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export default function DontHaveStore({ auth }) {
    return (
        <ShopLayout user={auth.user}>
            <div className="text-center w-full">
                <img src="/no_store.png" className="w-[450px] mx-auto" alt="" />
                <h1 className="font-bold text-gray-600 text-xl sm:w-[430px] mx-auto -mt-6">
                   Oops.. Anda belum memiliki toko untuk mengakses menu ini!
                </h1>
                <Link href={route("store.create")}>
                    <Button className="uppercase mt-3">Daftar Toko sekarang !</Button>
                </Link>
            </div>
        </ShopLayout>
    );
}

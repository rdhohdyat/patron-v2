import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

export default function EmptyCart() {
    const EmptyCartImage = () => {
        return <img src="/empty_cart.png" className="w-[350px]" />;
    };
    return (
        <div className="h-[500px] flex items-center justify-center">
            <div className="text-center">
                <EmptyCartImage></EmptyCartImage>
                <h1 className="text-gray-600 text-xl font-bold mt-5">Keranjang anda masih kosong</h1>
                <Link href={route("shop")}>
                    <Button className="mt-3">Mulai belanja</Button>
                </Link>
            </div>
        </div>
    );
}

import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

export default function EmptyCart() {
    const EmptyCartImage = () => {
        return <img src="/empty_cart.png" className="w-[300px]" />;
    };
    return (
        <div className="h-[500px] flex items-center justify-center">
            <div className="text-center">
                <EmptyCartImage></EmptyCartImage>
                <h1 className="text-base">Keranjang anda kosong</h1>
                <Link href={route("shop")}>
                    <Button className="mt-3">Mulai belanja</Button>
                </Link>
            </div>
        </div>
    );
}

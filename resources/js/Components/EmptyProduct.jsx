import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

export default function EmptyProduct() {
    const EmptyProductImage = () => {
        return <img src="/empty_product.png" className="w-[350px]" />;
    };
    return (
        <div className="flex items-center justify-center">
            <div className="text-center mt-5 w-[250px] sm:w-[300px]">
                <EmptyProductImage></EmptyProductImage>
                <h1 className="text-gray-600 text-xl font-bold mt-5">
                    Belum ada produk di toko mu
                </h1>
                <Link href={route("product.create")}>
                    <Button className="mt-3">Tambahkan produk pertamamu</Button>
                </Link>
            </div>
        </div>
    );
}

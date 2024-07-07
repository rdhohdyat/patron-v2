import ShopLayout from "@/Layouts/ShopLayout";
import { Button } from "@/Components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import useCartStore from "@/lib/zustand/cartStore";
import { useToast } from "@/Components/ui/use-toast";
import ProductList from "./ProductList";
import { formatRupiah } from "@/lib/convert";

export default function ProductDetail({
    auth,
    data,
    datas: products,
    datas: store,
}) {
    const { toast } = useToast();

    const product = data.data;
    const { addToCart, calculateTotal } = useCartStore();

    const handleAddToCart = (product) => {
        addToCart(product);
        toast({
            title: "Berhasil menambahkan ke keranjang",
            variant: "default",
        });

        calculateTotal();
    };

    return (
        <ShopLayout user={auth.user}>
            <Breadcrumb className="mb-2 font-medium text-xl">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Detail</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <div className="sm:flex justify-between">
                <div className="sm:flex gap-4">
                    <div>
                        <img
                            src={product.image}
                            className="w-full object-cover rounded sm:max-w-[350px] h-[350px]"
                            alt={product.name}
                        />
                    </div>
                    <div className="mt-2 sm:w-[300px]">
                        <p className="uppercase font-semibold text-gray-500 mt-2">
                            {product.category}
                        </p>
                        <h1 className="text-2xl font-bold text-gray-600  flex-wrap">
                            {product.name}
                        </h1>
                        <div>
                            <h1>Penjual</h1>
                        </div>
                        <p className="mt-3">Deskripsi : </p>
                        <p className="flex-wrap text-sm">
                            {product.description}
                        </p>
                    </div>
                </div>
                <div className="fixed sm:static bottom-0 z-10 bg-white left-0 border right-0 p-5">
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-3xl">
                            {formatRupiah(product.price)}
                        </p>
                        <div className="text-xl font-bold">
                            1KG
                        </div>
                    </div>
                    <div className="sm:block flex gap-2">
                        <Button
                            className="w-full mt-3 sm:w-[300px] block"
                            onClick={() => handleAddToCart(product)}
                        >
                            Tambah Keranjang
                        </Button>
                        <Button className="w-full mt-3 sm:w-[300px]">
                            Beli Langsung
                        </Button>
                    </div>
                </div>
            </div>
            <ProductList data={products}></ProductList>
            <ProductList data={products}></ProductList>
            {/* <StoreList data={store}></StoreList> */}
        </ShopLayout>
    );
}

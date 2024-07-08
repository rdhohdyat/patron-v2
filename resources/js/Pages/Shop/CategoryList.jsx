import ShopLayout from "@/Layouts/ShopLayout";
import { Card, CardContent } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/Components/ui/tabs";
import LogoWeb from "@/Layouts/logo";

export default function CategoryList({ auth, data, category }) {
    const products = data.data;
    return (
        <ShopLayout user={auth.user}>

            {/* <div>
                <h1 className="font-bold text-xl">Hasil Ketegori Untuk {category}</h1>
            </div> */}
            <div>
                {products === null ? <h1>tidak ada produk</h1> :
                    products.map(product => (
                        <div>{product.name}</div>
                    ))
                }
            </div>
            <div>

            </div>
        </ShopLayout>
    );
}

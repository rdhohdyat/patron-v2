import ShopLayout from "@/Layouts/ShopLayout";
import { Card, CardContent } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/Components/ui/tabs";

export default function Search({ auth, data, category }) {
    const products = data.data;
    return (
        <ShopLayout user={auth.user}>

            <div>
                <h1 className="font-bold text-xl">Hasil Ketegori Untuk {category}</h1>
            </div>
            <div>
                {products.map(product => (
                    <div>
                        <div key={product.id}>{product.name}</div>
                    </div>
                ))}
            </div>
            <div>

            </div>
        </ShopLayout>
    );
}

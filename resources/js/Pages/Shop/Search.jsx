import ShopLayout from "@/Layouts/ShopLayout";
import { Card, CardContent } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/Components/ui/tabs";

export default function Search({ auth, data }) {
    const products = data.data;
    return (
        <ShopLayout user={auth.user}>

            <div>

            </div>
            <div>
                {products.map(product => (
                    <div key={product.id}>{product.category}</div>
                ))}
            </div>
            <div>

            </div>
        </ShopLayout>
    );
}

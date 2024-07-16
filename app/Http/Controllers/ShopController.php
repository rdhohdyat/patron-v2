<?php

namespace App\Http\Controllers;

use App\Http\Resources\StoreResource;
use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ShopController extends Controller
{
    public function index()
    {
        $query = Product::query();
        $products = $query->paginate(10);
        return inertia("Shop/index", [
            "data" => ProductResource::collection($products)
        ]);
    }

    public function product_detail(Product $product)
    {
        $store = $product->store;

        $otherProducts = $store->products()->where('id', '!=', $product->id)->paginate(10);
        $otherStores = Store::query()->paginate(10);

        return inertia("Shop/ProductDetail", [
            "data" => new ProductResource($product),
            "products" => ProductResource::collection($otherProducts),
            "stores" => StoreResource::collection($otherStores),
        ]);
    }

    public function search()
    {
        $query = Product::query();
        $products = $query->paginate(50);
        return inertia("Shop/Search", [
            "data" => ProductResource::collection($products),
        ]);
    }

    public function category($key)
    {
        $products = Product::where('category', 'like', '%' . $key . '%')->paginate(10);
        return inertia("Shop/CategoryList", [
            "data" => ProductResource::collection($products),
            "category" => $key
        ]);
    }

    public function store_detail(Store $store)
    {
        $products = $store->products()->paginate(5);
        return inertia("Shop/StoreDetail", [
            "data" => new StoreResource($store),
            "products" => ProductResource::collection($products),
        ]);
    }
}

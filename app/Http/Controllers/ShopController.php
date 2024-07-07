<?php

namespace App\Http\Controllers;

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
        $query = Product::query();
        $products = $query->paginate(10);

        return inertia("Shop/ProductDetail", [
            "data" => new ProductResource($product),
            "datas" => ProductResource::collection($products),
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
        return inertia("Shop/Search", [
            "data" => ProductResource::collection($products),
        ]);
    }
}

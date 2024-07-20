<?php

namespace App\Http\Controllers;

use App\Http\Resources\MarketResource;
use App\Http\Resources\StoreResource;
use App\Models\Market;
use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ShopController extends Controller
{
    public function index()
    {
        $products = Product::query()->paginate(10);
        $markets = Market::query()->paginate(10);
        return inertia("Shop/index", [
            "data" => ProductResource::collection($products),
            "markets" => MarketResource::collection($markets),
        ]);
    }

    public function product_detail(Product $product)
    {
        $store = $product->store;

        $otherProducts = $store->products()->where('id', '!=', $product->id)->paginate(10);
        $otherStores = Store::query()->paginate(10);
        $market = Market::query()->paginate(10);


        return inertia("Shop/ProductDetail", [
            "data" => new ProductResource($product),
            "products" => ProductResource::collection($otherProducts),
            "stores" => StoreResource::collection($otherStores),
            "markets" => MarketResource::collection($market),
        ]);
    }

    public function search(Request $request)
    {
        $keyword = trim($request->input('search'));
        $keywords = explode(' ', $keyword);

        $products = Product::query()
            ->where(function ($query) use ($keywords) {
                foreach ($keywords as $word) {
                    $query->where('name', 'like', '%' . $word . '%')
                        ->orWhere('category', 'like', '%' . $word . '%');
                }
            })
            ->paginate(10);

        $stores = Store::query()
            ->where(function ($query) use ($keywords) {
                foreach ($keywords as $word) {
                    $query->where('nama_store', 'like', '%' . $word . '%');
                }
            })
            ->paginate(10);

        $markets = Market::query()
            ->where(function ($query) use ($keywords) {
                foreach ($keywords as $word) {
                    $query->where('nama_market', 'like', '%' . $word . '%');
                }
            })
            ->paginate(10);

        return inertia('Shop/Search', [
            "product" => ProductResource::collection($products),
            'stores' => StoreResource::collection($stores),
            'markets' => MarketResource::collection($markets),
            'keyword' => $keyword
        ]);
    }


    public function category($key)
    {
        $keys = explode(' ', $key);
        $products = Product::query()
            ->where(function ($query) use ($keys) {
                foreach ($keys as $word) {
                    $query->where('category', 'like', '%' . $word . '%');
                }
            })
            ->paginate(10);

        return inertia("Shop/CategoryList", [
            "data" => ProductResource::collection($products),
            "category" => $key
        ]);
    }


    public function store_detail(Store $store)
    {
        $store->load('products');
        $products = $store->products()->paginate(5);

        return inertia("Shop/StoreDetail", [
            "data" => new StoreResource($store),
            "products" => ProductResource::collection($products),
        ]);
    }


    public function market_detail(Market $market)
    {
        $market->load('stores');

        $products = Product::query()->paginate(10);
        return inertia("Shop/MarketDetail", [
            "data" => new MarketResource($market),
            "products" => ProductResource::collection($products),
        ]);
    }
}

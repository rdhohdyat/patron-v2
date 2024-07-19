<?php

namespace App\Http\Controllers;

use App\Http\Resources\MarketResource;
use App\Models\Market;
use Illuminate\Http\Request;
use App\Models\Store;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user->store) {
            return redirect()->route('store.not_registered');
        }

        if ($user->store->status == 'pending') {
            return redirect()->route('store.store_pending');
        }

        $query = Product::query();
        $products = $query->paginate(10);

        return inertia("Toko/index", [
            "data" => ProductResource::collection($products)
        ]);
    }

    public function create()
    {
        $query = Market::query();
        $market = $query->paginate(10);

        return inertia('Toko/CreateStore', [
            "markets" => MarketResource::collection($market)
        ]);
    }

    public function store(Request $request)
    {

    }

    public function show(Store $store)
    {
        return $store;
    }

    public function edit(Store $store)
    {
        return inertia("Toko/StoreSetting");
    }

    public function update(Request $request, Store $store)
    {
        $store->update($request->all());
        return response()->json($store, 200);
    }

    public function destroy(Store $store)
    {
        $store->delete();
        return response()->json(null, 204);
    }
}
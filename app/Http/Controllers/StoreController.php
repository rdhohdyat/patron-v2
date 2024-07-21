<?php

namespace App\Http\Controllers;

use App\Http\Resources\MarketResource;
use App\Models\Market;
use App\Models\Order;
use App\Models\Store;
use App\Models\Product;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;
use App\Http\Resources\ProductResource;
use App\Http\Requests\StoreStoreRequest;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user->store) {
            return redirect()->route('store.not_registered');
        }

        switch ($user->store->status) {
            case 'pending':
                return redirect()->route('store.store_pending');
            case 'rejected':
                return redirect()->route('store.not_registered');
            default:
                break;
        }

        $completedOrders = Order::where('status', 'completed')
            ->with('orderItems.product') 
            ->paginate(10);

        $products = Product::paginate(10);

        return inertia("Toko/index", [
            "completedOrders" => $completedOrders,
            "products" => $products
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

    public function store(StoreStoreRequest $request)
    {
        $data = $request->validated();
        $user = Auth::user();
        $data['user_id'] = $user->id;
        $data['image'] = $data['image']->store('store/' . Str::random(), 'public');
        Store::create($data);
        return to_route('shop');
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
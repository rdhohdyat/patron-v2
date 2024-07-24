<?php

namespace App\Http\Controllers;

use App\Http\Resources\MarketResource;
use App\Http\Resources\OrderResource;
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

        $store = Store::where('user_id', $user->id)->first();

        if (!$store) {
            return redirect()->route('store.not_registered');
        }

        switch ($store->status) {
            case 'pending':
                return redirect()->route('store.store_pending');
            case 'rejected':
                return redirect()->route('store.not_registered');
            default:
                break;
        }


        $completedOrderItems = Order::where('store_id', $store->id)
            ->where('status', 'completed')
            ->with('orderItems')
            ->get()
            ->flatMap(function ($order) {
                return $order->orderItems;
            })
            ->count();

        $completedOrderCount = Order::where('store_id', $store->id)
            ->where('status', 'completed')
            ->count();


        $totalRevenue = Order::where('store_id', $store->id)
            ->where('status', 'completed')
            ->sum('total_harga');

        $totalOrderCount = Order::where('store_id', $store->id)->count();

        $completedOrders = Order::where('store_id', $store->id)
            ->where('status', 'completed')
            ->with('orderItems.product')
            ->paginate(10);

        $products = Product::where('store_id', $store->id)->paginate(5);
        $productCount = Product::where('store_id', $store->id)->count();

        return inertia("Toko/index", [
            "completedOrders" => OrderResource::collection($completedOrders),
            "products" => ProductResource::collection($products),
            'productCount' => $productCount,
            'completedOrderItems' => $completedOrderItems,
            'completedOrderCount' => $completedOrderCount,
            'totalRevenue' => $totalRevenue,
            'totalOrderCount' => $totalOrderCount,
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
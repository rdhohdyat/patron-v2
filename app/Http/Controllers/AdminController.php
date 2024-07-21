<?php

namespace App\Http\Controllers;

use App\Http\Resources\MarketResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\StoreResource;
use App\Models\Market;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $totalMarkets = Market::count();
        $totalStores = Store::count();
        $pendingStores = Store::where('status', 'pending')->count();

        $recentMarkets = Market::latest()->take(5)->get();
        $recentStores = Store::latest()->take(5)->get();

        $markets = Market::latest()->get();

        return inertia('Admin/index', [
            'totalMarkets' => $totalMarkets,
            'totalStores' => $totalStores,
            'pendingStores' => $pendingStores,
            'recentMarkets' => MarketResource::collection($recentMarkets),
            'recentStores' => StoreResource::collection($recentStores),
            'markets' => MarketResource::collection($markets),
        ]);
    }



    public function market()
    {
        $query = Market::query();
        $market = $query->paginate(50);
        $market->load('stores.products');
        return inertia("Admin/Market", [
            "data" => MarketResource::collection($market),
        ]);
    }

    public function store()
    {
        $query = Store::where('status', 'accepted')->orderBy('created_at', 'desc');
        $stores = $query->paginate(50);
        return inertia('Admin/Store', [
            "data" => StoreResource::collection($stores),
        ]);
    }

    public function request()
    {
        $query = Store::where('status', 'pending')->orderBy('created_at', 'desc');
        $stores = $query->paginate(50);
        return inertia('Admin/Request', [
            "data" => StoreResource::collection($stores),
        ]);
    }

    public function updateStatus(Request $request, Store $store)
    {
        $request->validate([
            'status' => 'required|string|in:accepted,rejected',
        ]);

        $store->status = $request->status;
        $store->save();

        return to_route('admin.request');
    }
}

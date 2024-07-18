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
        return inertia("Admin/index");
    }

    public function market()
    {
        $query = Market::query();
        $market = $query->paginate(50);
        return inertia("Admin/Market", [
            "data" => MarketResource::collection($market),
        ]);
    }

    public function store()
    {
        $query = Store::query();
        $stores = $query->paginate(50);
        return inertia("Admin/Store", [
            "data" => StoreResource::collection($stores),
        ]);
    }

    public function request()
    {
        return inertia('Admin/Request');
    }
}

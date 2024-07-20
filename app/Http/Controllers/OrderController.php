<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Store;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia("Toko/OrderList");
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['user_id'] = $user->id;

        $store_id_user = $request->store_id;
        $store = Store::find($store_id_user);

        if($data['user_id'] == $store->user_id)
        {
            return to_route('shop');
        }
        $data['tanggal_pemesanan'] = now();
        Order::create($data);

        return to_route('shop');
    }
    public function storeCart(Request $request)
    {
        dd($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}

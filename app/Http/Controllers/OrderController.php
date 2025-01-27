<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Store;
use App\Models\Orders_item;
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
        $user = auth()->user();
        $store = $user->store;
        
        if ($store) {
            $orders = $store->orders()->paginate(5);
    
            $pendingCount = $store->orders()->where('status', 'pending')->count();
            $processingCount = $store->orders()->where('status', 'processing')->count();
            $completedCount = $store->orders()->where('status', 'completed')->count();
            $cancelCount = $store->orders()->where('status', 'cancelled')->count();
        }
        // $market->load('stores.products');
        // $orders = Order::query()->paginate(5);

        // $pendingCount = Order::where('status', 'pending')->count();
        // $processingCount = Order::where('status', 'processing')->count();
        // $completedCount = Order::where('status', 'completed')->count();
        // $cancelCount = Order::where('status', 'cancelled')->count();

        return inertia("Toko/OrderList", [
            "orders" => OrderResource::collection($orders),
            "pendingCount" => $pendingCount,
            "processingCount" => $processingCount,
            "completedCount" => $completedCount,
            "cancelCount" => $cancelCount,
        ]);
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
        date_default_timezone_set('Asia/Jakarta');
        $user = Auth::user();
        $order = $request->validated();
        $order['user_id'] = $user->id;
        $order['tanggal_pemesanan'] = date('Y-m-d H:i:s');

        $store_id_user = $request->store_id;
        $store = Store::find($store_id_user);

        if ($order['user_id'] == $store->user_id) {
            return to_route('shop');
        }

        $order_items['product_id'] = $order['product_id'];
        $order_items['jumlah_barang'] = $order['jumlah_barang'];
        $order_items['total_harga_satuan'] = $order['total_harga'];
        unset($order['product_id'], $order['jumlah_barang']);

        $createdOrder = Order::create($order);
        $order_items['order_id'] = $createdOrder->id;

        Orders_item::create($order_items);

        return to_route('shop');
    }
    public function storeCart(Request $request)
    {
        date_default_timezone_set('Asia/Jakarta');
        $user = Auth::user();

        //Ambil data dari request
        $cartData = $request->input('item.cart');
        $order = $request->input('item.data');

        $order['user_id'] = $user->id;
        $order['tanggal_pemesanan'] = date('Y-m-d H:i:s');

        $createdOrder = Order::create($order);

        //For-loop data di cart
        foreach($cartData as $item)
        {
            $orders_item = [
                'order_id' => $createdOrder->id,
                'product_id' => $item['product_id'],
                'jumlah_barang' => $item['jumlah_barang'],
                'total_harga_satuan' => $item['total_harga_satuan'],
            ];
            Orders_item::create($orders_item);
        }
        return to_route('shop');
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

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|string|in:processing,completed,cancelled',
        ]);

        $order->status = $request->status;
        $order->save();

        return to_route('order.index');
    }
}

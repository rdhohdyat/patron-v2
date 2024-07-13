<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Store;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $store = Store::where('user_id', $user->id)->first();

        if ($store) {
            $query = Product::where('store_id', $store->id)->latest();
            $products = $query->paginate(5);
    
            return inertia("Toko/InventoryProduct", [
                "data" => ProductResource::collection($products),
            ]);
        } else {
            
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Toko/addProduct");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['image'] = $data['image']->store('product/' . Str::random(), 'public');

        $user = auth()->user();
        $store = Store::where('user_id', $user->id)->first();

        if ($store) {
            $data['store_id'] = $store->id;
        }
        Product::create($data);
        return to_route('product.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    public function edit(Product $product)
    {
        return inertia("Toko/editProduct", [
            "product" => new ProductResource($product),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $image = $request->file('image');

        if ($image) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $image->store('product/' . Str::random(), 'public');
        } else {
            $data['image'] = $product->image;
        }

        $product->update($data);
        return redirect()->route('product.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        if ($product->image) {
            Storage::disk('public')->deleteDirectory(dirname($product->image));
        }
        return to_route('product.index');
    }
}

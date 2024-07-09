<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Product::query();
        $query->latest();
        $products = $query->paginate(5);
        return inertia("Toko/InventoryProduct", [
            "data" => ProductResource::collection($products),
        ]);
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
        $image = $data['image'] ?? null;
        if ($image) {
            $data['image'] = $image->store('product/' . Str::random(), 'public');
        }

        $product->update($data);
        return to_route('product.index');
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

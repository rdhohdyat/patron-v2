<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/shop');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/shop', [ShopController::class, 'index'])->name('shop');
    Route::get('/shop/detail/{product}', [ShopController::class, 'product_detail'])->name('shop.detail');
    Route::get('/shop/search', [ShopController::class, 'search'])->name('shop.search');
    Route::get('/shop/category/{key}', [ShopController::class, 'category'])->name('shop.category');
    Route::get("/store", [StoreController::class, 'index'])->name('store');
    Route::resource('product', ProductController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';



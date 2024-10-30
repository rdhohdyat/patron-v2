<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MarketController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/shop');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(\App\Http\Middleware\UserMiddleware::class)->group(function () {
        Route::get('/shop', [ShopController::class, 'index'])->name('shop');
        Route::get('/shop/detail/{product}', [ShopController::class, 'product_detail'])->name('shop.detail');
        Route::get('/shop/search', [ShopController::class, 'search'])->name('shop.search');
        Route::get('/shop/category/{key}', [ShopController::class, 'category'])->name('shop.category');
        Route::get('/shop/detail_toko/{store}', [ShopController::class, 'store_detail'])->name('shop.store_detail');
        Route::get('/shop/detail_pasar/{market}', [ShopController::class, 'market_detail'])->name('shop.market');

        Route::get('/shop/detail_toko/{store}', [ShopController::class, 'store_detail'])->name('shop.store_detail');

        Route::post("/order/checkout", [OrderController::class, 'storeCart'])->name('order.storeCart');

        Route::get("/store", [StoreController::class, 'index'])->name('store');
        Route::get("/store/register", [StoreController::class, 'create'])->name('store.create');
        Route::post("/store/register", [StoreController::class, 'store'])->name('store.store');
        Route::post("/store/register",[StoreController::class, 'store'])->name('store.store');
        Route::patch('/order/update-status/{order}', [OrderController::class, 'updateStatus'])->name('order.update_status');
        Route::resource('product', ProductController::class);
    });

    Route::resource('order', OrderController::class);
    Route::resource('stores', StoreController::class);

    Route::middleware(\App\Http\Middleware\AdminMiddleware::class, )->group(function () {
        Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
        Route::get('/admin/market', [AdminController::class, 'market'])->name('admin.market');
        Route::get('/admin/store', [AdminController::class, 'store'])->name('admin.store');
        Route::get('/admin/request', [AdminController::class, 'request'])->name('admin.request');
        Route::patch('/admin/update-status/{store}', [AdminController::class, 'updateStatus'])->name('admin.update_status');


    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/shop', [ProfileController::class, 'updateAddress'])->name('profile.updateAddress');
});

Route::get('/toko/not_registered', function () {
    return inertia('Toko/DontHaveStore');
})->name("store.not_registered");

Route::get('/toko/pending', function () {
    return inertia('Toko/StorePending');
})->name("store.store_pending");


require __DIR__ . '/auth.php';

Route::fallback(function () {
    return Inertia::render('NotFound');
});


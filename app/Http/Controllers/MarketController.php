<?php

namespace App\Http\Controllers;

use App\Http\Resources\MarketResource;
use App\Models\Market;
use App\Http\Requests\StoreMarketRequest;
use App\Http\Requests\UpdateMarketRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class MarketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $markets = Market::latest()->paginate(5);
        return inertia("Admin/Market", [
            "data" => MarketResource::collection($markets),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Admin/AddMarket");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMarketRequest $request)
    {
        $data = $request->validated();
        $data['image'] = $data['image']->store('market/' . Str::random(), 'public');

        Market::create($data);
        return to_route('market.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Market $market)
    {
        return new MarketResource($market);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Market $market)
    {
        return inertia("Admin/EditMarket", [
            "market" => new MarketResource($market),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMarketRequest $request, Market $market)
    {
        $data = $request->validated();
        $image = $request->file('image');

        if ($image) {
            if ($market->image) {
                Storage::disk('public')->delete($market->image);
            }
            $data['image'] = $image->store('market/' . Str::random(), 'public');
        } else {
            $data['image'] = $market->image;
        }

        $market->update($data);
        return redirect()->route('market.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Market $market)
    {
        $market->delete();
        if ($market->image) {
            Storage::disk('public')->deleteDirectory(dirname($market->image));
        }
        return to_route('market.index');
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;


class StoreResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'status' => $this->status,
            'market_id' => new MarketResource($this->Market),
            'nama_store' => $this->nama_store,
            'user' => new UserResource($this->user),
            'lokasi_store' => $this->lokasi_store,
            'created_at' => $this->created_at->format('Y-m-d'),
            'products' => ProductResource::collection($this->whenLoaded('products')),
            'market' => new MarketResource($this->market),
            'image' => $this->image && !(str_starts_with($this->image, 'http')) ?
                Storage::url($this->image) : $this->image,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'user' => new UserResource($this->user),
            'store' => new StoreResource($this->store),
            'order_items' => OrderItemResource::collection($this->orderItems),
            'status' => $this->status,
            'tanggal_pemesanan' => $this->tanggal_pemesanan,
            'tanggal_pengiriman' => $this->tanggal_pengiriman,
            'total_harga' => $this->total_harga,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}

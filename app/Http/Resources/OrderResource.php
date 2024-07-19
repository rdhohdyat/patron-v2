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
            'user_id' => new UserResource($this->User),
            'product_id' => new ProductResource($this->Product),
            'jumlah_barang' => $this->jumlah_barang,
            'tanggal_pemesanan' => $this->tanggal_pemesanan,
            'total_harga' => $this->total_harga,
            'created_at' => $this->created_at->format('Y-m-d'),
            'updated_at' => $this->updated_at->format('Y-m-d'),
        ];
    }
}

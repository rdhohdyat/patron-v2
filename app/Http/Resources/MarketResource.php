<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MarketResource extends JsonResource
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
            'nama_market' => $this->nama_market,
            'lokasi_market' => $this->lokasi_market,
            'image' => $this->image && !(str_starts_with($this->image, 'http')) ?
                Storage::url($this->image) : $this->image,
            'created_at' => $this->created_at->format('Y-m-d'),
        ];
    }
}

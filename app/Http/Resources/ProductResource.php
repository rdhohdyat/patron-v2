<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
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
            'store' => new StoreResource($this->Store),
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'category' => $this->category,
            'stock' => $this->stock,
            'created_at' => $this->created_at->format('Y-m-d'),
            'image' => $this->image && !(str_starts_with($this->image, 'http')) ?
                Storage::url($this->image) : $this->image,
       
        ];
    }
}

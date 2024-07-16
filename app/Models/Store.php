<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'market_id',
        'nama_store',
        'lokasi_store',
        'image',
    ];

    /**
     * Get the products for the store.
     */
    public function products() : HasMany
    {
        return $this->hasMany(Product::class);
    }
}

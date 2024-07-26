<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function market(): BelongsTo
    {
        return $this->belongsTo(Market::class, "market_id");
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}

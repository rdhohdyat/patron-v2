<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Market extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_market',
        'lokasi_market',
        'image'
    ];


    public function stores(): HasMany
    {
        return $this->hasMany(Store::class);
    }
}

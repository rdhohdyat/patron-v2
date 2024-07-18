<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    protected $fillable = [
        'nama_market',
        'lokasi_market',
        'image'
    ];
    use HasFactory;
}

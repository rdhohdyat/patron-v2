<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'product_id',
        'jumlah_barang',
        'tanggal_pemesanan',
        'tanggal_pengiriman',
        'total_harga',
    ];
    public function User()
    {
        return $this->belongsTo(Store::class, 'user_id');
    }
}

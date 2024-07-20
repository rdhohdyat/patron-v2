<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders_item extends Model
{
    protected $table = "orders_item";
    protected $fillable = [
        'order_id',
        'product_id',
        'jumlah_barang',
        'total_harga_satuan',
    ];
}

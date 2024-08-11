<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class booking extends Model
{
    use HasFactory;

    protected $table = 'bookings';
    public $timestamps = false;

    protected $fillable = [
         'product_id',
         'user_name',
         'user_email',
         'user_phone_number', 
         'date', 
         'descuento',
         'cantidad' ,
         'monto_pagado'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

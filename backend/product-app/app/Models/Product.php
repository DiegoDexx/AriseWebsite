<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    public $timestamps = false;

    protected $fillable = [
        'name', 'type', 'color','description', 'size', 'sex', 'price', 'stock_state'
    ];


    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }


}

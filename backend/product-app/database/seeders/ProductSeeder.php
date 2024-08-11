<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            ['name'=>'Camiseta Arise blanca','type' => 'shirt', 'color' => 'white', 'size' => 'XS', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise blanca','type' => 'shirt', 'color' => 'white', 'size' => 'S', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta  para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise blanca','type' => 'shirt', 'color' => 'white', 'size' => 'M', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise blanca','type' => 'shirt', 'color' => 'white', 'size' => 'L', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta  para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise blanca','type' => 'shirt', 'color' => 'white', 'size' => 'XL', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta  para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise blanca','type' => 'shirt', 'color' => 'white', 'size' => 'XXL', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta  para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise beigea','type' => 'shirt', 'color' => 'beige', 'size' => 'XS', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise beige','type' => 'shirt', 'color' => 'beige', 'size' => 'S', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta  para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise beige','type' => 'shirt', 'color' => 'beige', 'size' => 'M', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise beige','type' => 'shirt', 'color' => 'beige', 'size' => 'L', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise beige','type' => 'shirt', 'color' => 'beige', 'size' => 'XL', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta  para un verano ideal!','stock_state'=>'disponible'],
            ['name'=>'Camiseta Arise beige','type' => 'shirt', 'color' => 'beige', 'size' => 'XXL', 'price' => 24.99,'sex'=>'unisex', 'description' => 'Camiseta de Poliester, moda joven, manga corta  para un verano ideal!','stock_state'=>'disponible'],
        ];

        DB::table('products')->insert($products);
    }
}

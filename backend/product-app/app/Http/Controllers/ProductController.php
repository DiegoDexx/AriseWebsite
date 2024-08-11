<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'=>'requires|min:6',
            'type' => 'required',
            'color' => 'required',
            'size' => 'required',
            'description'=>'required',
            'price' => 'required|numeric',
            'stock_state'=>'required'
        ]);

        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name'=>'requires|min:6',
            'type' => 'required',
            'color' => 'required',
            'size' => 'required',
            'description'=>'required',
            'price' => 'required|numeric',
            'stock_state'=>'required'
        ]);

        $product= Product::find($id);
        $product->update($request->all());
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product= Product::find($id);
        $product->delete();
        return response()->json(null, 204);
    }

    public function searchBySizeAndColor($size, $color)
    {
        $products = Product::where('size', $size)
                           ->where('color', $color)
                           ->get();


            if (!Product::find($products)) {
                    return response()->json(['message' => 'Productos no encontrados.'], 404);
            }else{
                    return response()->json($products);
        }             
    }


}

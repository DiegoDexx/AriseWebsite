<?php
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

    //rutas personalizadas de productos  
    Route::apiResource('products', ProductController::class);
    Route::get('products/size/{size}/color/{color}', [ProductController::class, 'searchBySizeAndColor']);


// Rutas protegidas para consultar, actualizar y eliminar reservas

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);

    Route::middleware('auth:api')->group(function () {
        Route::get('/bookings/{booking}', [BookingController::class, 'show']);
        Route::put('/bookings/{booking}', [BookingController::class, 'update']);
        Route::delete('/bookings/{booking}', [BookingController::class, 'destroy']);
    });

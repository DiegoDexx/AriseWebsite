<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Mail\BookingConfirmationMail;



class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::all();
        return response()->json($bookings);
    }

    /**
     * Store a newly created resource in storage.
     */
    
     public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'product_id' => 'required|exists:products,id',
        'user_name' => 'required|string|max:255',
        'user_email' => 'required|email',
        'user_phone_number' => 'required|min:9',
        'date' => 'required|date',
        'descuento' => 'required',
        'cantidad' => 'required',
        'monto_pagado' => 'required',
    ], [ 
        'product_id.required' => 'El campo de ID del producto es obligatorio.',
        'product_id.exists' => 'El ID del producto seleccionado no existe.',
        'user_name.required' => 'El campo de nombre de usuario es obligatorio.',
        'user_name.string' => 'El nombre de usuario debe ser una cadena de caracteres.',
        'user_name.max' => 'El nombre de usuario no puede tener más de 255 caracteres.',
        'user_email.required' => 'El campo de correo electrónico es obligatorio.',
        'user_email.email' => 'El formato del correo electrónico no es válido.',
        'user_phone_number.required' => 'El número de teléfono es obligatorio.',
        'user_phone_number.min' => 'El número de teléfono debe tener al menos 9 dígitos.',
        'date.required' => 'La fecha de reserva es obligatoria.',
        'date.date' => 'La fecha de reserva no tiene un formato válido.',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    $bookingData = $request->only([
        'product_id',
        'user_name',
        'user_email',
        'user_phone_number',
        'date',
        'descuento',
        'cantidad',
        'monto_pagado'
    ]);

    $booking = Booking::create($bookingData);

    if (!$booking) {
        \Log::error('Failed to create booking', ['bookingData' => $bookingData]);
        return response()->json(['error' => 'Error al crear la reserva.'], 500);
    }

    try {
        \Log::info('Datos del correo electrónico:', $booking->toArray());
        
        PRUEBA:
        Mail::raw('Este es un mensaje de prueba básico', function ($message) {
            $message->to('diegojspro@gmail.com')
                    ->subject('Prueba de Correo Básico');
        });
        
        return response()->json($booking, 201);
    } catch (\Exception $e) {
        \Log::error('Error al enviar el correo electrónico:', [
            'message' => $e->getMessage(),
            'stack_trace' => $e->getTraceAsString(), // Información detallada del error
            'booking' => $booking->toArray()
        ]);

        return response()->json(['error' => 'Error al enviar el correo electrónico: ' . $e->getMessage()], 500);
    }
}
     

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $booking = Booking::find($id);
        if (is_null($booking)) {
            return response()->json(['message' => 'Booking not found'], 404);
        }
        return response()->json($booking);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'user_name' => 'required|string|max:255',
            'user_email' => 'required|email',
            'user_phone_number' => 'required|min:9',
            'date' => 'required|date',
            'descuento' => 'required',
            'cantidad' => 'required',
            'monto_pagado' => 'required',
        ], [
            'product_id.required' => 'El campo de ID del producto es obligatorio.',
            'product_id.exists' => 'El ID del producto seleccionado no existe.',
            'user_name.required' => 'El campo de nombre de usuario es obligatorio.',
            'user_name.string' => 'El nombre de usuario debe ser una cadena de caracteres.',
            'user_name.max' => 'El nombre de usuario no puede tener más de 255 caracteres.',
            'user_email.required' => 'El campo de correo electrónico es obligatorio.',
            'user_email.email' => 'El formato del correo electrónico no es válido.',
            'user_phone_number.required' => 'El número de teléfono es obligatorio.',
            'user_phone_number.min' => 'El número de teléfono debe tener al menos 9 dígitos.',
            'date.required' => 'La fecha de reserva es obligatoria.',
            'date.date' => 'La fecha de reserva no tiene un formato válido.',
        ]);
    

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $booking = Booking::find($id);
        if (is_null($booking)) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $booking->update($request->all());
        return response()->json($booking);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = Booking::find($id);
        if (is_null($booking)) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully']);
    }
}

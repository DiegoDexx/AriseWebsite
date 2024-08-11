<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <title>Confirmación de Reserva</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="text-center">
            <img src="{{ asset('img/arise.png') }}" alt="Arise Logo" class="logo">
            <h1 class="mt-3">¡Gracias por tu reserva!</h1>
        </div>
        @if($booking)
        <p>Hola, {{ $booking->user_name ?? 'Cliente' }}!</p>
        <p>Tu reserva ha sido confirmada. Aquí tienes los detalles:</p>
        <ul class="list-group mb-3">
            <li class="list-group-item">Producto ID: {{ $booking->product_id ?? 'No disponible' }}</li>
            <li class="list-group-item">Email: {{ $booking->user_email ?? 'No disponible' }}</li>
            <li class="list-group-item">Teléfono: {{ $booking->user_phone_number ?? 'No disponible' }}</li>
            <li class="list-group-item">Fecha: {{ $booking->date ?? 'No disponible' }}</li>
            <li class="list-group-item">Monto pagado: {{ $booking->monto_pagado ?? 'No disponible' }}</li>
        </ul>
        <p>Si tienes alguna pregunta, no dudes en <a href="mailto:support@ariseweb.com">contactarnos</a>.</p>
    </div>
    @else
        <p>No se encontraron detalles de reserva.</p>
    @endif
    <div class="text-center footer">
        © 2024 Arise. Todos los derechos reservados.
    </div>
</body>
</html>

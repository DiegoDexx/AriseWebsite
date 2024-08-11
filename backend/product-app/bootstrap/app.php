<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\Cors; // Import your Cors middleware

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
        $middleware->statefulApi();
        $middleware->validateCsrfTokens(except: [
            'api/*' // <-- exclude this route
        ]);
        //support cors fuction
        $middleware->append(Cors::class); // Register Cors middleware
        //sanctum middleare
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

<?php

use App\Http\Controllers\BoardsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['throttle:api'])->group(function () {
    Route::get('boards/random', [BoardsController::class, 'random']);
    Route::post('boards/generate', [BoardsController::class, 'generate']);
});

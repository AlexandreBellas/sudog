<?php

use App\Http\Controllers\BoardsController;
use Illuminate\Support\Facades\Route;

Route::get('/boards/random', [BoardsController::class, 'random']);

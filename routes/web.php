<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware('guest')
    ->name('auth.')
    ->group(function () {
        Route::get('/logowanie', [AuthController::class, 'loginView'])->name('loginView');
        Route::post('/login', [AuthController::class, 'login'])->name('login');
    });

Route::middleware('auth')
    ->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    });

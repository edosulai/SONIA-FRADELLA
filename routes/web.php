<?php

use App\Http\Controllers\DokterController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistranController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {

    Route::middleware('verified')->group(function () {
        Route::get('/dashboard', [PasienController::class, 'index'])->name('dashboard');
        Route::get('/dashboard/new', [PasienController::class, 'create'])->name('dashboard.new');
        Route::post('/dashboard/new', [PasienController::class, 'store'])->name('dashboard.new');
        Route::get('/dashboard/{id}', [PasienController::class, 'edit'])->name('dashboard.edit');
        Route::patch('/dashboard/{id}', [PasienController::class, 'update'])->name('dashboard.edit');
        Route::delete('/dashboard/{id}', [PasienController::class, 'destroy'])->name('dashboard.delete');

        Route::get('/dokter', [DokterController::class, 'index'])->name('dokter');
        Route::get('/dokter/new', [DokterController::class, 'create'])->name('dokter.new');
        Route::post('/dokter/new', [DokterController::class, 'store'])->name('dokter.new');
        Route::get('/dokter/{id}', [DokterController::class, 'edit'])->name('dokter.edit');
        Route::patch('/dokter/{id}', [DokterController::class, 'update'])->name('dokter.edit');
        Route::delete('/dokter/{id}', [DokterController::class, 'destroy'])->name('dokter.delete');

        Route::get('/registran', [RegistranController::class, 'index'])->name('registran');
        Route::get('/registran/new', [RegistranController::class, 'create'])->name('registran.new');
        Route::post('/registran/new', [RegistranController::class, 'store'])->name('registran.new');
        Route::get('/registran/{id}', [RegistranController::class, 'edit'])->name('registran.edit');
        Route::patch('/registran/{id}', [RegistranController::class, 'update'])->name('registran.edit');
        Route::delete('/registran/{id}', [RegistranController::class, 'destroy'])->name('registran.delete');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

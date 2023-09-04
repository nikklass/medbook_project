<?php

use App\Http\Controllers\GenderController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PatientServiceController;
use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::resource('patients', PatientController::class);
Route::resource('services', ServiceController::class);
Route::resource('genders', GenderController::class);
Route::resource('patient-services', PatientServiceController::class);

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIUserController;
use App\Http\Controllers\APIZoneController;
use App\Http\Controllers\APICommerceController;
use App\Http\Controllers\APIPromotionController;




Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/v1/users', APIUserController::class);
Route::apiResource('/v1/zones', APIZoneController::class);
Route::apiResource('/v1/commerces', APICommerceController::class);
//Obtener las promociones de un comercio en concreto
Route::get('/v1/commerce/{commerceId}/promotions', [APIPromotionController::class, 'getPromotionsByCommerce']);
Route::apiResource('/v1/promotions', APIPromotionController::class);




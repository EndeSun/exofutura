<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commerce;


class APICommerceController extends Controller
{
    //
    public function index()
    {
        return response()->json(Commerce::all());
    }

    public function show($id)
    {
        $commerce = Commerce::find($id);
        // Verifica si el usuario existe
        if (!$commerce) {
            return response()->json(['error' => 'Commerce not found'], 404);
        }
        // Devuelve el usuario encontrado
        return response()->json($commerce);
    }
}

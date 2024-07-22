<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class APIUserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function show($id)
    {
        $user = User::find($id);
        // Verifica si el usuario existe
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        // Devuelve el usuario encontrado
        return response()->json($user);
    }

}

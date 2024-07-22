<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commerce;

class APIPromotionController extends Controller
{
    
    public function getPromotionsByCommerce($commerceId)
    {
        // Encuentra el comercio por su ID
        $commerce = Commerce::find($commerceId);

        

        // Verifica si el comercio existe
        if (!$commerce) {
            return response()->json(['error' => 'Commerce not found'], 404);
        }

        dump($commerce);
        die();

        //MARK: está mal, debería haber un array de promociones.
        // Obtiene las promociones del comercio
        $promotions = $commerce->promotions;
        
        //dump($promotions);
        //die();

        // Devuelve las promociones
        return response()->json($promotions);
    }
}

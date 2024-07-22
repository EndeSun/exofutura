<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Zone;


class APIZoneController extends Controller
{
    //
    public function index()
    {
        return response()->json(Zone::all());
    }

    public function show($id)
    {
        $zone = Zone::find($id);
        if (!$zone) {
            return response()->json(['error' => 'Zone not found'], 404);
        }
        return response()->json($zone);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Broadcasting\Broadcasters\PusherBroadcaster;
use Illuminate\Http\Request;
use App\Models\Zone;
use App\Models\User;
use App\Models\Registerzone;




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

    public function getUnlockedZonesByUser($userId)
    {
        // Encuentra el usuario por su ID
        $user = User::find($userId);

        // Verifica si el usuario existe
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $unlockedZones = $user->zones()->wherePivot('unlocked', true)->get();

        // Devuelve las zonas desbloqueadas
        return response()->json($unlockedZones);
    }

    public function putZoneDiscovery(Request $request, $userId, $zoneId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $zone = Zone::find($zoneId);

        // Verifica si la zona existe
        if (!$zone) {
            return response()->json(['error' => 'Zone not found'], 404);
        }

        $userZone = $user->zones()->where('zone_id', $zoneId)->first();

        // Verifica si la relación existe
        if (!$userZone) {
            return response()->json(['error' => 'UserZone relationship not found'], 404);
        }

        $unlocked = $request->input('unlocked');

        // Verifica si el valor de unlocked es booleano
        if (!is_bool($unlocked)) {
            return response()->json(['error' => 'Invalid value for unlocked'], 400);
        }

        // Actualiza el campo unlocked a true
        $user->zones()->updateExistingPivot($zoneId, ['unlocked' => $unlocked]);

        $unlockedZones = $user->zones()->wherePivot('unlocked', true)->get();

        return response()->json($unlockedZones);
    }
}

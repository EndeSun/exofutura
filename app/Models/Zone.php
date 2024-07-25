<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RegisterZone;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;



class Zone extends Model
{
    use HasFactory;

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
                    ->withPivot('unlocked');
    }

}

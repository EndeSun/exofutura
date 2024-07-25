<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Zone;


class UserZone extends Model
{
    use HasFactory;

    // public function user()
    // {
    //     return $this->belongsToMany(User::class);
    // }

    // public function zone()
    // {
    //     return $this->belongsToMany (Zone::class);
    // }
}

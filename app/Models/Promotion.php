<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Commerce;


class Promotion extends Model
{
    use HasFactory;
    public function commerce()
    {
        return $this->belongsTo(Commerce::class);
    }

}

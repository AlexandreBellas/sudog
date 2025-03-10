<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Level extends Model
{
    use HasFactory;

    protected $fillable = ['slug', 'name', 'description'];

    public $timestamps = false;

    public function boards(): HasMany
    {
        return $this->hasMany(Board::class, 'level', 'slug');
    }
}

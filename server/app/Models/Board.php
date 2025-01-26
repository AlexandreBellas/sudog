<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Board extends Model
{
    protected $fillable = ['board_id', 'level', 'size', 'serialized_board'];

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level', 'slug');
    }
}

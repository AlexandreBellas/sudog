<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Board extends Model
{
    use HasFactory;

    protected $fillable = ['board_id', 'level', 'size', 'content', 'solved'];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'solved' => 'array',
        ];
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level', 'slug');
    }
}

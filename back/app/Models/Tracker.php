<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Tracker extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'tracker',
        'quantity',
        'streetId',
        'userId'
    ];

    // Определение отношения между Tracker и Address
    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class, 'streetId', 'id');
    }
}
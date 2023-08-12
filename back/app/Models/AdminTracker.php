<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class AdminTracker extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracker',
        'user_id',
        'image',
    ];

    // Определение отношения между Tracker и Address
    public function userData(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function userTracker(): BelongsTo
    {
        return $this->belongsTo(Tracker::class, 'tracker', 'tracker');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasManyThrough;
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

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function adminTrackerStatuses(): HasManyThrough
    {
        return $this->HasManyThrough(Status::class, AdminTracker::class, 'tracker', 'tracker_id', 'tracker');
    }
}

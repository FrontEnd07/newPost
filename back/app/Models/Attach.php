<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attach extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chat_id',
        'name',
    ];

    protected $table = 'attach';

}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaveTrackerTg extends Model
{
    use HasFactory;

    // Указываем таблицу, если имя таблицы не соответствует стандартному имени модели
    protected $table = 'save_tracker_tg';

    // Указываем, какие поля можно массово присваивать
    protected $fillable = [
        'idTg',
        'tracker',
        'name',
        'data',
    ];

    // Указываем, что поле 'data' должно автоматически заполняться текущей датой и временем
    protected $dates = ['data'];
}

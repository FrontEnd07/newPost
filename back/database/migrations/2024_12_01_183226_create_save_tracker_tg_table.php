<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSaveTrackerTgTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('save_tracker_tg', function (Blueprint $table) {
            $table->id(); // auto-incrementing ID
            $table->unsignedBigInteger('idTg'); // int
            $table->string('tracker'); // varchar
            $table->string('name'); // varchar
            $table->timestamp('data')->useCurrent(); // автоматическое значение текущей даты и времени
            $table->timestamps(); // created_at и updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('save_tracker_tg');
    }
}

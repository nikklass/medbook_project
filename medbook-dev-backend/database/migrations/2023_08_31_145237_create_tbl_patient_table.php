<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_patient', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100);
            $table->date('date_of_birth');
            $table->tinyInteger('gender_id')->unsigned();
            $table->timestamps();

            $table->unique(['name', 'date_of_birth']);

            $table->foreign('gender_id')->references('id')->on('tbl_gender')
                ->onUpdate('restrict')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_patient');
    }
};

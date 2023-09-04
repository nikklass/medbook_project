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
        Schema::create('tbl_patient_services', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('patient_id')->unsigned();
            $table->integer('gender_id')->unsigned();
            $table->integer('service_id')->unsigned();
            $table->text('general_comments')->nullable();
            $table->timestamps();

            $table->foreign('patient_id')->references('id')->on('tbl_patient')
                ->onUpdate('restrict')
                ->onDelete('restrict');
            $table->foreign('service_id')->references('id')->on('tbl_service')
                ->onUpdate('restrict')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_patient_services');
    }
};

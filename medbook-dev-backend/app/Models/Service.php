<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{

    use HasFactory;

    protected $table = 'tbl_service';

    protected $fillable = ['name'];

    public $timestamps = false;

    public function patients()
    {
        return $this->hasMany(PatientService::class);
    }

}

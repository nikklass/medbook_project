<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gender extends Model
{

    use HasFactory;

    protected $table = 'tbl_gender';

    protected $fillable = ['name'];

    public $timestamps = false;

    public function patient()
    {
        return $this->hasOne(Patient::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{

    use HasFactory;

    protected $table = 'tbl_patient';

    protected $fillable = ['name', 'date_of_birth', 'gender_id'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    /* protected $casts = [
        'date_of_birth' => 'date',
    ]; */

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function services()
    {
        return $this->hasMany(PatientService::class);
    }

}

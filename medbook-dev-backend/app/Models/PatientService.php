<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientService extends Model
{

    use HasFactory;

    protected $table = 'tbl_patient_services';

    protected $fillable = [
        'patient_id',
        'gender_id',
        'service_id',
        'type_of_service',
        'general_comments',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

}

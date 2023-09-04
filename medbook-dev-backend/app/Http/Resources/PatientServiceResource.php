<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PatientServiceResource extends JsonResource
{

    public function toArray($request)
    {

        return [
            'id' => $this->id,
            'gender_id' => $this->gender_id,
            'patient_id' => $this->patient_id,
            'service_id' => $this->service_id,
            'gender' => new GenderResource($this->whenLoaded('gender')),
            'patient' => new PatientResource($this->whenLoaded('patient')),
            'service' => new ServiceResource($this->whenLoaded('service')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

    }

}

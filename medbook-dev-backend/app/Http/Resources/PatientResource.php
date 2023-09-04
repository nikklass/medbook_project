<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{

    public function toArray($request)
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'date_of_birth' => $this->date_of_birth,
            'gender_id' => $this->gender_id,
            'gender' => new GenderResource($this->whenLoaded('gender')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

    }

}

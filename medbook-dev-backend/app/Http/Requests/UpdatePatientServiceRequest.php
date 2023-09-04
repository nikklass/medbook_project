<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Services\ExceptionService;

class UpdatePatientServiceRequest extends BaseFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules()
    {
        return [
            'patient_id'                => 'sometimes|required|exists:tbl_patient,id',
            'service_id'                => 'sometimes|required|exists:tbl_service,id',
            'type_of_service'           => 'sometimes|required',
        ];
    }

    /**
     * Custom error messages for the different rules.
     *
     * @return array
     */
    public function messages()
    {

        return [];

    }

    /**
     * Get custom attributes for validation errors.
     *
     * @return array
     */
    public function attributes()
    {

        return [
            'patient_id'                => 'patient',
            'service_id'                => 'service',
            'type_of_service'           => 'type of service',
        ];

    }

}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Services\ExceptionService;

class UpdatePatientRequest extends BaseFormRequest
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
            'name'                  => 'sometimes|required',
            'date_of_birth'         => 'sometimes|required|date',
            'gender_id'             => 'sometimes|required|exists:tbl_gender,id',
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
            'name'                   => 'patient name',
            'date_of_birth'          => 'date of birth',
            'gender_id'              => 'gender',
        ];

    }

}

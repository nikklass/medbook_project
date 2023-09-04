<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Services\ExceptionService;

class StorePatientRequest extends BaseFormRequest
{
    /**
     * determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules()
    {
        return [
            'name'                  => 'required',
            'date_of_birth'         => 'required',
            'gender_id'             => 'required|exists:tbl_gender,id',
        ];
    }

    /**
     * custom error messages for the different rules.
     *
     * @return array
     */
    public function messages()
    {

        return [];

    }

    /**
     * get custom attributes for validation errors.
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

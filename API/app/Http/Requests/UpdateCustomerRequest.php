<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       $method = $this->method();

       if ($method === 'PUT') {
           return [
            'name' => ['required'],
            'type' => ['required',Rule::in(['company', 'individual', 'deleted'])],
            'cifnif' => ['required'],
            'address' => ['required'],
            'city' => ['required'],
            'state' => ['required'],
            'postalCode' => ['required'],
            'phone' => ['required'],
            'email' => ['required','email'],
           ];
        }else{
            return [
                'name' => ['sometimes','required'],
                'type' => ['sometimes','required',Rule::in(['company', 'individual', 'deleted'])],
                'cifnif' => ['sometimes','required'],
                'address' => ['sometimes','required'],
                'city' => ['sometimes','required'],
                'state' => ['sometimes','required'],
                'postalCode' => ['sometimes','required'],
                'phone' => ['sometimes','required'],
                'email' => ['sometimes','required','email'],
            ];
        }
    }
    protected function prepareForValidation()
    {

        $fieldsToMerge = [
            'name' => ucwords($this->name),
            'type' => $this->type,
            'cifnif' => strtoupper($this->cifnif),
            'address' => ucwords($this->address),
            'city' => ucwords($this->city),
            'state' => ucwords($this->state),
            'postal_code' => $this->postalCode,
            'phone' => strtoupper($this->phone),
            'email' => $this->email,
        ];

        foreach ($fieldsToMerge as $key => $value) {
            if ($this->$key !== null) {
                $this->merge([$key => $value]);
            }
        }
    }

}

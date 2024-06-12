<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreSupplierRequest extends FormRequest
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
        return [
            'name' => ['required'],
            'type' => ['required',Rule::in(['company', 'individual'])],
            'cifnif' => ['required'],
            'address' => ['required'],
            'city' => ['required'],
            'state' => ['required'],
            'postalCode' => ['required'],
            'phone' => ['required'],
            'email' => ['required','email'],

        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'postal_code' => $this->postalCode,
            'user_id' => $this->userId,
            'name' => ucwords($this->name),
            'type' => $this->type,
            'cifnif' => strtoupper($this->cifnif),
            'address' => ucwords($this->address),
            'city' => ucwords($this->city),
            'state' => ucwords($this->state),
            'phone' => strtoupper($this->phone),
            'email' => $this->email,
        ]);
    }
}

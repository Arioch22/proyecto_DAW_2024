<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWarehouseRequest extends FormRequest
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
            'user_id' => 'required',
            'name' => 'required',
            'dni' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'postalCode' => 'required',
            'phone' => 'required',
            'email' => 'required|email'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'postal_code' => $this->postalCode,
            'user_id' => $this->userId,
        ]);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;

        //  // Obtiene el usuario actual
        // $user = $this->user();

        // // Verifica si el usuario actual es el usuario con ID 1
        // if ($user && $user->role_id === 1) {
        //     return true;
        // }

        // // Si el usuario no es el usuario con ID 1, se rechaza la autorización
        // return false;
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
            'type' => ['required',Rule::in(['company', 'individual', 'deleted'])],
            'cifnif' => ['required'],
            'address' => ['required'],
            'city' => ['required'],
            'state' => ['required'],
            'postalCode' => ['required', 'integer'],
            'phone' => ['required'],
            'email' => ['required','email'],

        ];
    }
    protected function prepareForValidation()
    {
        $this->merge([
            'name' => ucwords($this->name),
            'type' => $this->type,
            'cifnif' => strtoupper($this->cifnif),
            'address' => ucwords($this->address),
            'city' => ucwords($this->city),
            'state' => ucwords($this->state),
            'postal_code' => $this->postalCode,
            'phone' => strtoupper($this->phone),
            'email' => $this->email,
        ]);
    }
}

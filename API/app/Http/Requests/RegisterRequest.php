<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'rol_id' => 'required|integer',
            // 'password' => 'required|min:6|confirmed',
            'password' => [
                'required',
                'string',
                'min:6',
                'confirmed',
                'regex:/[A-Z]/',       // Al menos una letra mayúscula
                'regex:/[a-z]/',       // Al menos una letra minúscula
                'regex:/[0-9]/',       // Al menos un número
                'regex:/[@$!%*?&]/'    // Al menos un carácter especial
            ],
        ];

    }
}

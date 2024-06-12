<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
                'name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string'],
                'price' => ['required', 'numeric'],
                'stock' => ['required', 'numeric'],
                'stock_min' => ['required', 'numeric'],
            ];
        }else{
            return [
                'name' => ['sometimes', 'required', 'string'],
                'description' => ['sometimes','required', 'string'],
                'price' => ['sometimes','required', 'numeric'],
                'stock' => ['sometimes','required', 'numeric'],
                'stockMin' => ['sometimes','required', 'numeric'],
            ];}
    }

    protected function prepareForValidation()
    {
        if ($this->stockMin) {
            $this->merge(['stock_min' => $this->stockMin]);
        }
    }
}

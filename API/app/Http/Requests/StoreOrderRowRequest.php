<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRowRequest extends FormRequest
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
            //
                'customerOrderId' => ['required', 'integer'],
                "productId" => ['required', 'integer'],
                "descriptionProduct" => ['required', 'string'],
                "quantity" => ['required', 'numeric'],
                "priceUnity" => ['required', 'numeric'],
                "totalNeto" => ['required', 'numeric'],
                "iva" => ['nullable', 'integer'],
                "irpf" => ['nullable', 'integer'],
                "total_iva" => ['nullable', 'numeric'],
                "total_irpf" => ['numeric', 'nullable'],
                "total" => ['required']
        ];
    }
}
